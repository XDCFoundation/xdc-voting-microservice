const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    email: { type: String, default: "" },
    createdOn: { type: Number, default: Date.now() },
    updatedOn: { type: Number, default: Date.now() },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

});

emailSchema.method({
    addData: async function () {
        return this.save()
    }
});

emailSchema.static({

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
module.exports = mongoose.model("email", emailSchema);
