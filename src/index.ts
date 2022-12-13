class ArrayIterator<T> {
  private _array: T[];
  private _index: number;

  constructor(array: T[]) {
    this._array = array;
    this._index = 0;
  }

  public next(): T {
    return this._array[this._index++];
  }

  public hasNext(): boolean {
    return this._index < this._array.length;
  }
}

class User {
  constructor(public name: string) {}

  public sayHi(): void {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const users = new ArrayIterator([
  new User('John'),
  new User('Jane'),
  new User('Bob'),
]);

while (users.hasNext()) users.next().sayHi();
