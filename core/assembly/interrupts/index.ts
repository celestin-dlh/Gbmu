import { Cpu, unsetIme } from '../cpu/state';
import { combineBytes, getBitValue, getHighByte, getLowByte, setBitValue } from '../helpers';
import { readMemoryMap, writeByte, writeMemoryMap } from '../memory';
import { syncCycle } from '../syncCycle';

function interruptServiceRoutine(vector: u8): void {
    // wait 2 machine cycles
    syncCycle(4);
    syncCycle(4);
    writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
    writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
    Cpu.sp -= 2;
    Cpu.pc = combineBytes(0, vector);
    syncCycle(4);
    unsetIme();
    Cpu.isHalted = false;
}

export function interruptHandling(): void {
    const IE = readMemoryMap(0xFFFF);
    const IF = readMemoryMap(0xFF0F);

    if (Cpu.IME) {
        // VBlank
        if (getBitValue(IF, 0) && getBitValue(IE, 0)) {
            interruptServiceRoutine(0x40);
            writeMemoryMap(0xFF0F, setBitValue(IF, 0, 0));
        }
        // LCD STAT
        if (getBitValue(IF, 1) && getBitValue(IE, 1)) {
            interruptServiceRoutine(0x48);
            writeMemoryMap(0xFF0F, setBitValue(IF, 1, 0));
        }
        // Timer
        if (getBitValue(IF, 2) && getBitValue(IE, 2)) {
            interruptServiceRoutine(0x50);
            writeMemoryMap(0xFF0F, setBitValue(IF, 2, 0));
        }
        // Serial
        if (getBitValue(IF, 3) && getBitValue(IE, 3)) {
            interruptServiceRoutine(0x58);
            writeMemoryMap(0xFF0F, setBitValue(IF, 3, 0));
        }
        // Joypad
        if (getBitValue(IF, 4) && getBitValue(IE, 4)) {
            interruptServiceRoutine(0x60);
            writeMemoryMap(0xFF0F, setBitValue(IF, 4, 0));
        }
    }

    if (IE > 0 && IF > 0)
        Cpu.isHalted = false;
}
  