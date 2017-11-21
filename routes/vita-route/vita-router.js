const express = require("express");
const UserModel = require("../../models/user-model");
const passport= require("passport");

const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("signup-page");
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
