export class LogEntry<EventType, ParamType> {
    timestamp: Date;
    componentId: string;
    event: EventType;
    params: ParamType;

    constructor(componentId: string, event: EventType, params: ParamType) {
        this.timestamp = new Date();
        this.componentId = componentId;
        this.event = event;
        this.params = params;
    }
}

// export type EventLog = LogEntry<any, any>[];
export class EventLog {
    entries: LogEntry<any, any>[] = [];
    // listeners: EventComponent<any, any>[] = [];
    listeners: Map<string, Array<EventComponent<any, any>>> = new Map<string, Array<EventComponent<any, any>>>();

    processEvent<EventType, ParamType>(componentId: string, event: EventType, params: ParamType) {
        let logEntry = new LogEntry<EventType, ParamType>(componentId, event, params);
        this.entries.push(logEntry);
        this.listeners.get(componentId)?.forEach((listener) => {
            (listener as EventComponent<EventType, ParamType>).processEvent(logEntry);
        })
    }
}

export interface EventComponent<EventType, ParamType> {
    // componentId: string;
    // constructor(componentId: string) {
    //     this.componentId = componentId;
    // };

    // The unique identidier for the component
    id(): string;
    processEvent(entry: LogEntry<EventType, ParamType>): void;
}