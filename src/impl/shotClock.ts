import { ClockEvent, ClockEventData, EventLogger, LogEntry } from "../api";
import { ClockComponentImpl } from "./clock";
import { GameClock } from "./gameClock";

export class ShotClock extends ClockComponentImpl {
    static componentId: string = "shotClock";
    id: string;
    eventLog: EventLogger;

    constructor(eventLog: EventLogger) {
        super();
        this.id = ShotClock.componentId;
        this.eventLog = eventLog;
    }

    getJsonData(): any {
        let result: any = {};
        result[ShotClock.componentId] = {
            "startTime": this.startTime,
            "timeRemaining": this.timeRemaining
        };
        return result;
    }

    startClock(clock: ClockComponentImpl, entry: LogEntry<ClockEvent, ClockEventData>): void {
        super.startClock(clock, entry);
        console.log('shot clock start');
    }

    stopClock(_clock: ClockComponentImpl, _entry: LogEntry<ClockEvent, ClockEventData>): void {
        super.stopClock(_clock, _entry);
        console.log('shot clock stop');
    }
}
