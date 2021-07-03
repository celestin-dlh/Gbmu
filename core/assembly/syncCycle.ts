import { Cpu } from "./cpu/state";
import { syncTimers } from "./timers";

export function syncCycle(cycle: u8): void {
    syncTimers(cycle);
}