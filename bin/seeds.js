require("../config/mongoose-setup");

const ClinicModel = ("../models/clinic-model");

const clinicInfo = [
  {
    name: "Miami Addiction Help",
    locationLon: -80.189430,
    locationLat: 25.763690,
    zipCode: 33131
  },
  {
    name: "Outpatient Drug Therapy",
    locationLon: -80.190644,
    locationLat: 25.774533,
    zipCode: 33130
  }
];

ClinicModel.create(clinicInfo)
  .then((clinicResults) => {
      console.log(`Inserted ${clinicResults.length} products`);
  })
  .catch((err) => {
      console.log("Product insert error!");
      console.log(err);
  });
