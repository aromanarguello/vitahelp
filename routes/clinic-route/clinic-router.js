const express = require("express");
const UserModel = require("../../models/user-model");
const ClinicModel = require("../../models/clinic-model");

const router = express.Router();

router.get("/centers", (req, res, next) => {
  ClinicModel
  .find()
  .then( clinicResults => {
    res.locals.listOfClinics = clinicResults;
    res.render("google-map");
  })
  .catch( err => {
    next( err );
  });
});


// STEP #1:
router.get("/centers/review/new", (req, res, next) => {
  res.render("review-views/review-form");
});

// STEP #2:
router.post("/centers/review", ( req, res, next) => {

    // const userID = req.params.id;
    const theReview = new ClinicModel({
      content: req.body.reviewContent,
      authorName: req.body.reviewAuthorName,
      clinicName: req.body.reviewClinicName
    });
    ClinicModel.insertMany(
      // userID,
      theReview,
      (err, theReview) => {
        if ( err ) {
          next( err );
          return;
        }
        res.redirect("/");
      }
    );
  });

module.exports = router;
