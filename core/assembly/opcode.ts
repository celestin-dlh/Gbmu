import { Cpu } from './cpuState';

function executeOpcode(opcode: i32): i32 {
    const opcodeFirstNibble = (opcode & 0xF0) >> 4;

    switch (opcodeFirstNibble) {
        case 0x0: 
            return handle0xOpcode(opcode);
        default:
            trace("Default opcode switch");
            return 4;
    }
}

function handle0xOpcode(opcode: i32): i32 {
    switch (opcode) {
        case 0x0:
            
            return 4;
        default:
            trace("Default opcode 0x0 switch");
            return 4;
    }
}

export {
    executeOpcode
}