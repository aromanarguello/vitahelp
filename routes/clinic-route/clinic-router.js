const express = require("express");
const UserModel = require("../../models/user-model");
const ClinicModel = require("../../models/clinic-model");

const router = express.Router();

router.get("/centers", (req, res, next) => {
  res.render("google-map");
});

module.exports = router;
