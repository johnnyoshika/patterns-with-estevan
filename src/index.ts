type SwapiResult = {
  uid: string;
  properties: { name: string; url: string };
};

type SwapiData = {
  uid: string;
  name: string;
  url: string;
};

class SwapiServices {
  private async getResult(url: string): Promise<SwapiData> {
    const response = await fetch(url);
    const result = (await response.json()).result as SwapiResult;
    console.log('Network request', url);
    return {
      uid: result.uid,
      name: result.properties.name,
      url: result.properties.url,
    };
  }

  async getPlanet(uid: string) {
    return await this.getResult(
      `https://www.swapi.tech/api/planets/${uid}`,
    );
  }

  async getPerson(uid: string) {
    return await this.getResult(
      `https://www.swapi.tech/api/people/${uid}`,
    );
  }
}

// Proxy cache service
class SwapiProxyService {
  private swapiService = new SwapiServices();
  private planetCache = new Map<string, SwapiData>();
  private peopleCache = new Map<string, SwapiData>();

  async getPlanet(uid: string) {
    let planet = this.planetCache.get(uid);
    if (planet) return planet;

    planet = await this.swapiService.getPlanet(uid);
    this.planetCache.set(uid, planet);
    return planet;
  }

  async getPerson(uid: string) {
    let person = this.peopleCache.get(uid);
    if (person) return person;

    person = await this.swapiService.getPerson(uid);
    this.peopleCache.set(uid, person);
    return person;
  }
}

(async () => {
  const service = new SwapiProxyService();
  console.log(await service.getPlanet('1'));
  console.log(await service.getPlanet('1'));
  console.log(await service.getPerson('1'));
  console.log(await service.getPerson('1'));
})();
