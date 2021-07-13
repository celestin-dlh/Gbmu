import { readByte } from "../memory";

export function getTimersRegisters(): u8[] {
    const timersRegistersArray = new Array<u8>(4).fill(0);
    timersRegistersArray[0] = readByte(0xFF04); // DIV
    timersRegistersArray[1] = readByte(0xFF05); // TIMA
    timersRegistersArray[2] = readByte(0xFF06); // TMA
    timersRegistersArray[3] = readByte(0xFF07); // TAC

    return timersRegistersArray;
}