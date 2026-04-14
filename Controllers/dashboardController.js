const path = require("path");
const { medarbejdere, opgaver } = require("../Models/data.js");

exports.hentDashboardSide = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Public", "dashboard.html"));
};

exports.hentDashboardData = (req, res) => {
  const dashboardMedarbejdere = medarbejdere.map((medarbejder) => ({
    id: medarbejder.medarbejderID,
    navn: medarbejder.navn,
    rolle: medarbejder.rolle,
    afdeling: medarbejder.afdeling,
    billede: medarbejder.billede,
    ledigeTimer: medarbejder.udregnLedigeTimer(),
    brugteTimer: medarbejder.udregnBrugteTimer(),
    totaleTimer: medarbejder.samletTimer,
    belastning: medarbejder.udregnArbejdsbelastning(),
    kompetencer: medarbejder.kompetencer.map(
      (kompetence) => kompetence.kompetenceNavn
    ),
    ugeBelastning: medarbejder.ugeBelastning
  }));

  const dashboardOpgaver = opgaver.map((opgave) => ({
    id: opgave.opgaveID,
    medarbejderId: opgave.medarbejder ? opgave.medarbejder.medarbejderID : null,
    titel: opgave.opgaveType,
    timer: opgave.estimeretTid,
    status: opgave.opgaveStatus
  }));

  res.json({
    medarbejdere: dashboardMedarbejdere,
    opgaver: dashboardOpgaver
  });
};