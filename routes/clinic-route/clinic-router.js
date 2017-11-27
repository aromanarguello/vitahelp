const express = require("express");
const UserModel = require("../../models/user-model");
const ClinicModel = require("../../models/clinic-review-model");

const router = express.Router();
// STEP #1:
router.get("/centers/review/new", (req, res, next) => {
  res.render("review-views/review-form");
});

// STEP #2:
router.post("/centers/review", ( req, res, next)=> {
  const clinicReview = {
  content:    req.body.reviewContent,
  authorName: req.body.reviewAuthorName,
  clinicName: req.body.reviewClinicName,
  dateAdded:  new Date()
};

const newReview = new ClinicModel( clinicReview );
newReview.save( err => {
  if ( err ) {
    return next( err );
   }
    return res.redirect("/centers");
  });
});




module.exports = router;
