const express = require('express');

const router = express.Router();

router.get("/ready", (req, res, next) => {
  res.render("begin");
});

router.get("/main-req", (req, res, next) => {
  res.render("main-req");
});


module.exports = router;
