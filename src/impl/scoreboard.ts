import { Component, EventLogger, Scoreboard } from "../api";
import { EventLog } from "./eventLog";

export class RinkHockeyScoreboard implements Scoreboard {
    events: EventLogger;
    components: Map<string, Component<any, any>>;

    constructor() {
        this.events = new EventLog();
        this.components = new Map<string, Component<any, any>>();
    }
    getJsonData(): string {
        let result = Object.create({});
        this.components.forEach((value) => {
            result = Object.assign(result, value.getJsonData());
        });
        return JSON.stringify(result);
    }
    getEventLog(): EventLogger {
        return this.events;
    }
    addComponent(component: Component<any, any>): void {
        this.components.set(component.id, component);
    }
    removeComponent(id: string): void {
        this.components.delete(id);
    }
}