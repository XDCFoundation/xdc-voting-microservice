const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  address: { type: String, default: "" },
  permission: {
    allowVoting: { type: Boolean, default: true },
    allowProposalCreation: { type: Boolean, default: false },
  },
  totalVotes: { type: Number, default: null },
  createdOn: { type: Number, default: Date.now() },
  updatedOn: { type: Number, default: Date.now() },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() },
});

templateSchema.method({
  saveData: async function () {
    return this.save();
  },
});
templateSchema.static({
  findData: function (findObj, limit = 10, skip = 0) {
    return this.find(findObj).limit(limit).skip(skip).sort({ addedOn: -1 });
  },
  findOneData: function (findObj) {
    console.log("=========", findObj);
    return this.findOne(findObj);
  },
  findOneAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  },
  findDataWithAggregate: function (findObj) {
    return this.aggregate(findObj);
  },
  countData: function (findObj) {
    return this.count(findObj);
  },
  getFilteredData: function (
    requestData,
    selectionKeys,
    offset,
    limit,
    sortingKey
  ) {
    return this.find(requestData, selectionKeys)
      .sort(sortingKey)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .exec();
  },
});
export default mongoose.model("whiteListAddresses", templateSchema);
