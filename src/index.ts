interface IPrototype {
  clone(): IPrototype;
}

class Martian implements IPrototype {
  constructor(public name: string, public kids: Martian[]) {}

  clone(): Martian {
    return new Martian(
      this.name,
      this.kids.map(kid => kid.clone()),
    );
  }

  indent(size: number) {
    return Array(size).fill('\t').join('');
  }

  format(level: number = 0): string {
    return `${this.name}\n${this.kids
      .map(kid => `${this.indent(level + 1)}${kid.format(level + 1)}`)
      .join('')}`;
  }
}

const john = new Martian('John', [
  new Martian('John Jr.', [new Martian('John III', [])]),
  new Martian('Jane', []),
]);

const johnClone = john.clone();
johnClone.name = 'John Clone';
johnClone.kids[0].name = 'John Jr. Clone';
johnClone.kids[0].kids[0].name = 'John III Clone';
johnClone.kids[1].name = 'Jane Clone';

console.log(`${john.format()}`);
console.log(`${johnClone.format()}`);
