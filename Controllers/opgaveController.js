const medarbejdere = require("../Models/medarbejdere.js");
const opgaver = require("../Models/opgaver.js");
const systemforslag = require("../Models/systemforslag.js");

exports.tildelForeslåetOpgave = (req, res) => {
  const medarbejderId = Number(req.body.medarbejderId);

  const medarbejder = medarbejdere.find((m) => m.id === medarbejderId);
  const forslag = systemforslag.find((f) => f.medarbejderId === medarbejderId);

  if (!medarbejder || !forslag) {
    return res.status(404).json({
      succes: false,
      besked: "Kunne ikke finde medarbejder eller systemforslag"
    });
  }

  const nyOpgave = {
    id: opgaver.length + 1,
    medarbejderId,
    titel: forslag.foreslåetOpgave,
    timer: 5,
    status: "Planlagt"
  };

  opgaver.push(nyOpgave);

  medarbejder.brugteTimer += nyOpgave.timer;
  medarbejder.ledigeTimer = Math.max(
    medarbejder.totaleTimer - medarbejder.brugteTimer,
    0
  );

  res.json({
    succes: true,
    besked: `Opgaven er tildelt til ${medarbejder.navn}`,
    opgave: nyOpgave
  });
};