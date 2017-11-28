const mongoose = require("mongoose");
const Schema =   mongoose.Schema;

const clinicSchema = new Schema({
  locationName: String,
  locationLon: Number,
  locationLat: Number,
  zipCode: Number,
  description: String,
  url: String
});

const ClinicSeedModel = mongoose.model("Seeds", clinicSchema);

module.exports = ClinicSeedModel;
