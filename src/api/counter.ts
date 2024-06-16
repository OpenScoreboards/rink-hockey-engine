export enum CounterEvent {
    Set = 0,
    Increment,
    Decrement,
}
export enum CounterState {
    Default = 0,
}
export type CounterEventData = number | null;
