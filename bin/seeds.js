require("../config/vitahelp-setup");
const ClinicSeedModel = require("../models/clinic-seed-model");


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

ClinicSeedModel.create(clinicInfo)
  .then( clinicSeedResults => {
    console.log(`Inserted ${clinicSeedResults.length}
    clinics`);
  })
  .catch( err => {
    console.log(err);
});
