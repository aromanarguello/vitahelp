const passport = require("passport");
const FbStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const UserModel = require("../models/user-model");

passport.serializeUser(( userFromDb, cb ) => {
  cb(null, userFromDb._id);

});

passport.deserializeUser((idFromSession, cb) => {
  UserModel.findById(idFromSession)
  .then( userFromDb => {
    cb(null, userFromDb);
  })
  .catch( err => {
    cb(err);
  });
});

// STRATEGIES (npm packages that enable additional methods of logging in)
// -----------------------------------------------------------------------------

// Login With Facebook

// passport.use(new FbStrategy());
passport.use(
  new FbStrategy(
    // 1st arg of FbStrategy -> settings object
    {
        // Facebook credentials
        // App ID
        clientID:     "701396403388076",
        // App Secret
        clientSecret: "5bc130f81c20b61701b35cc37727d21e",

        // Where to go after log in is successful (one of our routes)
        callbackURL: "/facebook/success"
    },

    // 2nd arg of FbStrategy -> callback
    (accessToken, refreshToken, profile, callback) => {
        // profile contains the user info we get from Facebook
        console.log('FACEBOOK profile -----------------------');
        console.log(profile);

        // Check if there's already a document in the database for this user
        UserModel.findOne({ facebookID: profile.id })
          .then((userFromDb) => {
              // if there's already a user account
              if (userFromDb) {
                  // tell Passport to use that user account
                  callback(null, userFromDb);
                  return;
              }

              // create a user account if there is none
              const theUser = new UserModel({
                  facebookID: profile.id,
                  fullName: profile.displayName
              });

              return theUser.save();
          })
          .then((newUser) => {
              // tell Passport to use the new user account
              callback(null, newUser);
          })
          .catch((err) => {
              // tell Passport there was an error in the login process
              callback(err);
          });
    }
  ) // new FbStrategy()
); // passport.use()

// -----------------------------------------------------------
// Login With Google

// passport.use(new GoogleStrategy());
passport.use(
  new GoogleStrategy(
    // 1st arg of GoogleStrategy -> settings object
    {
        // Google credentials
        clientID:     "709056939284-jcu1u0i1mipqj1bmcnit68a6frh3miaa.apps.googleusercontent.com",
        clientSecret: "dM5ZfMXWKAIV28Pneb-rizMW",

        // Where to go after log in is successful (one of our routes)
        callbackURL: "/google/success",

        // fixes Google log in for production
        proxy: true
    },

    // 2nd arg of GoogleStrategy -> callback
    (accessToken, refreshToken, profile, callback) => {
        // profile contains the user info we get from Google
        console.log('GOOGLE profile -----------------------');
        console.log(profile);

        // Check if there's already a document in the database for this user
        UserModel.findOne({ googleID: profile.id })
          .then((userFromDb) => {
              // if there's already a user account
              if (userFromDb) {
                  // tell Passport to use that user account
                  callback(null, userFromDb);
                  return;
              }

              // create a user account if there is none
              const theUser = new UserModel({
                  googleID: profile.id,
                  // use the email as their name 'cause Google doesn't give name
                  fullName: profile.emails[0].value
              });

              return theUser.save();
          })
          .then((newUser) => {
              // tell Passport to use the new user account
              callback(null, newUser);
          })
          .catch((err) => {
              // tell Passport there was an error in the login process
              callback(err);
          });
    }
  ) // new GoogleStrategy()
); // passport.use()
