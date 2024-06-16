export enum ClockEvent {
    Set = 0,
    Start,
    Stop,
    Expired,
}
export enum ClockState {
    Stopped = 0,
    Running,
}
export type ClockEventData = number | null;
