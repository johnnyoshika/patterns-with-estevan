interface AmericanPower {
  use110v(): void;
}

interface EuropeanPower {
  use220v(): void;
}

class EuropeanToAmericanPowerAdapter implements AmericanPower {
  constructor(private europeanPower: EuropeanPower) {}

  use110v(): void {
    console.log('Converting 220v to 110v');
    this.europeanPower.use220v();
  }
}

class EuropeanAppliance implements EuropeanPower {
  use220v(): void {
    console.log('Using 220v');
  }
}

const primeraDishwasher = new EuropeanAppliance();
const powerAdapter = new EuropeanToAmericanPowerAdapter(
  primeraDishwasher,
);
powerAdapter.use110v();
