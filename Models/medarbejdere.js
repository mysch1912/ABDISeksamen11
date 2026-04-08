const medarbejdere = [
    {
      id: 1,
      navn: "Jonas N.",
      rolle: "Medarbejder",
      afdeling: "UX / analyse",
      billede: "/images/jonas.png",
      ledigeTimer: 14,
      brugteTimer: 23,
      totaleTimer: 37,
      belastning: "Høj",
      kompetencer: [
        "UX research",
        "Kundekontakt",
        "Projektstyring",
        "Dataanalyse",
        "Workshop"
      ],
      ugeBelastning: {
        man: 8,
        tir: 6,
        ons: 9,
        tor: 5,
        fre: 4
      }
    },
    {
      id: 2,
      navn: "Sara I.",
      rolle: "Junior medarbejder",
      afdeling: "Marketing / analyse",
      billede: "/images/sara.png",
      ledigeTimer: 18,
      brugteTimer: 19,
      totaleTimer: 37,
      belastning: "Mellem",
      kompetencer: [
        "Marketing",
        "Dataindsamling",
        "Kundekontakt"
      ],
      ugeBelastning: {
        man: 5,
        tir: 4,
        ons: 6,
        tor: 3,
        fre: 1
      }
    }
  ];
  
  module.exports = medarbejdere;