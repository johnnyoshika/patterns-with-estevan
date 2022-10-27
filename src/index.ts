class Person {
  constructor(
    public readonly name: string,
    public readonly age: string = '25',
    public readonly country: string,
  ) {}
}

const john = new Person('John', undefined, 'USA');

console.log('Age', john.age);
