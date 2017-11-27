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
// -----------------------------

router.get("/user-reviews/new", (req, res, next) => {
  res.render("review-views/review-details");
});

router.post("/user-reviews", (req, res, next) => {
  const clinicReview = {
  content:    req.body.reviewContent,
  authorName: req.body.reviewAuthorName,
  clinicName: req.body.reviewClinicName,
  dateAdded:  new Date()
};

const newComment = new ClinicModel( clinicReview );
newComment.save( err => {
  if ( err ) {
    return next( err );
   }
    return res.redirect("/user-reviews/new");
  });


// router.get("/user-reviews/:id", (req, res, next) => {
//   ClinicModel.findById(req.params.id)
//   .then( reviewFromDb => {
//     res.locals.userReviews = reviewFromDb;
//     res.render("review-views/review-details");
//   })
//   .catch( err => {
//     next( err );
//   });
// });
//
//
// router.post("/centers/:id/new", ( req, res, next)=> {
//   const clinicReview = {
//   content:    req.body.reviewContent,
//   authorName: req.body.reviewAuthorName,
//   clinicName: req.body.reviewClinicName,
//   dateAdded:  new Date()
// };
//
// const newComment = new ClinicModel( clinicReview );
// newComment.save( err => {
//   if ( err ) {
//     return next( err );
//    }
//     return res.redirect("/user-reviews");
//   });
});



module.exports = router;
