const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clinicSchema = new Schema ({
  locationName: { type: String },
  locationLat:  { type: Number },
  locationLon:  { type: Number },
  zipCode:      { type: Number }
});

const ClinicModel = mongoose.model( "Clinic", clinicSchema);

module.exports = ClinicModel;
