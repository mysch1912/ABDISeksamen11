const medarbejderId = window.location.pathname.split("/").pop();

const sideOverskrift = document.getElementById("side-overskrift");
const profilIndhold = document.getElementById("profil-indhold");
const kapacitetIndhold = document.getElementById("kapacitet-indhold");
const kompetencerIndhold = document.getElementById("kompetencer-indhold");
const opgaverIndhold = document.getElementById("opgaver-indhold");
const forslagIndhold = document.getElementById("forslag-indhold");
const ugebelastningIndhold = document.getElementById("ugebelastning-indhold");
const tildelKnap = document.getElementById("tildel-knap");
const feedbackBesked = document.getElementById("feedback-besked");

async function hentMedarbejderData() {
  const svar = await fetch(`/api/medarbejder/${medarbejderId}`);
  const data = await svar.json();
  visData(data);
}

function visData(data) {
  const { medarbejder, opgaver, forslag } = data;

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

  kapacitetIndhold.innerHTML = `
    <div class="kapacitet-linje">
      <span>Ledige timer:</span>
      <div class="progress-bar"><div class="progress-grøn" style="width:${(medarbejder.ledigeTimer / medarbejder.totaleTimer) * 100}%"></div></div>
      <span>${medarbejder.ledigeTimer}</span>
    </div>

    <div class="kapacitet-linje">
      <span>Brugte timer:</span>
      <div class="progress-bar"><div class="progress-rød" style="width:${(medarbejder.brugteTimer / medarbejder.totaleTimer) * 100}%"></div></div>
      <span>${medarbejder.brugteTimer}</span>
    </div>

    <div class="kapacitet-linje">
      <span>Total:</span>
      <div class="progress-bar"><div class="progress-gul" style="width:100%"></div></div>
      <span>${medarbejder.totaleTimer}/${medarbejder.totaleTimer}</span>
    </div>

    <div class="kapacitet-linje">
      <span>Belastning:</span>
      <span class="badge fare">${medarbejder.belastning}</span>
    </div>
  `;

  kompetencerIndhold.innerHTML = medarbejder.kompetencer
    .map((kompetence) => `<span class="chip">${kompetence}</span>`)
    .join("");

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

  forslagIndhold.innerHTML = `
    <p><strong>Opgave:</strong> "${forslag.foreslåetOpgave}"</p>
    <p><strong>Matchscore:</strong> <span class="badge succes">${forslag.matchscore}%</span></p>

    <div class="begrundelses-boks">
      <strong>Begrundelse:</strong>
      <ul>
        ${forslag.begrundelser.map((begrundelse) => `<li>${begrundelse}</li>`).join("")}
      </ul>
    </div>
  `;

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
}

tildelKnap.addEventListener("click", async () => {
  const svar = await fetch("/api/tildel-opgave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ medarbejderId })
  });

  const resultat = await svar.json();
  feedbackBesked.textContent = resultat.besked;

  hentMedarbejderData();
});

function hentStatusKlasse(status) {
  if (status === "I gang") return "status-igang";
  if (status === "Planlagt") return "status-planlagt";
  if (status === "Ikke begyndt") return "status-ikke-begyndt";
  return "";
}

function gørFørsteBogstavStort(tekst) {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1);
}

hentMedarbejderData();