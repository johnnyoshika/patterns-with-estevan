import { TrafficLight } from './TrafficLight';

// Commands
export interface ICommand {
  execute(): void;
}

export class SetRedCommand implements ICommand {
  constructor(private readonly light: TrafficLight) {}

  public execute() {
    this.light.setRed();
  }
}

export class SetYellowCommand implements ICommand {
  constructor(private readonly light: TrafficLight) {}

  public execute() {
    this.light.setYellow();
  }
}

export class SetGreenCommand implements ICommand {
  constructor(private readonly light: TrafficLight) {}

  public execute() {
    this.light.setGreen();
  }
}
