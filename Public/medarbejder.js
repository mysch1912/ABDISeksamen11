const medarbejderId = window.location.pathname.split("/").pop();

const sideOverskrift = document.getElementById("side-overskrift");
const profilIndhold = document.getElementById("profil-indhold");
const kapacitetIndhold = document.getElementById("kapacitet-indhold");
const kompetencerIndhold = document.getElementById("kompetencer-indhold");
const opgaverIndhold = document.getElementById("opgaver-indhold");
const muligeOpgaverIndhold = document.getElementById("mulige-opgaver-indhold");
const ugebelastningIndhold = document.getElementById("ugebelastning-indhold");
const feedbackBesked = document.getElementById("feedback-besked");

async function hentMedarbejderData() {
  try {
    const svar = await fetch(`/api/medarbejder/${medarbejderId}`);
    const data = await svar.json();
    visData(data);
  } catch (fejl) {
    console.error("Fejl ved hentning af medarbejderdata:", fejl);
    feedbackBesked.textContent = "Der opstod en fejl ved indlæsning af medarbejderdata.";
    feedbackBesked.style.color = "#c62828";
  }
}

function visData(data) {
  const { medarbejder, opgaver, muligeOpgaver } = data;

  sideOverskrift.textContent = `${medarbejder.navn} medarbejderprofil og kapacitetsoversigt`;

  profilIndhold.innerHTML = `
    <div class="profil-boks">
      <img src="${medarbejder.billede}" alt="${medarbejder.navn}" class="avatar" />
      <div>
        <h3>${medarbejder.navn}</h3>
        <p>${medarbejder.rolle}</p>
        <p>${medarbejder.afdeling}</p>
      </div>
    </div>
  `;

  const totalTimer = medarbejder.totaleTimer || 1;
  const ledigeProcent = Math.min((medarbejder.ledigeTimer / totalTimer) * 100, 100);
  const brugteProcent = Math.min((medarbejder.brugteTimer / totalTimer) * 100, 100);

  kapacitetIndhold.innerHTML = `
    <div class="kapacitet-linje">
      <span>Ledige timer:</span>
      <div class="progress-bar">
        <div class="progress-grøn" style="width:${ledigeProcent}%"></div>
      </div>
      <span>${medarbejder.ledigeTimer}</span>
    </div>

    <div class="kapacitet-linje">
      <span>Brugte timer:</span>
      <div class="progress-bar">
        <div class="progress-rød" style="width:${brugteProcent}%"></div>
      </div>
      <span>${medarbejder.brugteTimer}</span>
    </div>

    <div class="kapacitet-linje">
      <span>Total:</span>
      <div class="progress-bar">
        <div class="progress-gul" style="width:100%"></div>
      </div>
      <span>${medarbejder.totaleTimer}/${medarbejder.totaleTimer}</span>
    </div>

    <div class="kapacitet-linje">
      <span>Belastning:</span>
      <span class="badge ${hentBelastningsKlasse(medarbejder.belastning)}">${medarbejder.belastning}</span>
    </div>
  `;

  kompetencerIndhold.innerHTML = medarbejder.kompetencer
    .map((kompetence) => `<span class="chip">${kompetence}</span>`)
    .join("");

  if (opgaver.length === 0) {
    opgaverIndhold.innerHTML = `<p>Ingen nuværende opgaver.</p>`;
  } else {
    opgaverIndhold.innerHTML = opgaver
      .map((opgave) => {
        const statusKlasse = hentStatusKlasse(opgave.status);

        return `
          <div class="opgave-række">
            <span class="opgave-titel">${opgave.titel}</span>
            <span class="timer-pill">${opgave.timer} timer</span>
            <span class="status-pill ${statusKlasse}">${opgave.status}</span>
          </div>
        `;
      })
      .join("");
  }

  if (!muligeOpgaver || muligeOpgaver.length === 0) {
    muligeOpgaverIndhold.innerHTML = `<p>Der er ingen mulige opgaver lige nu.</p>`;
  } else {
    muligeOpgaverIndhold.innerHTML = muligeOpgaver
      .map((opgave) => {
        const matchBadgeKlasse = hentMatchKlasse(opgave.matchscore);
        const kompetenceTekst = opgave.matcherKompetence
          ? "Kompetence matcher"
          : "Kompetence matcher ikke";
        const kapacitetTekst = opgave.harKapacitet
          ? "Har kapacitet"
          : "Manglende kapacitet";

        return `
          <div class="mulig-opgave-kort">
            <div class="mulig-opgave-top">
              <h3>${opgave.titel}</h3>
              <span class="badge ${matchBadgeKlasse}">${opgave.matchscore}% match</span>
            </div>

            <p><strong>Timer:</strong> ${opgave.timer}</p>
            <p><strong>Kompetencekrav:</strong> ${opgave.kompetenceKrav}</p>

            <div class="mulig-opgave-tags">
              <span class="status-pill ${opgave.matcherKompetence ? "status-igang" : "status-ikke-begyndt"}">
                ${kompetenceTekst}
              </span>
              <span class="status-pill ${opgave.harKapacitet ? "status-igang" : "status-planlagt"}">
                ${kapacitetTekst}
              </span>
            </div>

            <button
              class="knap primær tildel-opgave-knap"
              type="button"
              data-opgave-id="${opgave.id}"
            >
              Tildel opgave
            </button>
          </div>
        `;
      })
      .join("");
  }

  ugebelastningIndhold.innerHTML = Object.entries(medarbejder.ugeBelastning)
    .map(([dag, værdi]) => {
      return `
        <div class="uge-række">
          <span class="dag-label">${gørFørsteBogstavStort(dag)}</span>
          <div class="uge-bar">
            <div class="uge-bar-udfyldning" style="width:${værdi * 10}%"></div>
          </div>
        </div>
      `;
    })
    .join("");

  tilføjKlikEventsTilOpgaver();
}

function tilføjKlikEventsTilOpgaver() {
  const knapper = document.querySelectorAll(".tildel-opgave-knap");

  knapper.forEach((knap) => {
    knap.addEventListener("click", async () => {
      const opgaveId = Number(knap.dataset.opgaveId);

      try {
        knap.disabled = true;
        feedbackBesked.textContent = "";

        const svar = await fetch("/api/tildel-opgave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            medarbejderId,
            opgaveId
          })
        });

        const resultat = await svar.json();

        feedbackBesked.textContent = resultat.besked;
        feedbackBesked.style.color = resultat.succes ? "#2b7a3d" : "#c62828";

        await hentMedarbejderData();
      } catch (fejl) {
        console.error("Fejl ved tildeling af opgave:", fejl);
        feedbackBesked.textContent = "Der opstod en fejl ved tildeling af opgaven.";
        feedbackBesked.style.color = "#c62828";
      } finally {
        knap.disabled = false;
      }
    });
  });
}

function hentStatusKlasse(status) {
  if (status === "I gang") return "status-igang";
  if (status === "Planlagt") return "status-planlagt";
  if (status === "Ikke begyndt") return "status-ikke-begyndt";
  return "";
}

function hentBelastningsKlasse(belastning) {
  if (belastning === "Høj") return "fare";
  if (belastning === "Mellem") return "status-planlagt";
  if (belastning === "Lav") return "succes";
  return "fare";
}

function hentMatchKlasse(score) {
  if (score >= 80) return "succes";
  if (score >= 60) return "status-planlagt";
  return "fare";
}

function gørFørsteBogstavStort(tekst) {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1);
}

hentMedarbejderData();