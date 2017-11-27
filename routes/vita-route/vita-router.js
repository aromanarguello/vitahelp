const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user-model");
const ClinicModel = require("../../models/clinic-review-model");
const passport= require("passport");

const router = express.Router();


router.get("/ready", (req, res, next) => {
  res.render("begin");
});


// SIGN UP ROUTES --------------------------------------------------
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
// END SIGN UP ROUTES --------------------------------------------------


// LOG IN ROUTES --------------------------------------------------

router.get("/login", (req, res, next) => {
  if (req.user) {
    res.redirect("/login");

    return;
  }
  res.render("login-page");
});

router.post("/login", (req, res, next) => {
  UserModel.findOne({ signupEmailReference: req.body.loginEmailReference })
  .then( userFromDb => {
    if ( userFromDb === null ) {
      res.locals.errorMessage = "Invalid email.";
      res.render("login-page");
      console.log("this is because email" + userFromDb);
      return;
    }
    const isPasswordGood = bcrypt.compareSync( req.body.loginPasswordReference, userFromDb.encryptedPassword);

    if (isPasswordGood === false) {
      res.locals.errorMessage = "Password Incorrect.";
      res.render("login-page");
      return;
    }

    req.login( userFromDb, err => {
      if ( err ) {
        next(err);
      } else {
        console.log("Success");
      res.redirect("/profile");
    }
    });

  })
  .catch( err => {
    next( err );
  });
});

// END LOG IN ROUTES --------------------------------------------------

router.get("/logout", ( req, res, next ) => {
  req.logout();

  res.redirect("/");
});

// STEP ONE ADDITIONAL USER INFORMATION ---------------------------------
router.get("/step-one", (req, res, next) => {

  res.render("main-req");
});

router.post("/step-one/:id", (req, res, next) => {
const userId = req.params.id;
const userChanges = {
  locationForm:       req.body.locationForm,
  firstNameForm:      req.body.firstNameForm,
  lastNameForm:       req.body.lastNameForm,
  ageForm:            req.body.ageForm,
  additionalComments: req.body.additionalCommentReference
};
UserModel.findByIdAndUpdate(
  userId,
  userChanges,
  (err, theUser) => {
    if(err){
      next(err);
      return;
    }
    res.redirect("/profile");
  }
);

});

router.get("/edit", (req, res, next) => {
  res.render("profile-edit-page");
});


router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/centers", (req, res, next) => {
  ClinicModel.find()
  .limit(10)
  .sort({ dateAdded: -1})
  .then( reviewFromDb => {
    res.locals.reviews = reviewFromDb;
    res.render("google-map");
  })
  .catch( err => {
    next( err );
  });
});

// Facebook log in routes
// -----------------------------------------------------------------------------

// Link to "/facebook/login" to initiate the login process
router.get("/facebook/login", passport.authenticate("facebook"));
                                        //               |
                                        // This name comes from the strategy

// Facebook will redirect here after login is successful
router.get("/facebook/success",    // no normal callback here
  passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login"
  })
);

// Google log in routes
// -----------------------------------------------------------------------------

// Link to "/google/login" to initiate the login process
router.get("/google/login",     // no normal callback here
  passport.authenticate("google", {
      scope: [
          "https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"
      ]
  })
);

// Google will redirect here after login is successful
router.get("/google/success",     // no normal callback here
  passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/login"
  })
);


module.exports = router;
