const express = require("express");
const UserModel = require("../../models/user-model");
const ClinicModel = require("../../models/clinic-review-model");

const router = express.Router();
//-----------------------------------------------
// router.get("/centers", (req, res, next) => {
//     res.render("google-map");
// });


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
// ----------------------------------------------
// router.get("/centers/:id/review/new", (req, res, next) => { ClinicModel.findById(req.params.id)
//   .then( reviewFromDb => {
//     res.locals.reviewDetails = reviewFromDb;
//     res.render("review-views/review-form");
//   })
//   .catch( err => {
//     next( err );
//   });
// });
//
// router.post("centers/:id/reviews", (req, res, next) => {
//   ClinicModel.findById(req.params.id)
//   .then( reviewFromDb => {
//     const theReview = new ReviewModel({
//       content:    req.body.reviewContent,
//       authorName: req.body.reviewAuthorName,
//       clinicName: req.body.reviewClinicName
//     });
//     res.locals.reviewDetails = reviewFromDb;
//     return theReview.save();
//   })
//   .then( () => {
//     res.redirect(`/centers/${req.params.id}`);
//   })
//   .catch( err => {
//     if (err.errors) {
//       res.locals.validationErrors = err.errors;
//       res.render("review-views/review-form");
//       }
//     else {
//       next( err );
//     }
//   });
// });



module.exports = router;
