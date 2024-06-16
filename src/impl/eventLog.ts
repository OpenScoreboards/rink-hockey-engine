import { EventLogger, LogEntry, Subscriber } from "../api";

export class LoggerEntry<EventType, ParamType> implements LogEntry<EventType, ParamType> {
    timestamp: Date;
    uid: string;
    componentId: string;
    event: EventType;
    params: ParamType;

    constructor(componentId: string, event: EventType, params: ParamType) {
        this.timestamp = new Date();
        this.uid = this.createUid();
        this.componentId = componentId;
        this.event = event;
        this.params = params;
    }

    createUid(): string {
        return "uuid-" + ((new Date).getTime().toString(16) + Math.floor(1E7 * Math.random()).toString(16));
    }
}

// export type EventLog = LogEntry<any, any>[];
export class EventLog implements EventLogger {
    entries: LogEntry<any, any>[] = [];
    // listeners: EventComponent<any, any>[] = [];
    listeners: Map<string, Array<Subscriber<any, any>>> = new Map<string, Array<Subscriber<any, any>>>();

    processEvent<EventType, ParamType>(componentId: string, event: EventType, params: ParamType) {
        let logEntry = new LoggerEntry<EventType, ParamType>(componentId, event, params);
        this.entries.push(logEntry);
        this.listeners.get(componentId)?.forEach((listener) => {
            (listener as Subscriber<EventType, ParamType>).processEvent(logEntry);
        })
    }

    registerListener(id: string, listener: Subscriber<any, any>): void {
        console.log(this.listeners)
        if (!this.listeners.has(id)) {
            this.listeners.set(id, []);
        }
        console.log(this.listeners.get(id));
        this.listeners.get(id)?.push(listener);
        console.log(this.listeners.get(id));
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