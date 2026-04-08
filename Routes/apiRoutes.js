const express = require("express");
const router = express.Router();

const medarbejderController = require("../Controllers/medarbejderController.js");
const opgaveController = require("../Controllers/opgaveController.js");

router.get("/medarbejder/:id", medarbejderController.hentMedarbejderData);
router.post("/tildel-opgave", opgaveController.tildelForeslåetOpgave);

module.exports = router;