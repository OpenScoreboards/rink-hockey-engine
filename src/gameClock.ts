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
type GameClockEventData = null;
type GameClockEventAction = (data: GameClockEventData) => void;
const noOp: GameClockEventAction = (_data) => { };


type GameStateTransitionMap = Map<GameClockEvent, GameStateTransition>;
type GameStateTransition = {
    target: GameClockState,
    action: GameClockEventAction,
}

const transitions = new Map<GameClockState, GameStateTransitionMap>([
    [GameClockState.Stopped, new Map<GameClockEvent, GameStateTransition>([
        [GameClockEvent.Set, { target: GameClockState.Stopped, action: noOp }],
        [GameClockEvent.Start, { target: GameClockState.Running, action: noOp }],
    ])],
    [GameClockState.Running, new Map<GameClockEvent, GameStateTransition>([
        [GameClockEvent.Set, { target: GameClockState.Running, action: noOp }], // Maybe not?
        [GameClockEvent.Stop, { target: GameClockState.Stopped, action: noOp }],
        [GameClockEvent.Expired, { target: GameClockState.Stopped, action: noOp }]
    ])]
]);

export class GameClock implements EventComponent<GameClockEvent> {
    eventLog: EventLog = [];
    state: GameClockState = GameClockState.Stopped;
    clockId: string;

    constructor(id: string) {
        this.clockId = id;
    }

    events(): EventLog {
        return this.eventLog;
    }
    id(): string {
        return this.clockId;
    }

    processEvent(event: GameClockEvent): void {
        const transition = transitions.get(this.state)?.get(event);
        if (transition === undefined) {
            return
        }
        transition.action(null);
        this.state = transition.target;
        console.log(this.state);
    }
}
