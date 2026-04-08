const path = require("path");
const medarbejdere = require("../Models/medarbejdere.js");
const opgaver = require("../Models/opgaver.js");

exports.hentDashboardSide = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Public", "dashboard.html"));
};

exports.hentDashboardData = (req, res) => {
  res.json({
    medarbejdere,
    opgaver
  });
};