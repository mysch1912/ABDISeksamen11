class Medarbejder {
    constructor(medarbejderID, navn, email, rolle, samletTimer = 37) {
      this.medarbejderID = medarbejderID;
      this.navn = navn;
      this.email = email;
      this.rolle = rolle;
      this.samletTimer = samletTimer;
  
      this.afdeling = "";
      this.billede = "";
      this.kompetencer = [];
      this.aktuelleOpgaver = [];
      this.ugeBelastning = {
        man: 0,
        tir: 0,
        ons: 0,
        tor: 0,
        fre: 0
      };
    }
  
    tilføjKompetence(kompetence) {
      this.kompetencer.push(kompetence);
    }
  
    tilføjOpgave(opgave) {
      if (!this.aktuelleOpgaver.includes(opgave)) {
        this.aktuelleOpgaver.push(opgave);
      }
    }
  
    udregnAktuelleOpgaver() {
      return this.aktuelleOpgaver.length;
    }
  
    udregnBrugteTimer() {
      return this.aktuelleOpgaver.reduce((sum, opgave) => sum + opgave.estimeretTid, 0);
    }
  
    udregnLedigeTimer() {
      return Math.max(this.samletTimer - this.udregnBrugteTimer(), 0);
    }
  
    udregnArbejdsbelastning() {
      const brugteTimer = this.udregnBrugteTimer();
  
      if (brugteTimer >= this.samletTimer) {
        return "Høj";
      }
  
      if (brugteTimer >= this.samletTimer * 0.7) {
        return "Mellem";
      }
  
      return "Lav";
    }
  }
  
  module.exports = Medarbejder;