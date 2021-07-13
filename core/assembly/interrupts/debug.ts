import { readByte } from "../memory";
import { Interrupt } from ".";

export function getInterruptsRegisters(): u8[] {
    const interruptsRegistersArray = new Array<u8>(3).fill(0);
    interruptsRegistersArray[0] = <u8>Interrupt.IME; // IME
    interruptsRegistersArray[1] = readByte(0xFFFF); // IE
    interruptsRegistersArray[2] = readByte(0xFF0F); // IF

    return interruptsRegistersArray;
}