const path = require("path");
const { medarbejdere, opgaver, plan } = require("../Models/data.js");

exports.hentMedarbejderSide = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Public", "medarbejder.html"));
};

exports.hentMedarbejderData = (req, res) => {
  const id = Number(req.params.id);

  const medarbejder = medarbejdere.find(
    (m) => m.medarbejderID === id
  );

  if (!medarbejder) {
    return res.status(404).json({ fejl: "Medarbejder ikke fundet" });
  }

  const medarbejderOpgaver = opgaver.filter(
    (o) => o.medarbejder && o.medarbejder.medarbejderID === id
  );

  const utildelteOpgaver = opgaver.filter((o) => !o.medarbejder);

  const muligeOpgaver = utildelteOpgaver.map((opgave) => {
    const vurdering = plan.vurderMatch(opgave, medarbejder);

    return {
      id: opgave.opgaveID,
      titel: opgave.opgaveType,
      timer: opgave.estimeretTid,
      status: opgave.opgaveStatus,
      kompetenceKrav: opgave.kompetenceKrav,
      matchscore: vurdering.score,
      matcherKompetence: vurdering.harKompetence,
      harKapacitet: vurdering.passerTidsmæssigt
    };
  });

  res.json({
    medarbejder: {
      id: medarbejder.medarbejderID,
      navn: medarbejder.navn,
      rolle: medarbejder.rolle,
      afdeling: medarbejder.afdeling,
      billede: medarbejder.billede,
      ledigeTimer: medarbejder.udregnLedigeTimer(),
      brugteTimer: medarbejder.udregnBrugteTimer(),
      totaleTimer: medarbejder.samletTimer,
      belastning: medarbejder.udregnArbejdsbelastning(),
      kompetencer: medarbejder.kompetencer.map((k) => k.kompetenceNavn),
      ugeBelastning: medarbejder.ugeBelastning
    },
    opgaver: medarbejderOpgaver.map((opgave) => ({
      id: opgave.opgaveID,
      titel: opgave.opgaveType,
      timer: opgave.estimeretTid,
      status: opgave.opgaveStatus
    })),
    muligeOpgaver
  });
};