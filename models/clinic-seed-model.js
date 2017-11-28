const mongoose = require("mongoose");
const Schema =   mongoose.Schema;

const clinicSchema = new Schema({
  locationName: String,
  locationLon: Number,
  locationLat: Number,
  zipCode: Number
});

const ClinicSeedModel = mongoose.model("Seeds", clinicSchema);

module.exports = ClinicSeedModel;
