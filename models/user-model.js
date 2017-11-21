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
  additonal: { type: String }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
