import {
  SetGreenCommand,
  SetRedCommand,
  SetYellowCommand,
} from './Command';
import { TrafficLight } from './TrafficLight';
import { TrafficLightController } from './TrafficLightController';

const sleep = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const trafficLight = new TrafficLight();
const setRed = new SetRedCommand(trafficLight);
const setYellow = new SetYellowCommand(trafficLight);
const setGreen = new SetGreenCommand(trafficLight);

const controller = new TrafficLightController();
controller.register('red', setRed);
controller.register('yellow', setYellow);
controller.register('green', setGreen);

(async () => {
  controller.execute('green');
  await sleep(2000);
  controller.execute('yellow');
  await sleep(1000);
  controller.execute('red');
  await sleep(3000);
  controller.execute('yellow');
  await sleep(1000);
  controller.undo();
  await sleep(1000);
  controller.execute('green');
  await sleep(2000);
  controller.execute('yellow');
  await sleep(1000);
  controller.execute('red');
  await sleep(3000);

  console.log();
  controller.showHistory();
})();
