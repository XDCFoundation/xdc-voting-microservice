import Config from "../../config"
import httpService from "../service/http-service"
import pug from "pug";
import fs from "fs"



const VARS = {ONESIGNAL_APP_ID: Config.ONE_SIGNAL_APP_ID, ONESIGNAL_APP_REST_API_KEY: Config.ONE_SIGNAL_API_KEY};

function getEmailAuthHash(onesignalRestApiKey, emailAddress) {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', onesignalRestApiKey);
    hmac.update(emailAddress);
    return hmac.digest('hex');
}

async function createEmailRecord(emailId) {
    const emailAuthHash = getEmailAuthHash(VARS.ONESIGNAL_APP_REST_API_KEY, emailId);
    try {

        const reqBody = {
            app_id: VARS.ONESIGNAL_APP_ID,
            device_type: 11,
            identifier: emailId,
            device_player_id: "",
            email_auth_hash: emailAuthHash
        }
        const response = await httpService.executeHTTPRequest("POST", "https://onesignal.com/api/v1/players", "", reqBody, {"Content-Type": "application/json"})
        console.log("response ",response)
        if (response) {
            return {
                success: true,
                emailRecordId: emailId,
            };
        }
    } catch (e) {
        console.error(`Error while creating email record for ${emailId}:`, e);
        return {
            success: false,
            emailRecordId: emailId,
        };
    }
}


const sendNotification = function(emailIds, proposalAddress) {
    console.log("emailIds ",emailIds)
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic "+Config.ONE_SIGNAL_API_KEY
    };

    const message = {
        app_id: Config.ONE_SIGNAL_APP_ID,
        "email_subject": "New Proposal Posted",
        // description: pug.renderFile(basedir + "/views/emailTemplate.pug"
    
        //   ),
        // "email_body":`New proposal ${proposalAddress} has been created`,
        "email_body":pug.renderFile(basedir + "/views/emailTemplate.pug"),
        include_email_tokens: emailIds
    };

    const options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    const https = require('https');
    const req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });
   
    fs.writeFileSync("test.html",message.description)
    
    
    req.write(JSON.stringify(message));
    req.end();
};

export default {createEmailRecord, sendNotification}