const mongoose = require("mongoose");

const addressGroupsSchema = new mongoose.Schema({
    name :{type :String ,default:" " },
    addressess: { type: Array, default: [] },
    addedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'us-users'},
    updatedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'us-users'},
    addedOn: { type: Number, default: new Date().getTime() },
      updatedOn: { type: Number, default: new Date().getTime() },
      isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

});

addressGroupsSchema.method({
    addData: async function () {
        return this.save()
    }
});

addressGroupsSchema.static({

    findData: function (findObj) {
        return this.find(findObj)
    },
    findOneData: function (findObj) {
        return this.findOne(findObj)
    },
    getFilteredData: function (requestData, selectionKeys, offset, limit, sortingKey) {
        return this.find(requestData, selectionKeys)
            .sort(sortingKey)
            .skip(parseInt(offset))
            .limit(parseInt(limit));
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
const addressGroups=mongoose.model("address-groups", addressGroupsSchema);

module.exports = addressGroups;
