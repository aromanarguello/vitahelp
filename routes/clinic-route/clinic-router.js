const express = require("express");
const UserModel = require("../../models/user-model");
const ClinicModel = require("../../models/clinic-review-model");
const UserReviewModel = require("../../models/clinic-model");
const ClinicSeedModel = require("../../models/clinic-seed-model");

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
  UserReviewModel.find()
  .limit(10)
  .sort({ dateAdded: -1})
  .then( reviewFromDb => {
    res.locals.userReviews = reviewFromDb;
    res.render("review-views/review-details");
  })
  .catch( err => {
    next( err );
  });
});

router.post("/user-reviews", (req, res, next) => {
  const clinicReview = {
  content:    req.body.reviewContent,
  authorName: req.body.reviewAuthorName,
  clinicName: req.body.reviewClinicName,
  dateAdded:  new Date()
};

const newComment = new UserReviewModel( clinicReview );
newComment.save( err => {
  if ( err ) {
    return next( err );
   }
    return res.redirect("/user-reviews/new");
  });

router.get("/user-reviews/:id", (req, res, next) => {
  UserReviewModel.findById(req.params.id)
  .then( userReviewFromDb => {
    res.locals.userReview = userReviewFromDb;
    return UserReviewModel.find({ review: req.params.id }).exec();
  })
  .then( userReviewResults => {
    res.locals.listOfUserReviews = userReviewResults;
    res.redirect("/user-reviews/new");
  })
  .catch( err => {
    next( err );
  });
});

router.get("/user-reviews/:id/edit", (req, res, next) => {
  UserReviewModel.findById(req.params.id)
  .then( userReviewFromDb => {
    res.locals.userReview = userReviewFromDb;
    res.render("review-views/review-edit");
  })
  .catch(err => {
    next(err);
  });
});

router.post("/user-reviews/:id", (req, res, next) => {
  UserReviewModel.findById(req.params.id)
  .then( userReviewFromDb => {
    userReviewFromDb.set({
      content:    req.body.reviewContent,
      authorName: req.body.reviewAuthorName,
      clinicName: req.body.reviewClinicName,
      dateAdded:  new Date()
    });

    res.locals.userReview = userReviewFromDb;
    return userReviewFromDb.save();
  })
  .then(() => {
    res.redirect(`/user-reviews/${req.params.id}`);
  })
  .catch( err => {
    if (err.errors) {
        res.locals.validationErrors = err.errors;
        res.render("review-views/review-edit");
    } else {
      next(err);
    }
  });
});

router.post("/user-reviews/:id/delete", (req, res, next) => {
  UserReviewModel.findByIdAndRemove(req.params.id)
  .then( reviewFromDb => {
    res.redirect("/user-reviews/new");
  })
  .catch(err => {
    next( err );
  });
});

});

router.get("/clinic-info", (req, res, next) => {
  ClinicSeedModel
  .find()
  .exec()
  .then( clinicFromDb => {
    res.json(clinicFromDb);
  })
  .catch( err => {
    res.json({ message: "Error with the clinics" });
  });
});


module.exports = router;
