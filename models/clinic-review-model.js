const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clinicReviewSchema = new Schema({
  content: { type: String },
 // if authorName is left empty (null) output
  authorName: { type: String },

  clinicName: {
    type: String,
    required: [true, "Please enter clinic's name."]
  }
});

const ClinicReviewModel = mongoose.model("Review", clinicReviewSchema);

module.exports = ClinicReviewModel;
