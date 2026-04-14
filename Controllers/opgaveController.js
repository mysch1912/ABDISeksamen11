const { medarbejdere, opgaver, plan } = require("../Models/data");

exports.tildelOpgaveTilMedarbejder = (req, res) => {
  const medarbejderId = Number(req.body.medarbejderId);
  const opgaveId = Number(req.body.opgaveId);

  const medarbejder = medarbejdere.find(
    (m) => m.medarbejderID === medarbejderId
  );

  const opgave = opgaver.find(
    (o) => o.opgaveID === opgaveId
  );

  if (!medarbejder || !opgave) {
    return res.status(404).json({
      succes: false,
      besked: "Kunne ikke finde medarbejder eller opgave"
    });
  }

  if (opgave.medarbejder) {
    return res.json({
      succes: false,
      besked: "Opgaven er allerede tildelt en medarbejder"
    });
  }

  const resultat = plan.fordelOpgaver(opgave, medarbejder);

  if (!resultat.succes) {
    return res.json({
      succes: false,
      besked: resultat.besked,
      matchscore: resultat.vurdering.score
    });
  }

  return res.json({
    succes: true,
    besked: resultat.besked,
    matchscore: resultat.vurdering.score,
    opgave: {
      id: opgave.opgaveID,
      titel: opgave.opgaveType,
      timer: opgave.estimeretTid,
      status: opgave.opgaveStatus
    }
  });
};