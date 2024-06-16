export interface LogEntry<EventType, ParamType> {
    timestamp: Date;
    uid: string;
    componentId: string;
    event: EventType;
    params: ParamType;
}

export interface Subscriber<EventType, ParamType> {
    processEvent(entry: LogEntry<EventType, ParamType>): void;
}

export interface EventLogger {
    processEvent<EventType, ParamType>(componentId: string, event: EventType, params: ParamType): void;
    registerListener(id: string, listener: Subscriber<any, any>): void;
}