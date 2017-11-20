const express = require('express');

const router = express.Router();

router.get("/ready", (req, res, next) => {
  res.render("begin");
});

router.get("/register", (req, res, next) => {
  res.render("main-req");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});


module.exports = router;
