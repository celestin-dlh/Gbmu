import { IO_REGISTERS_START } from "../constants";
import { Cpu } from "../cpu/state";
import { setBitValue } from "../helpers";
import { readMemoryMap } from "../memory";

function getInputClockSpeed(): u16 {
    const tac = readMemoryMap(0xFF07) & 0b11;
    if (tac == 0)
        return 1024;
    else if (tac == 1)
        return 16;
    else if (tac == 2)
        return 64;
    return 256;
}

function timerCounterEnable(): bool {
    return (readMemoryMap(0xFF07) & 0b100) > 0;
}

// DIV
function incrementDiv(): void {
    const div: u8 = Cpu.ioRegisters[0xFF04 - IO_REGISTERS_START] + 1;
    Cpu.ioRegisters[0xFF04 - IO_REGISTERS_START] = div;
}

// TIMA
function incrementTima(): void {
    const tima: u8 = Cpu.ioRegisters[0xFF05 - IO_REGISTERS_START] + 1;
    if (tima == 0) {
        const tma = readMemoryMap(0xFF06);
        Cpu.ioRegisters[0xFF05 - IO_REGISTERS_START] = tma;
        const interruptFlag = setBitValue(readMemoryMap(0xFF0F), 2, 1);
        Cpu.ioRegisters[0xFF0F - IO_REGISTERS_START] = interruptFlag;
    } else
        Cpu.ioRegisters[0xFF05 - IO_REGISTERS_START] = tima;
}

class Timer {
    static currentDivCycle: u16 = 0;
    static currentTimaCycle: u16 = 0;
}

export function syncTimers(cycle: u8): void {
    let newCurrentDivCycle = Timer.currentDivCycle + cycle;

    if (newCurrentDivCycle >= 256) {
        Timer.currentDivCycle = newCurrentDivCycle - 256;
        incrementDiv();
    } 
    else
        Timer.currentDivCycle = newCurrentDivCycle;

    if (timerCounterEnable()) {
        const tacSpeed = getInputClockSpeed();
        let newCurrentTimaCycle = Timer.currentTimaCycle + cycle;

        // trace("timaCycle", 1, timaCycle);
        if (newCurrentTimaCycle >= tacSpeed) {
            Timer.currentTimaCycle = newCurrentTimaCycle - tacSpeed;
            incrementTima();
        } else 
            Timer.currentTimaCycle = newCurrentTimaCycle;
    }
}