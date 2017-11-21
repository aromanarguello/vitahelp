const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  firstName: {
    type: String,
    required: [true, "Please enter first name."]
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name."]
  },
  location: {
    type: String,
    required: [true, "Please enter location."]
  },
  additional: {
    type: String,
    maxLength: [300, "The comment can't be longer than 300 characters."]
  },
  signupEmailReference: { type: String },
  signupPasswordReference: { type: String }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
