import { GameClock, GameClockEvent } from './gameClock';

let clockEngine = new GameClock('mainClock');

function start() {
  clockEngine.processEvent(GameClockEvent.Start);
}
function stop() {
  clockEngine.processEvent(GameClockEvent.Stop);
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
    </a>
    <h1>TypeScript</h1>
    ${clockEngine.state}
    <div class="card">
      <button id="start" type="button">Start</button>
      <button id="stop" type="button">Stop</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

document.querySelector<HTMLButtonElement>('#start')!.addEventListener("click", start);
document.querySelector<HTMLButtonElement>('#stop')!.addEventListener("click", stop);

