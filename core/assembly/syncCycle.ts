import { Cpu } from "./cpu";
// import { syncPPU } from "./ppu";
import { syncTimers } from "./timers";

export function syncCycle(cycle: u8): void {
    syncTimers(cycle);
    // syncPPU(cycle);
}