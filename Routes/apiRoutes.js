const express = require("express");
const router = express.Router();

const medarbejderController = require("../Controllers/medarbejderController.js");
const opgaveController = require("../Controllers/opgaveController.js");
const dashboardController = require("../Controllers/dashboardController.js");

router.get("/dashboard", dashboardController.hentDashboardData);
router.get("/medarbejder/:id", medarbejderController.hentMedarbejderData);
router.post("/tildel-opgave", opgaveController.tildelForeslåetOpgave);

module.exports = router;