import { Cpu } from ".";
import { readByte } from "../memory";

export function getCpuRegisters(): u16[] {
    const registersArray = new Array<u16>(7).fill(0);
    registersArray[0] = Cpu.pc;
    registersArray[1] = Cpu.getBC();
    registersArray[2] = Cpu.getDE();
    registersArray[3] = Cpu.getHL();
    registersArray[4] = Cpu.sp;
    registersArray[5] = Cpu.A;
    registersArray[6] = Cpu.F;
    return registersArray;
}

function getInstructionLength(opcode: i32): u16 {
    switch (opcode) {
        case 0x0: return 1;
        case 0x1: return 3;
        case 0x2: return 1;
        case 0x3: return 1;
        case 0x4: return 1;
        case 0x5: return 1;
        case 0x6: return 2;
        case 0x7: return 1;
        case 0x8: return 3;
        case 0x9: return 1;
        case 0xA: return 1;
        case 0xB: return 1;
        case 0xC: return 1;
        case 0xD: return 1;
        case 0xE: return 2;
        case 0xF: return 1;

        case 0x10: return 2;
        case 0x11: return 3;
        case 0x12: return 1;
        case 0x13: return 1;
        case 0x14: return 1;
        case 0x15: return 1;
        case 0x16: return 2;
        case 0x17: return 1;
        case 0x18: return 2;
        case 0x19: return 1;
        case 0x1A: return 1;
        case 0x1B: return 1;
        case 0x1C: return 1;
        case 0x1D: return 1;
        case 0x1E: return 2;
        case 0x1F: return 1;

        case 0x20: return 2;
        case 0x21: return 3;
        case 0x22: return 1;
        case 0x23: return 1;
        case 0x24: return 1;
        case 0x25: return 1;
        case 0x26: return 2;
        case 0x27: return 1;
        case 0x28: return 2;
        case 0x29: return 1;
        case 0x2A: return 1;
        case 0x2B: return 1;
        case 0x2C: return 1;
        case 0x2D: return 1;
        case 0x2E: return 2;
        case 0x2F: return 1;

        case 0x30: return 2;
        case 0x31: return 3;
        case 0x32: return 1;
        case 0x33: return 1;
        case 0x34: return 1;
        case 0x35: return 1;
        case 0x36: return 2;
        case 0x37: return 1;
        case 0x38: return 2;
        case 0x39: return 1;
        case 0x3A: return 1;
        case 0x3B: return 1;
        case 0x3C: return 1;
        case 0x3D: return 1;
        case 0x3E: return 2;
        case 0x3F: return 1;

        case 0x40: return 1;
        case 0x41: return 1;
        case 0x42: return 1;
        case 0x43: return 1;
        case 0x44: return 1;
        case 0x45: return 1;
        case 0x46: return 1;
        case 0x47: return 1;
        case 0x48: return 1;
        case 0x49: return 1;
        case 0x4A: return 1;
        case 0x4B: return 1;
        case 0x4C: return 1;
        case 0x4D: return 1;
        case 0x4E: return 1;
        case 0x4F: return 1;

        case 0x50: return 1;
        case 0x51: return 1;
        case 0x52: return 1;
        case 0x53: return 1;
        case 0x54: return 1;
        case 0x55: return 1;
        case 0x56: return 1;
        case 0x57: return 1;
        case 0x58: return 1;
        case 0x59: return 1;
        case 0x5A: return 1;
        case 0x5B: return 1;
        case 0x5C: return 1;
        case 0x5D: return 1;
        case 0x5E: return 1;
        case 0x5F: return 1;

        case 0x60: return 1;
        case 0x61: return 1;
        case 0x62: return 1;
        case 0x63: return 1;
        case 0x64: return 1;
        case 0x65: return 1;
        case 0x66: return 1;
        case 0x67: return 1;
        case 0x68: return 1;
        case 0x69: return 1;
        case 0x6A: return 1;
        case 0x6B: return 1;
        case 0x6C: return 1;
        case 0x6D: return 1;
        case 0x6E: return 1;
        case 0x6F: return 1;

        case 0x70: return 1;
        case 0x71: return 1;
        case 0x72: return 1;
        case 0x73: return 1;
        case 0x74: return 1;
        case 0x75: return 1;
        case 0x76: return 1;
        case 0x77: return 1;
        case 0x78: return 1;
        case 0x79: return 1;
        case 0x7A: return 1;
        case 0x7B: return 1;
        case 0x7C: return 1;
        case 0x7D: return 1;
        case 0x7E: return 1;
        case 0x7F: return 1;

        case 0x80: return 1;
        case 0x81: return 1;
        case 0x82: return 1;
        case 0x83: return 1;
        case 0x84: return 1;
        case 0x85: return 1;
        case 0x86: return 1;
        case 0x87: return 1;
        case 0x88: return 1;
        case 0x89: return 1;
        case 0x8A: return 1;
        case 0x8B: return 1;
        case 0x8C: return 1;
        case 0x8D: return 1;
        case 0x8E: return 1;
        case 0x8F: return 1;

        case 0x90: return 1;
        case 0x91: return 1;
        case 0x92: return 1;
        case 0x93: return 1;
        case 0x94: return 1;
        case 0x95: return 1;
        case 0x96: return 1;
        case 0x97: return 1;
        case 0x98: return 1;
        case 0x99: return 1;
        case 0x9A: return 1;
        case 0x9B: return 1;
        case 0x9C: return 1;
        case 0x9D: return 1;
        case 0x9E: return 1;
        case 0x9F: return 1;

        case 0xA0: return 1;
        case 0xA1: return 1;
        case 0xA2: return 1;
        case 0xA3: return 1;
        case 0xA4: return 1;
        case 0xA5: return 1;
        case 0xA6: return 1;
        case 0xA7: return 1;
        case 0xA8: return 1;
        case 0xA9: return 1;
        case 0xAA: return 1;
        case 0xAB: return 1;
        case 0xAC: return 1;
        case 0xAD: return 1;
        case 0xAE: return 1;
        case 0xAF: return 1;

        case 0xB0: return 1;
        case 0xB1: return 1;
        case 0xB2: return 1;
        case 0xB3: return 1;
        case 0xB4: return 1;
        case 0xB5: return 1;
        case 0xB6: return 1;
        case 0xB7: return 1;
        case 0xB8: return 1;
        case 0xB9: return 1;
        case 0xBA: return 1;
        case 0xBB: return 1;
        case 0xBC: return 1;
        case 0xBD: return 1;
        case 0xBE: return 1;
        case 0xBF: return 1;

        case 0xC0: return 1;
        case 0xC1: return 1;
        case 0xC2: return 3;
        case 0xC3: return 3;
        case 0xC4: return 3;
        case 0xC5: return 1;
        case 0xC6: return 2;
        case 0xC7: return 1;
        case 0xC8: return 1;
        case 0xC9: return 1;
        case 0xCA: return 3;
        // cb ??
        case 0xCB: return 2;
        // cb ??
        case 0xCC: return 3;
        case 0xCD: return 3;
        case 0xCE: return 2;
        case 0xCF: return 1;

        case 0xD0: return 1;
        case 0xD1: return 1;
        case 0xD2: return 3;
        case 0xD4: return 3;
        case 0xD5: return 1;
        case 0xD6: return 2;
        case 0xD7: return 1;
        case 0xD8: return 1;
        case 0xD9: return 1;
        case 0xDA: return 3;
        case 0xDC: return 3;
        case 0xDE: return 2;
        case 0xDF: return 1;

        case 0xE0: return 2;
        case 0xE1: return 1;
        case 0xE2: return 1;
        case 0xE5: return 1;
        case 0xE6: return 2;
        case 0xE7: return 1;
        case 0xE8: return 2;
        case 0xE9: return 1;
        case 0xEA: return 3;
        case 0xEE: return 2;
        case 0xEF: return 1;

        case 0xF0: return 2;
        case 0xF1: return 1;
        case 0xF2: return 1;
        case 0xF3: return 1;
        case 0xF5: return 1;
        case 0xF6: return 2;
        case 0xF7: return 1;
        case 0xF8: return 2;
        case 0xF9: return 1;
        case 0xFA: return 3;
        case 0xFB: return 1;
        case 0xFE: return 2;
        case 0xFF: return 1;

        default: {
            trace("Error: This instruction does not exist");
            return 1;
        }
    }
}

function getInstructionData(byteToGet: i32, programCounter: u16): Array<u16> {
    const instructionData = new Array<u16>();
    instructionData.push(programCounter);
    for (let index = 0; index < byteToGet; index++) {
        const byte = readByte(<u16>index + programCounter);
        instructionData.push(byte);
    }
    return instructionData;
}

export function getDisassembler(): u16[][]  {
    let programCounter = Cpu.pc;
    const instructionArray = new Array<u16[]>();
    
    for (let instructionCount = 0; instructionCount < 7; instructionCount++) {
        const opcode = readByte(programCounter);
        const instructionLength = getInstructionLength(opcode);
        const instructionData = getInstructionData(instructionLength, programCounter);
        instructionArray.push(instructionData);
        programCounter += instructionLength;
    }
    return instructionArray;
}