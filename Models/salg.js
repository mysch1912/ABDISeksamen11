class Salg {
    constructor(salgsID, firmaNavn, salgsDato) {
      this.salgsID = salgsID;
      this.firmaNavn = firmaNavn;
      this.salgsDato = salgsDato;
      this.opgaver = [];
    }
  
    opretOpgave(opgave) {
      this.opgaver.push(opgave);
    }
  
    opretSalg() {
      return {
        salgsID: this.salgsID,
        firmaNavn: this.firmaNavn,
        salgsDato: this.salgsDato
      };
    }
  }
  
  module.exports = Salg;