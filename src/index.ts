abstract class Car {
  static create(brand: string) {
    return ['Porsche', 'Ferrari', 'Lamborghini'].includes(brand)
      ? new FastCar(brand)
      : new SlowCar(brand);
  }

  constructor(public readonly brand: string) {}

  abstract speed: number;

  /**
   *
   * @param distance in km
   * @returns Estimated time in minutes
   */
  estimatedDriveTime(distance: number) {
    return Math.round((distance / this.speed) * 60);
  }
}

class FastCar extends Car {
  readonly speed: number = 100;
}

class SlowCar extends Car {
  readonly speed: number = 50;
}

const driveTime = (car: Car, distance: number) =>
  console.log(
    `${car.brand} will take ${car.estimatedDriveTime(
      distance,
    )} minutes to drive ${distance} km`,
  );

const porsche = Car.create('Porsche');
const ford = Car.create('Ford');

driveTime(porsche, 100);
driveTime(ford, 100);
