import { readByteAtPc, readByte } from './readWriteOperations';
import { Cpu, getHL } from './cpuState';
import { loadToRegister, loadToPairRegister, loadToMemoryAddress } from './instructions';

function fetchOpcode(): u8 {
    return readByteAtPc();
}


function handle0xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("NOP");
            break;
        }
        case 0x1: {
            break;
        }
            
    
        case 0x6: {
            // loadToRegister("B");
            break;
        }
    }
}


function handle4xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("LD B, B");
            loadToRegister("B", Cpu.B);
            break;
        }
        case 0x1: {
            trace("LD B, C");
            loadToRegister("B", Cpu.C);
            break;
        }
        case 0x2: {
            trace("LD B, D");
            loadToRegister("B", Cpu.D);
            break;
        }
        case 0x3: {
            trace("LD B, E");
            loadToRegister("B", Cpu.E);
            break;
        }
        case 0x4: {
            trace("LD B, H");
            loadToRegister("B", Cpu.H);
            break;
        }
        case 0x5: {
            trace("LD B, L");
            loadToRegister("B", Cpu.L);
            break;
        }
        case 0x6: {
            trace("LD B, (HL)");
            const HL = getHL();
            loadToRegister("B", readByte(HL));
            break;
        }
        case 0x7: {
            trace("LD B, A");
            loadToRegister("B", Cpu.A);
            break;
        }
        case 0x8: {
            trace("LD C, B");
            loadToRegister("C", Cpu.B);
            break;
        }
        case 0x9: {
            trace("LD C, C");
            loadToRegister("C", Cpu.C);
            break;
        }
        case 0xA: {
            trace("LD C, D");
            loadToRegister("C", Cpu.D);
            break;
        }
        case 0xB: {
            trace("LD C, E");
            loadToRegister("C", Cpu.E);
            break;
        }
        case 0xC: {
            trace("LD C, H");
            loadToRegister("C", Cpu.H);
            break;
        }
        case 0xD: {
            trace("LD C, L");
            loadToRegister("C", Cpu.L);
            break;
        }
        case 0xE: {
            trace("LD C, (HL)");
            const HL = getHL();
            loadToRegister("C", readByte(HL));
            break;
        }
        case 0xF: {
            trace("LD C, A");
            loadToRegister("C", Cpu.A);
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

// Example: if opcode = 0x15
// firstNibble = 0x1
// secondNibble = 0x5
function executeOpcode(opcode: u8): void {
    const firstNibble: u8 = opcode >> 4;
    const secondNibble: u8 = opcode & 0xF;

    switch (firstNibble) {
        case 0x0: {
            handle0xOpcode(secondNibble);
            break;
        }
        case 0x4: {
            handle4xOpcode(secondNibble);
            break;
        }
 
        default: {
            trace("This opcode isnt implemented yet");
            break;
        }
    }
}

export { fetchOpcode, executeOpcode };