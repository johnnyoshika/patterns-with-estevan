interface IObserver {
  readonly id: string;
  update(subject: ISubject): void;
}

interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): void;
}

class Birthday implements ISubject {
  private observers: IObserver[] = [];

  constructor(public readonly name: string) {}

  subscribe(observer: IObserver): void {
    this.observers = this.observers.concat(observer);
  }
  unsubscribe(observer: IObserver): void {
    this.observers = this.observers.filter(o => o.id !== observer.id);
  }
  notify(): void {
    this.observers.forEach(observer => observer.update(this));
  }

  toString = () => this.name;
}

class GiftGiver implements IObserver {
  constructor(public readonly id: string) {}

  update(subject: ISubject): void {
    console.log(`${this.id} gives gift to ${subject}`);
  }
}

const sallyBirthday = new Birthday('Sally');
const johnBirthday = new Birthday('John');

const mom = new GiftGiver('Mom');
const dad = new GiftGiver('Dad');
const grandma = new GiftGiver('Grandma');

sallyBirthday.subscribe(mom);
sallyBirthday.subscribe(dad);
sallyBirthday.subscribe(grandma);

johnBirthday.subscribe(mom);
johnBirthday.subscribe(dad);
johnBirthday.subscribe(grandma);

console.log("It's Sally's birthday!");
sallyBirthday.notify();

setTimeout(() => {
  console.log("\nIt's John's birthday!");
  johnBirthday.notify();
}, 5000);
