const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/vitaclinic', {useMongoClient: true});
require("../config/vitahelp-setup");

const ClinicModel = ("../models/clinic-model");

const clinicInfo = [
  {
    locationName: "Miami Addiction Help",
    locationLon: -80.189430,
    locationLat: 25.763690,
    zipCode: 33131
  },
  {
    locationName: "Outpatient Drug Therapy",
    locationLon: -80.190644,
    locationLat: 25.774533,
    zipCode: 33130
  }
];

ClinicModel.create(clinicInfo, (err, clinicDocs) =>{
  if (err) {
    throw err;
  }
  clinicDocs.forEach( (oneClinic) => {
    console.log(`new product ${oneClinic.locationName}`);
  });
});
