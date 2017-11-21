const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  signupEmailReference: { type: String },
  encryptedPassword: { type: String }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
