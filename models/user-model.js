const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  signupEmailReference: { type: String },
  encryptedPassword: { type: String },
  locationForm: { type: String },
  firstNameForm: { type: String},
  lastNameForm: { type: String },
  ageForm: { type: Number },
  additionalComments: { type: String }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
