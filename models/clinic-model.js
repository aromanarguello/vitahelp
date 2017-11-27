const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userReviewSchema = new Schema({
  content: { type: String },
 // if authorName is left empty (null) output
  authorName: { type: String },

  clinicName: {
    type: String,
    required: [true, "Please enter clinic's name."]
  },
  dateAdded: { type: Date }
});

const UserReviewModel = mongoose.model("UserReview", userReviewSchema);

module.exports = UserReviewModel;
