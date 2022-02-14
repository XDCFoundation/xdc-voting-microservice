const mongoose = require("mongoose");

const proposalsSchema = new mongoose.Schema({
  // proposalTitle: { type: String, default: "" },
  startDate: { type: Number, default: Date.now() },
  endDate: { type: Number, default: Date.now() },
  // description: { type: String, default: "" },
  // proposalDocuments: [{ type: String, default: "" }],
  pollingContract: { type: String, default: "" },
  // status: { type: String, default: "open" },
  createdOn: { type: Number, default: Date.now() },
  updatedOn: { type: Number, default: Date.now() },
});

proposalsSchema.method({
  addData: async function () {
    return this.save();
  },
});

proposalsSchema.static({
  getFilteredData: function (
    requestData={},
    selectionKeys="",
    offset=0,
    limit=0,
    sortingKey=0
  ) {
    return this.find(requestData, selectionKeys)
      .sort(sortingKey)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .exec();
  },
  orderby: function (requestData) {
    return this.orderby(requestData);
  },
  findData: function (findObj) {
    return this.find(findObj);
  },
  findOneData: function (findObj) {
    return this.findOne(findObj);
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
  },
});
module.exports = mongoose.model("proposals", proposalsSchema);
