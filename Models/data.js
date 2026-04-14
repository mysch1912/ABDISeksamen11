const Medarbejder = require("./medarbejder");
const Kompetence = require("./kompetence");
const Opgave = require("./opgave");
const Salg = require("./salg");
const Tidsregistrering = require("./tidsregistrering");
const Plan = require("./plan");

// Medarbejdere
const jonas = new Medarbejder(
  1,
  "Jonas N.",
  "jonas@abdis.dk",
  "Medarbejder",
  37
);
jonas.afdeling = "UX / analyse";
jonas.billede = "/images/jonas.png";
jonas.ugeBelastning = {
  man: 8,
  tir: 6,
  ons: 9,
  tor: 5,
  fre: 4
};

jonas.tilføjKompetence(new Kompetence(1, "UX research", "Høj"));
jonas.tilføjKompetence(new Kompetence(2, "Kundekontakt", "Mellem"));
jonas.tilføjKompetence(new Kompetence(3, "Projektstyring", "Mellem"));
jonas.tilføjKompetence(new Kompetence(4, "Dataanalyse", "Høj"));
jonas.tilføjKompetence(new Kompetence(5, "Workshop", "Mellem"));

const sara = new Medarbejder(
  2,
  "Sara I.",
  "sara@abdis.dk",
  "Junior medarbejder",
  37
);
sara.afdeling = "Marketing / analyse";
sara.billede = "/images/sara.png";
sara.ugeBelastning = {
  man: 5,
  tir: 4,
  ons: 6,
  tor: 3,
  fre: 1
};

sara.tilføjKompetence(new Kompetence(6, "Marketing", "Mellem"));
sara.tilføjKompetence(new Kompetence(7, "Dataindsamling", "Mellem"));
sara.tilføjKompetence(new Kompetence(8, "Kundekontakt", "Basis"));

const medarbejdere = [jonas, sara];

// Salg
const salg1 = new Salg(1, "Novo Nordisk", "2026-04-01");
const salg2 = new Salg(2, "Matas", "2026-04-02");

// Opgaver allerede tildelt
const opgave1 = new Opgave(
  1,
  "Marketing analyse",
  6,
  "Analyseopgave for marketing",
  "I gang",
  "Dataanalyse",
  salg1
);

const opgave2 = new Opgave(
  2,
  "Mødeindkaldelse Matas",
  2,
  "Planlægning af møde",
  "Planlagt",
  "Kundekontakt",
  salg2
);

const opgave3 = new Opgave(
  3,
  "Kundeopfølgning LEGO",
  4,
  "Opfølgning på kundehenvendelse",
  "Ikke begyndt",
  "Kundekontakt",
  salg2
);

const opgave4 = new Opgave(
  4,
  "Dataindsamling",
  3,
  "Indsamling af datagrundlag",
  "I gang",
  "Marketing",
  salg1
);

// Mulige / utildelte opgaver
const opgave5 = new Opgave(
  5,
  "SWOT analyse for Novo Nordisk",
  5,
  "SWOT analyse på baggrund af kundedata",
  "Ikke begyndt",
  "UX research",
  salg1
);

const opgave6 = new Opgave(
  6,
  "Marketing kampagne analyse",
  4,
  "Analyse af performance på ny marketingkampagne",
  "Ikke begyndt",
  "Marketing",
  salg2
);

const opgave7 = new Opgave(
  7,
  "Kundemøde for Matas",
  3,
  "Forberedelse og koordinering af kundemøde",
  "Ikke begyndt",
  "Kundekontakt",
  salg2
);

const opgave8 = new Opgave(
  8,
  "Workshop planlægning",
  4,
  "Planlægning af intern workshop",
  "Ikke begyndt",
  "Workshop",
  salg1
);

// Knyt opgaver til salg
salg1.opretOpgave(opgave1);
salg1.opretOpgave(opgave4);
salg1.opretOpgave(opgave5);
salg1.opretOpgave(opgave8);

salg2.opretOpgave(opgave2);
salg2.opretOpgave(opgave3);
salg2.opretOpgave(opgave6);
salg2.opretOpgave(opgave7);

// Knyt opgaver til medarbejdere
opgave1.tildelOpgave(jonas);
jonas.tilføjOpgave(opgave1);

opgave2.tildelOpgave(jonas);
jonas.tilføjOpgave(opgave2);

opgave3.tildelOpgave(jonas);
jonas.tilføjOpgave(opgave3);

opgave4.tildelOpgave(sara);
sara.tilføjOpgave(opgave4);

const opgaver = [
  opgave1,
  opgave2,
  opgave3,
  opgave4,
  opgave5,
  opgave6,
  opgave7,
  opgave8
];

// Tidsregistreringer
const registrering1 = new Tidsregistrering(1, "2026-04-08", 2);
const registrering2 = new Tidsregistrering(2, "2026-04-09", 3);

opgave1.tilføjTidsregistrering(registrering1);
opgave1.tilføjTidsregistrering(registrering2);

const tidsregistreringer = [registrering1, registrering2];

// Plan
const plan = new Plan(1, 15);

module.exports = {
  medarbejdere,
  opgaver,
  salg: [salg1, salg2],
  tidsregistreringer,
  plan
};