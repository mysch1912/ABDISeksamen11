const path = require("path");
const medarbejdere = require("../Models/medarbejdere.js");
const opgaver = require("../Models/opgaver.js");
const systemforslag = require("../Models/systemforslag.js");

exports.hentMedarbejderSide = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "medarbejder.html"));
};

exports.hentMedarbejderData = (req, res) => {
  const id = Number(req.params.id);

  const medarbejder = medarbejdere.find((m) => m.id === id);

  if (!medarbejder) {
    return res.status(404).json({ fejl: "Medarbejder ikke fundet" });
  }

  const medarbejderOpgaver = opgaver.filter((o) => o.medarbejderId === id);
  const forslag = systemforslag.find((f) => f.medarbejderId === id);

  res.json({
    medarbejder,
    opgaver: medarbejderOpgaver,
    forslag
  });
};