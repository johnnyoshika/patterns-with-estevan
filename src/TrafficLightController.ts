import { ICommand } from './Command';

// Invoker
export class TrafficLightController {
  private commands: { [name: string]: ICommand } = {};
  private history: [Date, string][] = [];

  public register(name: string, command: ICommand) {
    this.commands[name] = command;
  }

  public execute(name: string) {
    if (name in this.commands) {
      this.commands[name].execute();
      this.history.push([new Date(), name]);
    } else {
      console.log(`Command ${name} not found`);
    }
  }

  public undo() {
    const last = this.history.pop();
    if (last) {
      console.log(`Undoing command: ${last[1]}`);
      const previous = this.history[this.history.length - 1];
      if (previous) this.commands[previous[1]].execute();
    }
  }

  public showHistory() {
    console.log('History:');
    this.history.forEach(h =>
      console.log(`${h[0].toLocaleTimeString('en-US')}: ${h[1]}`),
    );
  }
}
