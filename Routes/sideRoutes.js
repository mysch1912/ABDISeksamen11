const express = require("express");
const router = express.Router();

const dashboardController = require("../Controllers/dashboardController.js");
const medarbejderController = require("../Controllers/medarbejderController.js");

router.get("/", dashboardController.hentDashboardSide);
router.get("/medarbejder/:id", medarbejderController.hentMedarbejderSide);

module.exports = router;