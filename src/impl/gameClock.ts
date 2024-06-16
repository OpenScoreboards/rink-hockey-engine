import { EventLogger } from "../api";
import { ClockComponentImpl } from "./clock";

export class GameClock extends ClockComponentImpl {
    static componentId: string = "gameClock";
    id: string;

    constructor(eventLog: EventLogger) {
        super(eventLog);
        this.id = GameClock.componentId;
        this.eventLog = eventLog;
    }


    getJsonData(): any {
        return {
            "startTime": this.startTime,
            "timeRemaining": this.timeRemaining
        };
    }
}
