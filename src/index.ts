interface IHandler {
  setNext(handler: IHandler): IHandler;

  handle(amount: number): void;
}

abstract class ATM implements IHandler {
  private nextHandler?: IHandler;

  constructor(
    public readonly denomination: number,
    public inventory: number,
  ) {}

  setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  tryHandleNext(amount: number): void {
    if (this.nextHandler) {
      this.nextHandler.handle(amount);
      return;
    }

    if (amount > 0) console.log(`Yikes! We still owe you $${amount}`);
  }

  handle(amount: number): void {
    if (amount <= 0) return;

    console.log(
      `------------------------------------------------------\n$${this.denomination} ATM handling $${amount} with remaining inventory of ${this.inventory}`,
    );

    if (amount < this.denomination) {
      console.log('Denomination is too large');
      return this.tryHandleNext(amount);
    }

    if (this.inventory < 1) {
      console.log('Insufficient funds');
      return this.tryHandleNext(amount);
    }

    const bills = Math.floor(amount / this.denomination);
    const dispense = Math.min(bills, this.inventory);
    console.log(`Dispensing ${dispense} $${this.denomination} bills`);
    this.inventory -= dispense;
    return this.tryHandleNext(amount - dispense * this.denomination);
  }
}

class ATM20 extends ATM {
  constructor(inventory: number) {
    super(20, inventory);
  }
}

class ATM10 extends ATM {
  constructor(inventory: number) {
    super(10, inventory);
  }
}

class ATM5 extends ATM {
  constructor(inventory: number) {
    super(5, inventory);
  }
}

class ATM1 extends ATM {
  constructor(inventory: number) {
    super(1, inventory);
  }
}

const atm = new ATM20(5);
atm.setNext(new ATM10(5)).setNext(new ATM5(5)).setNext(new ATM1(100));

console.log(`\n********** Withdrawing $78\n`);
atm.handle(78);

console.log(`\n********** Withdrawing $78\n`);
atm.handle(78);
