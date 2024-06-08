enum GameClockEvent {
    Init = 0,
    Deinit,
    Start,
    Stop,
    Expired,
}
enum GameClockState {
    Disabled = 0,
    Stopped,
    Running,
}

class GameClock {
    eventLog: EventLog;
    state: GameClockState = GameClockState.Disabled;

    
}