class Opgave {
    constructor(
      opgaveID,
      opgaveType,
      estimeretTid,
      opgaveBeskrivelse,
      opgaveStatus,
      kompetenceKrav,
      salg = null
    ) {
      this.opgaveID = opgaveID;
      this.opgaveType = opgaveType;
      this.estimeretTid = estimeretTid;
      this.egentligTid = 0;
      this.opgaveBeskrivelse = opgaveBeskrivelse;
      this.opgaveStatus = opgaveStatus;
      this.kompetenceKrav = kompetenceKrav;
      this.salg = salg;
      this.medarbejder = null;
      this.tidsregistreringer = [];
    }
  
    udregnEstimeretTid() {
      return this.estimeretTid;
    }
  
    tildelOpgave(medarbejder) {
      this.medarbejder = medarbejder;
      this.opgaveStatus = "Planlagt";
    }
  
    opdaterOpgaveStatus(nyStatus) {
      this.opgaveStatus = nyStatus;
    }
  
    bestemKompetenceNiveau() {
      return this.kompetenceKrav;
    }
  
    tilføjTidsregistrering(tidsregistrering) {
      this.tidsregistreringer.push(tidsregistrering);
      this.egentligTid = this.tidsregistreringer.reduce(
        (sum, registrering) => sum + registrering.antalTimer,
        0
      );
    }
  }
  
  module.exports = Opgave;