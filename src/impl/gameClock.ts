import { ClockEvent, ClockEventData, EventLogger, LogEntry } from "../api";
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
        let result: any = {};
        result[GameClock.componentId] = {
            "startTime": this.startTime,
            "timeRemaining": this.timeRemaining
        };
        return result;
    }

    startClock(clock: ClockComponentImpl, entry: LogEntry<ClockEvent, ClockEventData>): void {
        super.startClock(clock, entry);
        console.log('game clock start');
    }

    stopClock(_clock: ClockComponentImpl, _entry: LogEntry<ClockEvent, ClockEventData>): void {
        super.stopClock(_clock, _entry);
        console.log('game clock stop');
    }
}