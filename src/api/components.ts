import { EventLogger, Subscriber } from "./events";

export interface Component<EventType, ParamType> extends Subscriber<EventType, ParamType> {
    id: string;
    eventLog: EventLogger;
    getJsonData(): any;
}