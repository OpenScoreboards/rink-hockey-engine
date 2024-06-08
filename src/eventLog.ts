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

interface Component {
    // componentId: string;
    // constructor(componentId: string) {
    //     this.componentId = componentId;
    // };
    events(): EventLog ;
    id(): string;
}