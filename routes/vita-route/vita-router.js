const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user-model");
const passport= require("passport");

const router = express.Router();


router.get("/ready", (req, res, next) => {
  res.render("begin");
});



// STEP #1:
router.get("/signup", (req, res, next) => {


  res.render("signup-page");
});

//STEP #2:
router.post("/signup", (req, res, next) => {
  console.log(req.body.signupPasswordReference);
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
      encryptedPassword:    scrambledPassA
    });
    // return the promis of the next database query
     return theUser.save();

  })
  .then((newUser) => {
    req.login( newUser, err => {
      if ( err ) {
        next(err);
        return;
      }
      console.log('user thats signed up', newUser);
      res.redirect("/ready");
    });
  })
  .catch( err => {
    next(err);
  });
});

router.get("/login", (req, res, next) => {
  res.render("login-page");
});

router.post("/login", (req, res, next) => {
  UserModel.findOne({ email: req.body.loginEmailReference })
  .then( userFromDb => {
    if ( userFromDb === null ) {
      res.locals.errorMessage = "Invalid email.";
      res.render("login-page");
      return;
    }
    const isPasswordGood = bcrypt.compareSync( req.body.loginPassword, userFromDb.encryptedPassword);

    if (isPasswordGood === false) {
      res.locals.errorMessage = "Password Incorrect.";
      res.render("login-page");
      return;
    }

    req.login( userFromDb, err => {
      if ( err ) {
        next(err);
      }
      res.redirect("welcome-page");
    });

  })
  .catch( err => {
    next( err );
  });
});

router.get("/logout", ( req, res, next ) => {
  req.logout();

  res.redirect("/");
});

// STEP ONE ADDITIONAL USER INFORMATION ---------------------------------
router.get("/step-one", (req, res, next) => {
  // res.render("main-req");
  // res.locals.currentUser = req.user;
  res.render("main-req");
});

router.post("/step-one/:id", (req, res, next) => {
  UserModel.findById(req.params.id)
  .then( userFromDb => {

    req.user.set({
      locationForm:       req.body.locationForm,
      firstNameForm:      req.body.firstNameForm,
      lastNameForm:       req.body.lastNameForm,
      ageForm:            req.body.ageForm,
      additionalComments: req.body.additionalCommentReference
    });

    // res.locals.userDetails = userFromDb;

    return userFromDb.save();
  })
  .then(() =>{
    res.redirect(`/profile/${req.params.id}`);
  })
  .catch( err => {
    if ( err.errors ) {
      res.locals.validationErrors = err.errors;
      res.render("main-req");
    }
    else {
      next(err);
    }
  });
});


router.get("/profile/:id", (req, res, next) => {
  res.render("profile");
});


module.exports = router;
