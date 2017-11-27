const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/vitaclinic", { useMongoClient: true })
.then( () => {
  console.log("Mongoose Connected!");
})
.catch( err => {
  console.log("Mongoose connection FAILED!!! 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨");
  console.log(err);
});
