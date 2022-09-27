interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;
}

// Factory
export const createDatabase = <T extends BaseRecord>() => {
  class InMemoryDatabase implements Database<T> {
    // Singleton
    static instance: InMemoryDatabase = new InMemoryDatabase();

    private constructor() {}

    private data: Record<string, T> = {};

    set(newValue: T): void {
      this.data[newValue.id] = newValue;
    }

    get(id: string): T | undefined {
      return this.data[id];
    }
  }

  return InMemoryDatabase;
};
