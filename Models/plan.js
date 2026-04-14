class Plan {
    constructor(planID, ugeNr) {
      this.planID = planID;
      this.ugeNr = ugeNr;
    }
  
    beregnArbejdsbelastning(medarbejder) {
      return medarbejder.udregnArbejdsbelastning();
    }
  
    vurderMatch(opgave, medarbejder) {
      const harKompetence = medarbejder.kompetencer.some(
        (kompetence) =>
          kompetence.kompetenceNavn.toLowerCase() ===
          opgave.kompetenceKrav.toLowerCase()
      );
  
      const ledigeTimer = medarbejder.udregnLedigeTimer();
      const passerTidsmæssigt = ledigeTimer >= opgave.estimeretTid;
  
      let score = 0;
  
      if (harKompetence) score += 60;
      if (passerTidsmæssigt) score += 25;
  
      score += Math.min(ledigeTimer, 15);
  
      if (score > 100) score = 100;
  
      return {
        medarbejder,
        score,
        harKompetence,
        ledigeTimer,
        passerTidsmæssigt
      };
    }
  
    beregnBedsteMatch(opgave, medarbejdere) {
      const vurderinger = medarbejdere.map((medarbejder) =>
        this.vurderMatch(opgave, medarbejder)
      );
  
      vurderinger.sort((a, b) => b.score - a.score);
  
      return vurderinger[0] || null;
    }
  
    fordelOpgaver(opgave, medarbejder) {
      const vurdering = this.vurderMatch(opgave, medarbejder);
  
      if (!vurdering.harKompetence || !vurdering.passerTidsmæssigt) {
        return {
          succes: false,
          besked: "Medarbejderens kompetencer eller kapacitet matcher ikke opgaven godt nok",
          vurdering
        };
      }
  
      opgave.tildelOpgave(medarbejder);
      medarbejder.tilføjOpgave(opgave);
  
      return {
        succes: true,
        besked: `Opgaven "${opgave.opgaveType}" er tildelt til ${medarbejder.navn}`,
        vurdering
      };
    }
  }
  
  module.exports = Plan;