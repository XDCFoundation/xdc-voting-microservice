const mongoose = require("mongoose");

const proposalsSchema = new mongoose.Schema({
    //address: { type: String, default: "" },
    proposalTitle: { type: String, default: "" },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, default: Date.now() },
    description: { type: String, default: "" },
    filePath: { type: String, default: "" },
    /* Polling contract is propsal address address. */
    pollingContract: { type: String, default: "" },
    /* Status values are [open, passed, failed] */
    status: { type: String, default: "open" },
    createdOn: { type: Number, default: Date.now() },
    updatedOn: { type: Number, default: Date.now() }

});

proposalsSchema.method({
    addData: async function () {
        return this.save()
    }
});

proposalsSchema.static({
    getFilteredData: function (requestData, selectionKeys, offset, limit, sortingKey) {
        return this.find(requestData, selectionKeys).sort(sortingKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    },
    findData: function (findObj) {
        return this.find(findObj)
    },
    findOneData: function (findObj) {
        return this.findOne(findObj)
    },
    updateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
    },
    deleteData: function (findObj) {
        return this.deleteOne(findObj);
    },
    countData: function (findObj) {
        return this.count(findObj);
    }
});
module.exports = mongoose.model("proposals", proposalsSchema);
