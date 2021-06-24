import { Cpu } from '../cpuState';
import { memoryMap } from '../readWriteOperations';
 
export function getRegisters(): Uint8Array {
    const registersArray = new Uint8Array(8).fill(0);
    registersArray[0] = Cpu.A;
    registersArray[1] = Cpu.B;
    registersArray[2] = Cpu.C;
    registersArray[3] = Cpu.D;
    registersArray[4] = Cpu.E;
    registersArray[5] = Cpu.H;
    registersArray[6] = Cpu.L;
    registersArray[7] = Cpu.F;
    return registersArray;
}


// get length for the instruction
// increment pc by the length of the instruction
// get the `length` byte and put it in array


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

function getMemoryRow(address: u16): u8[] {
    const row = new Array<u8>(0);
    for (let index = 0; index < 16; index++) {
        const addr = address + <u16>index;
        // row.push(Cpu.rom[addr]);
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