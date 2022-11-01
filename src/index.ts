abstract class Pizza {
  abstract description: string;
  abstract price: number;
}

class ThinCrustPizza extends Pizza {
  description = 'Thin Crust';
  price = 8;
}

class ThickCrustPizza extends Pizza {
  description = 'Thick Crust';
  price = 10;
}

class FlatBreadPizza extends Pizza {
  description = 'Flat Bread';
  price = 12;
}

abstract class PizzaDecorator extends Pizza {
  constructor(private pizza: Pizza) {
    super();
  }

  abstract decoratorDescription: string;
  abstract decoratorPrice: number;

  get description() {
    return `${this.decoratorDescription} ${this.pizza.description}`;
  }

  get price() {
    return this.pizza.price + this.decoratorPrice;
  }
}

class Cheese extends PizzaDecorator {
  decoratorDescription = 'Cheese';
  decoratorPrice = 4;
}

class Pepperoni extends PizzaDecorator {
  decoratorDescription = 'Pepperoni';
  decoratorPrice = 5;
}

class Pineapple extends PizzaDecorator {
  decoratorDescription = 'Pineapple';
  decoratorPrice = 2;
}

function makePizza(pizza: Pizza) {
  console.log(
    `Making a "${pizza.description}" pizza for $${pizza.price}`,
  );
}

makePizza(new Pineapple(new Cheese(new ThinCrustPizza())));
makePizza(new Pepperoni(new Cheese(new ThickCrustPizza())));
