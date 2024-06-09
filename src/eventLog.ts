class LogEntry {
    timestamp: Date;
    componentId: string;
    event: string = ""; // GameClockEvent | ScoreboardEvent
    params: object = new Object(); // GameClockEventParams | ...

    constructor(componentId: string) {
        this.timestamp = new Date();
        this.componentId = componentId;
    }
}

type EventLog = LogEntry[];

interface EventComponent<T> {
    // componentId: string;
    // constructor(componentId: string) {
    //     this.componentId = componentId;
    // };

    // The events the component has responded to
    events(): EventLog;
    // The unique identidier for the component
    id(): string;
    processEvent(event: T): void;
}