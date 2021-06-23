import { Cpu } from './cpuState';

export function syncCycle(cycleExecuted: i32): void {
    Cpu.cycle += cycleExecuted;
}