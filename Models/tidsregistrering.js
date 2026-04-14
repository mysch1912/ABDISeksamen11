class Tidsregistrering {
    constructor(registreringID, dato, antalTimer) {
      this.registreringID = registreringID;
      this.dato = dato;
      this.antalTimer = antalTimer;
    }
  
    gemRegistrering() {
      return {
        registreringID: this.registreringID,
        dato: this.dato,
        antalTimer: this.antalTimer
      };
    }
  }
  
  module.exports = Tidsregistrering;