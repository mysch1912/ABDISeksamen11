const path = require("path");

exports.hentDashboardSide = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
};