class HttpBinService {
  async getUuid() {
    const response = await fetch('https://httpbin.org/uuid');
    return (await response.json()).uuid as string;
  }
}

class JsonPlaceholderService {
  async getUsers() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users',
    );
    return (
      (await response.json()) as {
        id: number;
        name: string;
        username: string;
        email: string;
        phone: string;
      }[]
    ).map(u => ({
      id: u.id.toString(),
      name: u.name,
    }));
  }
}

class SwapiServices {
  async getPlanets() {
    const response = await fetch(
      'https://www.swapi.tech/api/planets',
    );
    return (
      (await response.json()).results as {
        uid: string;
        name: string;
        url: string;
      }[]
    ).map(p => ({ id: p.uid, name: p.name }));
  }
}

class PokemonServices {
  async getPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    return (
      (await response.json()).results as {
        name: string;
        url: string;
      }[]
    ).map(p => ({ id: p.url, name: p.name }));
  }
}

class Facade {
  getUuid() {
    return new HttpBinService().getUuid();
  }

  getUsers() {
    return new JsonPlaceholderService().getUsers();
  }

  getPlanets() {
    return new SwapiServices().getPlanets();
  }

  async getPokemons() {
    return new PokemonServices().getPokemons();
  }
}

(async () => {
  const facade = new Facade();

  const getData = async (index: number) => ({
    uuid: await facade.getUuid(),
    user: (await facade.getUsers())[index].name,
    planet: (await facade.getPlanets())[index].name,
    pokemon: (await facade.getPokemons())[index].name,
  });

  console.table([
    await getData(0),
    await getData(1),
    await getData(2),
  ]);
})();
