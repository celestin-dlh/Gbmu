import { Cpu } from "./cpu";
import { tickPpu } from "./ppu";
import { tickTimers } from "./timers";

export function syncCycle(cycle: u8): void {
    for (let index: u8 = 0; index < cycle; index++) {
        tickTimers();
        tickPpu();
    }
}