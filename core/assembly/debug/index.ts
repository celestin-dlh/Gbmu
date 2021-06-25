import { Cpu } from '../cpuState';
import { memoryMap } from '../readWriteOperations';

export function getRegisters(): u16[] {
    const registersArray = new Array<u16>(5).fill(0);
    const af = (<u16>Cpu.A << 8) | Cpu.F;
    const bc = (<u16>Cpu.B << 8) | Cpu.C;
    const de = (<u16>Cpu.D << 8) | Cpu.E;
    const hl = (<u16>Cpu.H << 8) | Cpu.L;

    registersArray[0] = Cpu.pc;
    registersArray[1] = af;
    registersArray[2] = bc;
    registersArray[3] = de;
    registersArray[4] = hl;
    return registersArray;
}

// Disassembler functions
function getInstructionLength(opcode: i32): u16 {
    return 1;
    
}

function getInstructionData(byteToGet: i32, programCounter: u16): Array<u16> {
    const instructionData = new Array<u16>();
    instructionData.push(programCounter);
    for (let index = 0; index < byteToGet; index++) {
        const byte = Cpu.rom[index + programCounter];
        instructionData.push(byte);
    }
    return instructionData;
}

export function getDisassembler(): u16[][]  {
    let programCounter = Cpu.pc;
    const instructionArray = new Array<u16[]>();
    
    for (let instructionCount = 0; instructionCount < 6; instructionCount++) {
        const opcode = Cpu.rom[programCounter];
        const instructionLength = getInstructionLength(opcode);
        const instructionData = getInstructionData(instructionLength, programCounter);
        instructionArray.push(instructionData);
        programCounter += instructionLength;
    }
    return instructionArray;
}

// Memory table functions
function getMemoryRow(address: u16): u8[] {
    const row = new Array<u8>(0);
    for (let index = 0; index < 16; index++) {
        const addr = address + <u16>index;
        row.push(memoryMap(addr));
    }
    return row;
}

export function getMemory(startAddress: u16): u8[][] {
    const memory = new Array<u8[]>(0);
    for (let index = 0; index < 9; index++) {
        const row = getMemoryRow(startAddress + (<u16>index * 16))
        memory.push(row);
    }
    return memory;
}