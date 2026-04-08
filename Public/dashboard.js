const teamIndhold = document.getElementById("team-indhold");
const opgaveIndhold = document.getElementById("opgave-indhold");

async function hentDashboardData() {
  const svar = await fetch("/api/dashboard");
  const data = await svar.json();
  visDashboardData(data);
}

function visDashboardData(data) {
  const { medarbejdere, opgaver } = data;

  teamIndhold.innerHTML = medarbejdere
    .map((medarbejder) => {
      return `
        <div class="medarbejder-kort">
          <img src="${medarbejder.billede}" alt="${medarbejder.navn}" class="avatar" />
          <h3>${medarbejder.navn}</h3>
          <p>${medarbejder.rolle}</p>
          <a class="knap sekundær" href="/medarbejder/${medarbejder.id}">Se profil</a>
        </div>
      `;
    })
    .join("");

  opgaveIndhold.innerHTML = medarbejdere
    .map((medarbejder) => {
      const medarbejderOpgaver = opgaver.filter(
        (opgave) => opgave.medarbejderId === medarbejder.id
      );

      return `
        <div class="opgave-sektion">
          <h3>${medarbejder.navn}s ansvar</h3>
          ${medarbejderOpgaver
            .map((opgave, index) => {
              const statusKlasse = hentStatusKlasse(opgave.status);
              const deadline = hentDeadline(index);
              const prioritet = hentPrioritet(index);

              return `
                <div class="opgave-dashboard-række">
                  <span class="opgave-navn">${opgave.titel}</span>
                  <span class="deadline ${deadline.klasse}">${deadline.tekst}</span>
                  <span class="status-pill ${statusKlasse}">${opgave.status}</span>
                  <span class="prioritet-pill ${prioritet.klasse}">${prioritet.tekst}</span>
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    })
    .join("");
}

function hentStatusKlasse(status) {
  if (status === "I gang") return "status-igang";
  if (status === "Planlagt") return "status-planlagt";
  if (status === "Ikke begyndt") return "status-ikke-begyndt";
  return "";
}

function hentDeadline(index) {
  const deadlines = [
    { tekst: "I dag", klasse: "deadline-rød" },
    { tekst: "I morgen", klasse: "deadline-pink" },
    { tekst: "Fredag", klasse: "deadline-grøn" },
    { tekst: "Tirsdag", klasse: "deadline-gul" }
  ];

  return deadlines[index % deadlines.length];
}

function hentPrioritet(index) {
  const prioriteter = [
    { tekst: "Høj prioritet", klasse: "prioritet-høj" },
    { tekst: "Medium prioritet", klasse: "prioritet-medium" },
    { tekst: "Lav prioritet", klasse: "prioritet-lav" }
  ];

  return prioriteter[index % prioriteter.length];
}

hentDashboardData();