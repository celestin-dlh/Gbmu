import { Cpu } from './cpuState';
import { readByteAtPc } from './readWriteOperations';

function executeOpcode(opcode: i32): void {
    const opcodeFirstNibble = (opcode & 0xF0) >> 4;

    switch (opcodeFirstNibble) {
        case 0x0: 
            handle0xOpcode(opcode);
            break;
        default:
            trace("Default opcode switch");
            break;
    }
}


function nopInstruction(): void {
    trace("NOP");
}

function incrementRegister(registerName: string): void {
    if (registerName == "B") {
        trace("Increment B");
        Cpu.B += 1;
    }
}

function load8BitToRegister(registerName: string): void {
    if (registerName == "B") {
        trace("Load byte to B")
        const n = readByteAtPc();
        Cpu.B = n;
    }
}

function handle0xOpcode(opcode: i32): void {
    switch (opcode) {
        case 0x0:
            nopInstruction();
            break;
        case 0x4: 
            incrementRegister("B");
            break;
        case 0x6: 
            load8BitToRegister("B");
            break;
        default:
            trace("Default opcode 0x0 switch");
            break;
    }
}

export {
    executeOpcode
}