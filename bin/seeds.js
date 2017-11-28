require("dotenv").config();
require("../config/vitahelp-setup");
const ClinicSeedModel = require("../models/clinic-seed-model");


const clinicInfo = [
  {
    locationName: "Miami Addiction Help",
    locationLon: -80.189430,
    locationLat: 25.763690,
    zipCode: 33131,
    description: `Drug addiction is a serious problem for so many people all over the world.
    If you’re someone who suffers from this issue, however, you no longer have to feel overwhelmed,
    scared and confused. That’s because amazing guidance and assistance are available to you now.
    Miami Addiction Help is a full-service company that specializes in top-quality addition treatment.
    People who are searching for first-rate and caring addiction treatment anywhere in the beautiful Miami,
    Florida area can rely on our center completely.`,
    url: "http://www.addicted.org/miami-addiction-services-treatment.html"
  },
  {
    locationName: "Outpatient Drug Therapy",
    locationLon: -80.190644,
    locationLat: 25.774533,
    zipCode: 33130,
    description: `The Outpatient Center is an outpatient drug and alcohol
    treatment center in Lake Worth, FL. We provide comprehensive addiction counseling,
    therapy, addiction recovery programs, court liaison and case management services
    to people struggling with addiction and recovery-related issues who want to improve
    the quality of their lives. Our approach to treating the disease of addiction hinges
    on individualized care and specialized tracks to treat each patient’s specific needs.
    We care about each of our patients and base our healing practice on nourishing the needs
    of the whole person—mind, body, and spirit.`,
    url: "https://www.theoutpatienttreatmentcenter.com/about-the-treatment-center-outpatient-services/"
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
