const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user-model");
const passport= require("passport");

const router = express.Router();

// STEP #1:
router.get("/signup", (req, res, next) => {
  res.render("signup-page");
});

//STEP #2:
router.post("/signup", (req, res, next) => {
  if ( req.body.signupPasswordReference.length < 12 ||
       req.body.signupPasswordReference.match(/[^a-z0-9]/i ) === null)
  {
    res.locals.errorMessage = "Password is invalid";
    res.render("signup-page");
    // early return to preven the rest of the code from running
    return;
  }
  // query databases to see if the email is taken
  UserModel.findOne({ email: req.body.signupEmailReference})
  .then( userFromDb => {
    if (userFromDb !== null ) {
      res.locals.errorMessage = "Email is taken";
      res.render("singup-page");

      // early return to preven the rest of the code from running
      return;
    }

    const salt = bcrypt.genSaltSync(10);

    const scrambledPassA = bcrypt.hashSync(req.body.signupPasswordReference, salt);

    const theUser = new UserModel({
      signupEmailReference: req.body.signupEmailReference,
      encryptedPassword: scrambledPassA
    });
    // return the promis of the next database query
    return theUser.save();
  })
  .then(() => {
    res.redirect("ready");
  })
  .catch( err => {
    next(err);
  });
});

router.get("/ready", (req, res, next) => {
  res.render("begin");
});

router.get("/step-one", (req, res, next) => {
  res.render("main-req");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});


module.exports = router;
