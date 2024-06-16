import { EventLogger, Subscriber } from "./events";

export interface Component<EventType, ParamType> extends Subscriber<EventType, ParamType> {
    id: string;
    eventLog: EventLogger;
    getJsonData(): any;
}

enum ScoreboardComponent {
    MainClock = 'mainClock',
    ShotClock = 'shotClock',
    HomeScore = 'homeScore',
    AwayScore = 'awayScore',
    // AwayScore = 'awayScore',
}