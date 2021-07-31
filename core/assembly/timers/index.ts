import { getBitValue, getHighByte, getLowByte } from "../helpers/bitOperations";
import { InterruptType, setInterrupt } from "../interrupts";

export class Timer {
    static DIV: u16 = 0;
    static TIMA: u8 = 0;
    static TMA: u8 = 0;
    static TAC: u8 = 0;
    static lastAnd: bool = false;
    static TIMAHasOverflowed: bool = false;

    static reset(): void {
        Timer.DIV = 0;
        Timer.TIMA = 0;
        Timer.TMA = 0;
        Timer.TAC = 0;
        Timer.lastAnd = false;
        Timer.TIMAHasOverflowed = false;
    }
}

function getDIVBit(): bool {
    const tac = Timer.TAC & 0b11;
    const lowByte = getLowByte(Timer.DIV);
    const highByte = getHighByte(Timer.DIV);

    if (tac == 0b00)
        return getBitValue(highByte, 1);
    else if (tac == 0b01)
        return getBitValue(lowByte, 3);
    else if (tac == 0b10)
        return getBitValue(lowByte, 5);
    return getBitValue(lowByte, 7);
}

function timerCounterEnable(): bool {
    return getBitValue(Timer.TAC, 2);
}

function incrementTIMA(): void {
    Timer.TIMA += 1;
    if (Timer.TIMA == 0)
        Timer.TIMAHasOverflowed = true;
}

export function tickTimers(): void {
    Timer.DIV += 1;

    if (Timer.TIMAHasOverflowed) {
        setInterrupt(InterruptType.Timer);
        Timer.TIMA = Timer.TMA;
        Timer.TIMAHasOverflowed = false;
    }

    const currentAnd = <u8>timerCounterEnable() & <u8>getDIVBit();
    if (Timer.lastAnd && currentAnd == 0) {
        incrementTIMA();
    }
    Timer.lastAnd = <bool>currentAnd;
}

export { getTimersRegisters } from './debug';
export { DIV_ADDRESS, TIMA_ADDRESS, TAC_ADDRESS, TMA_ADDRESS } from './constants'