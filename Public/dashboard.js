const teamIndhold = document.getElementById("team-indhold");
const opgaveIndhold = document.getElementById("opgave-indhold");

async function hentDashboardData() {
  try {
    const svar = await fetch("/api/dashboard");
    const data = await svar.json();
    visDashboardData(data);
  } catch (fejl) {
    console.error("Fejl ved hentning af dashboard-data:", fejl);
    teamIndhold.innerHTML = `<p>Kunne ikke indlæse teamdata.</p>`;
    opgaveIndhold.innerHTML = `<p>Kunne ikke indlæse opgaveoversigt.</p>`;
  }
}

function visDashboardData(data) {
  const { medarbejdere, opgaver } = data;

  if (!medarbejdere || medarbejdere.length === 0) {
    teamIndhold.innerHTML = `<p>Ingen medarbejdere fundet.</p>`;
  } else {
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
  }

  if (!medarbejdere || medarbejdere.length === 0) {
    opgaveIndhold.innerHTML = `<p>Ingen opgaver fundet.</p>`;
    return;
  }

  opgaveIndhold.innerHTML = medarbejdere
    .map((medarbejder) => {
      const medarbejderOpgaver = opgaver.filter(
        (opgave) => opgave.medarbejderId === medarbejder.id
      );

      if (medarbejderOpgaver.length === 0) {
        return `
          <div class="opgave-sektion">
            <h3>${medarbejder.navn}s ansvar</h3>
            <p>Ingen opgaver tildelt.</p>
          </div>
        `;
      }

      return `
        <div class="opgave-sektion">
          <h3>${medarbejder.navn}s ansvar</h3>
          ${medarbejderOpgaver
            .map((opgave, index) => {
              const statusKlasse = hentStatusKlasse(opgave.status);
              const deadline = hentDeadline(opgave, index);
              const prioritet = hentPrioritet(opgave, index);

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

function hentDeadline(opgave, index) {
  if (opgave.deadline && opgave.deadlineTekst && opgave.deadlineKlasse) {
    return {
      tekst: opgave.deadlineTekst,
      klasse: opgave.deadlineKlasse
    };
  }

  const deadlines = [
    { tekst: "I dag", klasse: "deadline-rød" },
    { tekst: "I morgen", klasse: "deadline-pink" },
    { tekst: "Fredag", klasse: "deadline-grøn" },
    { tekst: "Tirsdag", klasse: "deadline-gul" }
  ];

  return deadlines[index % deadlines.length];
}

function hentPrioritet(opgave, index) {
  if (opgave.prioritetTekst && opgave.prioritetKlasse) {
    return {
      tekst: opgave.prioritetTekst,
      klasse: opgave.prioritetKlasse
    };
  }

  const prioriteter = [
    { tekst: "Høj prioritet", klasse: "prioritet-høj" },
    { tekst: "Medium prioritet", klasse: "prioritet-medium" },
    { tekst: "Lav prioritet", klasse: "prioritet-lav" }
  ];

  return prioriteter[index % prioriteter.length];
}

hentDashboardData();