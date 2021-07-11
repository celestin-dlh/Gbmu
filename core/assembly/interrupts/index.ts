import { IO_REGISTERS_START } from '../constants';
import { Cpu } from '../cpu';
import { combineBytes, getBitValue, getHighByte, getLowByte, setBitValue } from '../helpers/bitOperations';
import { Memory, readByte, writeByte } from '../memory';
import { syncCycle } from '../syncCycle';

export enum InterruptType {
    VBlank = 0,
    LCD_STAT,
    Timer,
    Serial,
    Joypad,
}

export class Interrupt {
    static IME: bool = false;

    static setIme(value: bool): void {
        Interrupt.IME = value;
    }

    static reset(): void {
        Interrupt.IME = false;
    }
}

export function setInterrupt(InterruptType: InterruptType): void {
    const interruptFlag = setBitValue(readByte(0xFF0F), <u8>InterruptType, 1);
    Memory.ioRegisters[0xFF0F - IO_REGISTERS_START] = interruptFlag;
}

export function resetInterrupt(InterruptType: InterruptType): void {
    const interruptFlag = setBitValue(readByte(0xFF0F), <u8>InterruptType, 0);
    Memory.ioRegisters[0xFF0F - IO_REGISTERS_START] = interruptFlag;
}

function interruptServiceRoutine(vector: u8): void {
    syncCycle(4);
    syncCycle(4);
    writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
    writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
    Cpu.sp -= 2;
    Cpu.pc = combineBytes(0, vector);
    syncCycle(4);
    Interrupt.setIme(false);
    Cpu.isHalted = false;
}

export function interruptHandling(): void {
    const IE = readByte(0xFFFF);
    const IF = readByte(0xFF0F);

    if (Interrupt.IME) {
        // VBlank
        if (getBitValue(IF, 0) && getBitValue(IE, 0)) {
            interruptServiceRoutine(0x40);
            writeByte(0xFF0F, setBitValue(IF, 0, 0));
        }
        // LCD STAT
        if (getBitValue(IF, 1) && getBitValue(IE, 1)) {
            interruptServiceRoutine(0x48);
            writeByte(0xFF0F, setBitValue(IF, 1, 0));
        }
        // Timer
        if (getBitValue(IF, 2) && getBitValue(IE, 2)) {
            interruptServiceRoutine(0x50);
            writeByte(0xFF0F, setBitValue(IF, 2, 0));
        }
        // Serial
        if (getBitValue(IF, 3) && getBitValue(IE, 3)) {
            interruptServiceRoutine(0x58);
            writeByte(0xFF0F, setBitValue(IF, 3, 0));
        }
        // Joypad
        if (getBitValue(IF, 4) && getBitValue(IE, 4)) {
            interruptServiceRoutine(0x60);
            writeByte(0xFF0F, setBitValue(IF, 4, 0));
        }
    }

    if (IE > 0 && IF > 0)
        Cpu.isHalted = false;
}
  