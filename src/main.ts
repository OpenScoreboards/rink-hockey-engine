import { GameClock, GameClockEvent } from './gameClock';
import { EventLog, LogEntry } from './eventLog';

let eventLog = new EventLog();
let clockEngine = new GameClock(eventLog,'mainClock');
eventLog.listeners.set('mainClock', [clockEngine]);

function start() {
  eventLog.processEvent('mainClock', GameClockEvent.Start, null);
}
function stop() {
  eventLog.processEvent('mainClock', GameClockEvent.Stop, null);
}
function set() {
  eventLog.processEvent('mainClock', GameClockEvent.Set, 5 * 1000);
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

setInterval(() => {
  const timeRemaining = clockEngine.getTimeRemaining();
  const timeString = `${pad(timeRemaining.getMinutes(), 2)}:${pad(timeRemaining.getSeconds(), 2)}`
  console.log(timeString);
}, 500);

