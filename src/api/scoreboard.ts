import { Component } from "./components";
import { EventLogger } from "./events";

export interface Scoreboard {
    getJsonData(): string;
    getEventLog(): EventLogger;
    addComponent(component: Component<any, any>): void;
    removeComponent(id: string): void;
}
