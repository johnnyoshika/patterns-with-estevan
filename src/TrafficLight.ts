// Receiver
export class TrafficLight {
  private state: 'RED' | 'YELLOW' | 'GREEN' = 'RED';

  public setRed() {
    this.state = 'RED';
    this.show();
  }

  public setYellow() {
    this.state = 'YELLOW';
    this.show();
  }

  public setGreen() {
    this.state = 'GREEN';
    this.show();
  }

  show() {
    console.log(this.state);
  }
}
