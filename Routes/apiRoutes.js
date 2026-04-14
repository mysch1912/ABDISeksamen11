const express = require("express");
const router = express.Router();

const dashboardController = require("../Controllers/dashboardController.js");
const medarbejderController = require("../Controllers/medarbejderController.js");
const opgaveController = require("../Controllers/opgaveController.js");

router.get("/dashboard", dashboardController.hentDashboardData);
router.get("/medarbejder/:id", medarbejderController.hentMedarbejderData);
router.post("/tildel-opgave", opgaveController.tildelOpgaveTilMedarbejder);

module.exports = router;