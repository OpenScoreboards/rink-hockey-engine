import { ClockComponent, ClockEvent, ClockEventData, ClockState, EventLogger, LogEntry } from "../api";

type GameClockEventAction = (clock: ClockComponentImpl, entry: LogEntry<ClockEvent, ClockEventData>) => void;
const noOp: GameClockEventAction = (clock, entry) => {
    console.log(`Game clock in state ${clock.state} did nothing with event ${entry.event}`);
    return clock;
};

type GameStateTransitionMap = Map<ClockEvent, GameStateTransition>;
type GameStateTransition = {
    target: ClockState,
    action: GameClockEventAction,
}

export abstract class ClockComponentImpl implements ClockComponent {
    transitions = new Map<ClockState, GameStateTransitionMap>([
        [ClockState.Stopped, new Map<ClockEvent, GameStateTransition>([
            [ClockEvent.Set, { target: ClockState.Stopped, action: this.setClock }],
            [ClockEvent.Start, { target: ClockState.Running, action: this.startClock }],
        ])],
        [ClockState.Running, new Map<ClockEvent, GameStateTransition>([
            [ClockEvent.Set, { target: ClockState.Running, action: this.setClock }], // Maybe not?
            [ClockEvent.Stop, { target: ClockState.Stopped, action: noOp }],
            [ClockEvent.Expired, { target: ClockState.Stopped, action: this.timeExpired }]
        ])]

    ]);
    eventLog: EventLogger;
    state: ClockState = ClockState.Stopped;
    startTime: Date = new Date();
    // startingTime: number = 10 * 60 * 1000;
    timeRemaining: number = 0;
    abstract id: string;

    constructor(eventLog: EventLogger) {
        this.eventLog = eventLog;
    }

    abstract getJsonData(): any;

    processEvent(entry: LogEntry<ClockEvent, ClockEventData>): void {
        const transition = this.transitions.get(this.state)?.get(entry.event);
        if (transition === undefined) {
            return
        }
        transition.action(this, entry);
        this.state = transition.target;
    }

    getTimeRemaining(): Date {
        if (this.state == ClockState.Running) {
            const now = new Date();
            const timeSinceStart = now - this.startTime;
            this.startTime = now;
            this.timeRemaining -= timeSinceStart;
            if (this.timeRemaining < 0) {
                this.timeRemaining = 0;
                this.eventLog.processEvent(this.id, ClockEvent.Expired, null);
            }
        }
        return new Date(this.timeRemaining);
    }

    startClock(clock: ClockComponentImpl, entry: LogEntry<ClockEvent, ClockEventData>) {
        clock.startTime = entry.timestamp;
    }

    setClock(clock: ClockComponentImpl, entry: LogEntry<ClockEvent, ClockEventData>) {
        const params = entry.params;
        if (params === null || params <= 0) {
            console.log("malformed log entry");
            return
        }
        clock.timeRemaining = params;
    }

    timeExpired(clock: ClockComponentImpl, _entry: LogEntry<ClockEvent, ClockEventData>) {
        console.log("honk");
        return clock;
    }
}