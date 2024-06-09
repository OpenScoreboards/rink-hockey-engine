import { EventComponent, EventLog, LogEntry } from "./eventLog";

export enum GameClockEvent {
    Set = 0,
    Start,
    Stop,
    Expired,
}
export enum GameClockState {
    Stopped = 0,
    Running,
}
type GameClockEventData = number | null;
type GameClockEventAction = (clock: GameClock, entry: LogEntry<GameClockEvent, GameClockEventData>) => void;
const noOp: GameClockEventAction = (clock, _entry) => { return clock; };


type GameStateTransitionMap = Map<GameClockEvent, GameStateTransition>;
type GameStateTransition = {
    target: GameClockState,
    action: GameClockEventAction,
}


export class GameClock implements EventComponent<GameClockEvent, GameClockEventData> {
    transitions = new Map<GameClockState, GameStateTransitionMap>([
        [GameClockState.Stopped, new Map<GameClockEvent, GameStateTransition>([
            [GameClockEvent.Set, { target: GameClockState.Stopped, action: this.setClock }],
            [GameClockEvent.Start, { target: GameClockState.Running, action: this.startClock }],
        ])],
        [GameClockState.Running, new Map<GameClockEvent, GameStateTransition>([
            [GameClockEvent.Set, { target: GameClockState.Running, action: noOp }], // Maybe not?
            [GameClockEvent.Stop, { target: GameClockState.Stopped, action: noOp }],
            [GameClockEvent.Expired, { target: GameClockState.Stopped, action: (clock, _data) => { console.log("HONK"); return clock; } }]
        ])]

    ]);
    eventLog: EventLog;
    state: GameClockState = GameClockState.Stopped;
    startTime: Date = new Date();
    // startingTime: number = 10 * 60 * 1000;
    timeRemaining: number = 0;
    clockId: string;

    constructor(eventLog: EventLog, id: string) {
        this.clockId = id;
        this.eventLog = eventLog;
    }

    id(): string {
        return this.clockId;
    }

    processEvent(entry: LogEntry<GameClockEvent, GameClockEventData>): void {
        const transition = this.transitions.get(this.state)?.get(entry.event);
        if (transition === undefined) {
            return
        }
        transition.action(this, entry);
        this.state = transition.target;
    }

    getTimeRemaining(): Date {
        if (this.state == GameClockState.Running) {
            const now = new Date();
            const timeSinceStart = now - this.startTime;
            this.startTime = now;
            this.timeRemaining -= timeSinceStart;
            if (this.timeRemaining < 0) {
                this.timeRemaining = 0;
                this.eventLog.processEvent('mainClock', GameClockEvent.Expired, null);
            }
        }
        return new Date(this.timeRemaining);
    }

    startClock(clock: GameClock, entry: LogEntry<GameClockEvent, GameClockEventData>) {
        clock.startTime = entry.timestamp;
    }

    setClock(clock: GameClock, entry: LogEntry<GameClockEvent, GameClockEventData>) {
        const params = entry.params;
        if (params === null || params <= 0) {
            console.log("malformed log entry");
            return
        }
        clock.timeRemaining = params;
    }
}
