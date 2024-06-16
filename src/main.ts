import { ClockEvent, Component, EventLogger } from './api';
import { EventLog } from './impl/eventLog';
import { GameClock } from './impl/gameClock';
import { RinkHockeyScoreboard } from './impl/scoreboard';
import { ShotClock } from './impl/shotClock';


let eventLog = new EventLog();
let clockEngine = new RinkHockeyScoreboard();
let shotClock = new ShotClock(eventLog);
console.log(eventLog);
clockEngine.addComponent(new GameClock(eventLog));
console.log(eventLog);
clockEngine.addComponent(shotClock);
console.log(eventLog);
eventLog.registerListener(GameClock.componentId, shotClock);
console.log(eventLog);
// clockEngine.getEventLog().registerListener

function start() {
  clockEngine.getEventLog().processEvent(GameClock.componentId, ClockEvent.Start, null);
}
function stop() {
  clockEngine.getEventLog().processEvent(GameClock.componentId, ClockEvent.Stop, null);
}
function set() {
  clockEngine.getEventLog().processEvent(GameClock.componentId, ClockEvent.Set, 5 * 1000);
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
    </a>
    <h1>TypeScript</h1>
    <div class="card">
      <button id="start" type="button">Start</button>
      <button id="stop" type="button">Stop</button>
      <button id="set" type="button">set</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

document.querySelector<HTMLButtonElement>('#start')!.addEventListener("click", start);
document.querySelector<HTMLButtonElement>('#stop')!.addEventListener("click", stop);
document.querySelector<HTMLButtonElement>('#set')!.addEventListener("click", set);

function pad(num: number, size: number): string {
  let result = num.toString();
  while (result.length < size) result = "0" + num;
  return result;
}

// setInterval(() => {
//   const timeRemaining = clockEngine.getTimeRemaining();
//   const timeString = `${pad(timeRemaining.getMinutes(), 2)}:${pad(timeRemaining.getSeconds(), 2)}`
//   console.log(timeString);
// }, 500);

