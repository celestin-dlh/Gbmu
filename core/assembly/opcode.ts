import { readByteAtPc, readWordAtPc, readByte, writeByte } from './readWriteOperations';
import { Cpu, getBC, setBC, getDE, setDE, getHL, setHL, setZeroFlag, setHalfCarryFlag, setNegativeFlag, getZeroFlag, getCarryFlag, setCarryFlag } from './cpuState';
import { loadToRegister, loadToPairRegister, loadToMemoryAddress } from './instructions';
import { getLowNibble, getHighByte, getLowByte, combineBytes } from './helpers';


function handleCBOpcode(opcode: u8): void {
    trace("TO DO CALLBACK OPCODE !!!");
}

function handle0xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("NOP");
            break;
        }
        case 0x1: {
            trace("LD BC, nn");
            Cpu.C = readByteAtPc();
            Cpu.B = readByteAtPc();
            break;
        }
        case 0x2: {
            trace("LD (BC), A");
            const bcAddress = getBC();
            writeByte(bcAddress, Cpu.A);
        }
        case 0x3: {
            trace("INC BC");
            const value = ((getBC() + 1) & 0xFFFF); 
            setBC(value);
            // syncCycle(4)
        }
        case 0x4: {
            trace("INC B");
            const value = ((Cpu.B + 1) & 0xFF); 
            const halfCarry = ((getLowNibble(Cpu.B) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.B = value;
        }
        case 0x5: {
            trace("DEC B");
            const value = ((Cpu.B - 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.B) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.B = value;
        }
        case 0x6: {
            trace("LD B, n");
            Cpu.B = readByteAtPc();
        }
        case 0x8: {
            trace("RLCA");
            const leftMostBit = Cpu.A & 0x80;
            Cpu.A = (Cpu.A << 1) & 0xFE;
            setCarryFlag(leftMostBit > 0 ? 1 : 0);
            setZeroFlag(0);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
        }
        case 0x8: {
            trace("LD (nn), SP");
            const lowN = readByteAtPc();
            writeByte(lowN, getLowByte(Cpu.sp));
            const highN = readByteAtPc();
            writeByte(highN, getHighByte(Cpu.sp));
        }
        case 0x9: {
            trace("ADD HL, BC");
            const hl = getHL();
            const bc = getBC();
            const result = hl + bc;
            const halfCarry = ((getLowNibble(Cpu.L) + getLowByte(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
        }
        case 0xA: {
            trace("LD A, (BC)");
            const bcAddress = getBC();
            Cpu.A = readByte(bcAddress);
        }
        case 0xB: {
            trace("DEC BC");
            const bc = getBC();
            const bcDec = ((bc - 1) & 0xFFFF);
            setBC(bcDec);
            // syncCycle(4)
        }
        case 0xC: {
            trace("INC C");
            const value = ((Cpu.C + 1) & 0xFF); 
            const halfCarry = ((getLowNibble(Cpu.C) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.C = value;
        }
        case 0xD: {
            trace("DEC C");
            const value = ((Cpu.C - 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.C) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.C = value;
        }
        case 0xE: {
            trace("LD C, n");
            Cpu.C = readByteAtPc();
        }
        case 0xF: {
            trace("RRCA");
            const rightMostBit = Cpu.A & 1;
            let value = Cpu.A >> 1;
            if (rightMostBit == 1) {
                value = value & 0x80;
                setCarryFlag(1);
                
            } else {
                value = value | 0x80;
                setCarryFlag(0);
            }
            setZeroFlag(0);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handle1xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("STOP");
            // WEIRD_INSTRUCTION ONLY USE IN GBC
            Cpu.pc += 1;
            break;
        }
        case 0x1: {
            trace("LD DE, nn");
            Cpu.E = readByteAtPc();
            Cpu.D = readByteAtPc();
            break;
        }
        case 0x2: {
            trace("LD (DE), A");
            const deAddress = getDE();
            writeByte(deAddress, Cpu.A);
        }
        case 0x3: {
            trace("INC DE");
            const value = ((getDE() + 1) & 0xFFFF); 
            setDE(value);
            // syncCycle(4)
        }
        case 0x4: {
            trace("INC D");
            const value = ((Cpu.D + 1) & 0xFF); 
            const halfCarry = ((getLowNibble(Cpu.D) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.D = value;
        }
        case 0x5: {
            trace("DEC D");
            const value = ((Cpu.D - 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.D) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.D = value;
        }
        case 0x6: {
            trace("LD D, n");
            Cpu.D = readByteAtPc();
        }
        case 0x7: {
            trace("RLA");
            // OPCODE_TBD
        }
        case 0x8: {
            trace("JR e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            // syncCycle(4)
            Cpu.pc += relativeOffset;
        }
        case 0x9: {
            trace("ADD HL, DE");
            const hl = getHL();
            const de = getDE();
            const result = hl + de;
            const halfCarry = ((getLowNibble(Cpu.L) + getLowByte(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
        }
        case 0xA: {
            trace("LD A, (DE)");
            const deAddress = getDE();
            Cpu.A = readByte(deAddress);
        }
        case 0xB: {
            trace("DEC DE");
            const value = ((getDE() - 1) & 0xFFFF); 
            setDE(value);
            // syncCycle(4)
        }
        case 0xC: {
            trace("INC E");
            const value = ((Cpu.E + 1) & 0xFF); 
            const halfCarry = ((getLowNibble(Cpu.E) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.E = value;
        }
        case 0xD: {
            trace("DEC E");
            const value = ((Cpu.E - 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.E) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.E = value;
        }
        case 0xE: {
            trace("LD E, n");
            Cpu.E = readByteAtPc();
        }
        case 0xF: {
            trace("RRA");
            // OPCODE_TBD
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handle2xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("JR NZ, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const zeroFlag = getZeroFlag();
            if (zeroFlag == 0) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
            }
            break;
        }
        case 0x1: {
            trace("LD HL, nn");
            Cpu.L = readByteAtPc();
            Cpu.H = readByteAtPc();
            break;
        }
        case 0x2: {
            trace("LD (HL+), A");
            const hl = getHL();
            writeByte(hl, Cpu.A);
            const hlInc = ((hl + 1) & 0xFFFF);
            setBC(hlInc);
        }
        case 0x3: {
            trace("INC HL");
            const value = ((getHL() + 1) & 0xFFFF); 
            setHL(value);
            // syncCycle(4)
        }
        case 0x4: {
            trace("INC H");
            const value = ((Cpu.H + 1) & 0xFF); 
            const halfCarry = ((getLowNibble(Cpu.H) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.H = value;
        }
        case 0x5: {
            trace("DEC H");
            const value = ((Cpu.H - 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.H) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.H = value;
        }
        case 0x6: {
            trace("LD H, n");
            Cpu.H = readByteAtPc();
        }
        case 0x7: {
            trace("DAA");
            // OPCODE_TBD
        }
        case 0x8: {
            trace("JR Z, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const zeroFlag = getZeroFlag();
            if (zeroFlag == 1) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
            }
        }
        case 0x9: {
            trace("ADD HL, HL");
            const hl = getHL();
            const result = hl + hl;
            const halfCarry = ((getLowNibble(Cpu.L) + getLowByte(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
        }
        case 0xA: {
            trace("LD A, (HL+)");
            const hl = getHL();
            Cpu.A = readByte(hl);
            const hlInc = ((hl + 1) & 0xFFFF);
            setHL(hlInc);
        }
        case 0xB: {
            trace("DEC HL");
            const value = ((getHL() - 1) & 0xFFFF); 
            setHL(value);
            // syncCycle(4)
        }
        case 0xC: {
            trace("INC L");
            const value = ((Cpu.L + 1) & 0xFF); 
            const halfCarry = ((getLowNibble(Cpu.L) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.L = value;
        }
        case 0xD: {
            trace("DEC L");
            const value = ((Cpu.L - 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.L) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.L = value;
        }
        case 0xE: {
            trace("LD L, n");
            Cpu.L = readByteAtPc();
        }
        case 0xF: {
            trace("CPL");
            Cpu.A = Cpu.A ^ 0xFF;
            setHalfCarryFlag(1);
            setNegativeFlag(1);
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }    
}

function handle3xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("JR NC, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const carryFlag = getCarryFlag();
            if (carryFlag == 0) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
            }
            break;
        }
        case 0x1: {
            trace("LD SP, nn");
            Cpu.sp = readWordAtPc();
            break;
        }
        case 0x2: {
            trace("LD (HL-), A");
            const hl = getHL();
            writeByte(hl, Cpu.A);
            const hlDec = ((hl - 1) & 0xFFFF);
            setHL(hlDec);
        }
        case 0x3: {
            trace("INC SP");
            const spInc = ((Cpu.sp + 1) & 0xFFFF);
            Cpu.sp = spInc;
            // syncCycle(4)
        }
        case 0x4: {
            trace("INC (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const valueInc = ((value + 1) & 0xFF);
            const halfCarry = ((getLowNibble(value) + 1) & 0x10) > 0 ? 1 : 0;
            setNegativeFlag(0);
            setZeroFlag(valueInc > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            writeByte(hl, valueInc);
        }
        case 0x5: {
            trace("DEC (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const valueDec = ((value - 1) & 0xFF);
            const halfCarry = ((getLowNibble(value) - 1) & 0x10) > 0 ? 1 : 0;
            setNegativeFlag(1);
            setZeroFlag(valueDec > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            writeByte(hl, valueDec);
        }
        case 0x6: {
            trace("LD (HL), n");
            const n = readByteAtPc();
            const hlAddress = getHL();
            writeByte(hlAddress, n);
        }
        case 0x7: {
            trace("SCF");
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(1);
        }
        case 0x8: {
            trace("JR C, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const carryFlag = getCarryFlag();
            if (carryFlag) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
            }
        }
        case 0x9: {
            trace("ADD HL, SP");
            const hl = getHL();
            const result = hl + Cpu.sp;
            const halfCarry = ((getLowNibble(Cpu.L) + getLowByte(Cpu.sp)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
        }
        case 0xA: {
            trace("LD A, (HL-)");
            const hl = getHL();
            Cpu.A = readByte(hl);
            const hlDec = ((hl - 1) & 0xFFFF);
            setHL(hlDec);
        }
        case 0xB: {
            trace("DEC SP");
            const spDec = ((Cpu.sp - 1) & 0xFFFF);
            Cpu.sp = spDec;
            // syncCycle(4)
        }
        case 0xC: {
            trace("INC A");
            const value = ((Cpu.A + 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.A) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.A = value;
        }
        case 0xD: {
            trace("DEC A");
            const value = ((Cpu.A - 1) & 0xFF);
            const halfCarry = ((getLowNibble(Cpu.A) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.A = value;
        }
        case 0xE: {
            trace("LD A, n");
            Cpu.A = readByteAtPc();
        }
        case 0xF: {
            trace("CCF");
            // OPCODE_TBD
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }    
}

function handle4xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("LD B, B");
            Cpu.B = Cpu.B;
            break;
        }
        case 0x1: {
            trace("LD B, C");
            Cpu.B = Cpu.C;
            break;
        }
        case 0x2: {
            trace("LD B, D");
            Cpu.B = Cpu.D;
            break;
        }
        case 0x3: {
            trace("LD B, E");
            Cpu.B = Cpu.E;
            break;
        }
        case 0x4: {
            trace("LD B, H");
            Cpu.B = Cpu.H;
            break;
        }
        case 0x5: {
            trace("LD B, L");
            Cpu.B = Cpu.L;
            break;
        }
        case 0x6: {
            trace("LD B, (HL)");
            const hl = getHL();
            Cpu.B = readByte(hl);
            break;
        }
        case 0x7: {
            trace("LD B, A");
            Cpu.B = Cpu.A;
            break;
        }
        case 0x8: {
            trace("LD C, B");
            Cpu.C = Cpu.B;
            break;
        }
        case 0x9: {
            trace("LD C, C");
            Cpu.C = Cpu.C;
            break;
        }
        case 0xA: {
            trace("LD C, D");
            Cpu.C = Cpu.D;
            break;
        }
        case 0xB: {
            trace("LD C, E");
            Cpu.C = Cpu.E;
            break;
        }
        case 0xC: {
            trace("LD C, H");
            Cpu.C = Cpu.H;
            break;
        }
        case 0xD: {
            trace("LD C, L");
            Cpu.C = Cpu.L;
            break;
        }
        case 0xE: {
            trace("LD C, (HL)");
            const hl = getHL();
            Cpu.C = readByte(hl);
            break;
        }
        case 0xF: {
            trace("LD C, A");
            Cpu.C = Cpu.A;
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handle5xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("LD D, B");
            Cpu.D = Cpu.B;
            break;
        }
        case 0x1: {
            trace("LD D, C");
            Cpu.D = Cpu.C;
            break;
        }
        case 0x2: {
            trace("LD D, D");
            Cpu.D = Cpu.D;
            break;
        }
        case 0x3: {
            trace("LD D, E");
            Cpu.D = Cpu.E;
            break;
        }
        case 0x4: {
            trace("LD D, H");
            Cpu.D = Cpu.H;
            break;
        }
        case 0x5: {
            trace("LD D, L");
            Cpu.D = Cpu.L;
            break;
        }
        case 0x6: {
            trace("LD D, (HL)");
            const hl = getHL();
            Cpu.D = readByte(hl);
            break;
        }
        case 0x7: {
            trace("LD D, A");
            Cpu.D = Cpu.A;
            break;
        }
        case 0x8: {
            trace("LD E, B");
            Cpu.E = Cpu.B;
            break;
        }
        case 0x9: {
            trace("LD E, C");
            Cpu.E = Cpu.C;
            break;
        }
        case 0xA: {
            trace("LD E, D");
            Cpu.E = Cpu.D;
            break;
        }
        case 0xB: {
            trace("LD E, E");
            Cpu.E = Cpu.E;
            break;
        }
        case 0xC: {
            trace("LD E, H");
            Cpu.E = Cpu.H;
            break;
        }
        case 0xD: {
            trace("LD E, L");
            Cpu.E = Cpu.L;
            break;
        }
        case 0xE: {
            trace("LD E, (HL)");
            const hl = getHL();
            Cpu.E = readByte(hl);
            break;
        }
        case 0xF: {
            trace("LD E, A");
            Cpu.E = Cpu.A;
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handle6xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("LD H, B");
            Cpu.H = Cpu.B;
            break;
        }
        case 0x1: {
            trace("LD H, C");
            Cpu.H = Cpu.C;
            break;
        }
        case 0x2: {
            trace("LD H, D");
            Cpu.H = Cpu.D;
            break;
        }
        case 0x3: {
            trace("LD H, E");
            Cpu.H = Cpu.E;
            break;
        }
        case 0x4: {
            trace("LD H, H");
            Cpu.H = Cpu.H;
            break;
        }
        case 0x5: {
            trace("LD H, L");
            Cpu.H = Cpu.L;
            break;
        }
        case 0x6: {
            trace("LD H, (HL)");
            const hl = getHL();
            Cpu.H = readByte(hl);
            break;
        }
        case 0x7: {
            trace("LD H, A");
            Cpu.H = Cpu.A;
            break;
        }
        case 0x8: {
            trace("LD L, B");
            Cpu.L = Cpu.B;
            break;
        }
        case 0x9: {
            trace("LD L, C");
            Cpu.L = Cpu.C;
            break;
        }
        case 0xA: {
            trace("LD L, D");
            Cpu.L = Cpu.D;
            break;
        }
        case 0xB: {
            trace("LD L, E");
            Cpu.L = Cpu.E;
            break;
        }
        case 0xC: {
            trace("LD L, H");
            Cpu.L = Cpu.H;
            break;
        }
        case 0xD: {
            trace("LD L, L");
            Cpu.L = Cpu.L;
            break;
        }
        case 0xE: {
            trace("LD L, (HL)");
            const hl = getHL();
            Cpu.L = readByte(hl);
            break;
        }
        case 0xF: {
            trace("LD L, A");
            Cpu.L = Cpu.A;
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handle7xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("LD (HL), B");
            const hl = getHL();
            writeByte(hl, Cpu.B);
            break;
        }
        case 0x1: {
            trace("LD (HL), C");
            const hl = getHL();
            writeByte(hl, Cpu.C);
            break;
        }
        case 0x2: {
            trace("LD (HL), D");
            const hl = getHL();
            writeByte(hl, Cpu.D);
            break;
        }
        case 0x3: {
            trace("LD (HL), E");
            const hl = getHL();
            writeByte(hl, Cpu.E);
            break;
        }
        case 0x4: {
            trace("LD (HL), H");
            const hl = getHL();
            writeByte(hl, Cpu.H);
            break;
        }
        case 0x5: {
            trace("LD (HL), L");
            const hl = getHL();
            writeByte(hl, Cpu.L);
            break;
        }
        case 0x6: {

            // TBD
            trace("HALT");
            // TBD

            break;
        }
        case 0x7: {
            trace("LD (HL), A");
            const hl = getHL();
            writeByte(hl, Cpu.A);
            break;
        }
        case 0x8: {
            trace("LD A, B");
            Cpu.A = Cpu.B;
            break;
        }
        case 0x9: {
            trace("LD A, C");
            Cpu.A = Cpu.C;
            break;
        }
        case 0xA: {
            trace("LD A, D");
            Cpu.A = Cpu.D;
            break;
        }
        case 0xB: {
            trace("LD A, E");
            Cpu.A = Cpu.E;
            break;
        }
        case 0xC: {
            trace("LD A, H");
            Cpu.A = Cpu.H;
            break;
        }
        case 0xD: {
            trace("LD A, L");
            Cpu.A = Cpu.L;
            break;
        }
        case 0xE: {
            trace("LD A, (HL)");
            const hl = getHL();
            Cpu.A = readByte(hl);
            break;
        }
        case 0xF: {
            trace("LD A, A");
            Cpu.A = Cpu.A;
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handle8xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("ADD A, B");
            const result = Cpu.A + Cpu.B;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.B)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x1: {
            trace("ADD A, C");
            const result = Cpu.A + Cpu.C;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x2: {
            trace("ADD A, D");
            const result = Cpu.A + Cpu.D;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.D)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x3: {
            trace("ADD A, E");
            const result = Cpu.A + Cpu.E;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x4: {
            trace("ADD A, H");
            const result = Cpu.A + Cpu.H;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.H)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x5: {
            trace("ADD A, L");
            const result = Cpu.A + Cpu.L;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x6: {
            trace("ADD A, (HL)");
            const hl = getHL();
            const hlValue = readByte(hl);
            const result = Cpu.A + hlValue;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(hlValue)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x7: {
            trace("ADD A, A");
            const result = Cpu.A + Cpu.A;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.A)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x8: {
            trace("ADC A, B");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.B + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.B) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x9: {
            trace("ADC A, C");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.C + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.C) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xA: {
            trace("ADC A, D");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.D + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.D) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xB: {
            trace("ADC A, E");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.E + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.E) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xC: {
            trace("ADC A, H");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.H + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.H) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xD: {
            trace("ADC A, L");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.L + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.L) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xE: {
            trace("ADC A, (HL)");
            const carry = <u8>getCarryFlag();
            const hl = getHL();
            const value = readByte(hl);
            const result = Cpu.A + value + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(value) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xF: {
            trace("ADC A, A");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.A + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.A) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handle9xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("SUB A, B");
            const result = Cpu.A - Cpu.B;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.B)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x1: {
            trace("SUB A, C");
            const result = Cpu.A - Cpu.C;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x2: {
            trace("SUB A, D");
            const result = Cpu.A - Cpu.D;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.D)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x3: {
            trace("SUB A, E");
            const result = Cpu.A - Cpu.E;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x4: {
            trace("SUB A, H");
            const result = Cpu.A - Cpu.H;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.H)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x5: {
            trace("SUB A, L");
            const result = Cpu.A - Cpu.L;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x6: {
            trace("SUB A, (HL)");
            const hl = getHL();
            const hlValue = readByte(hl);
            const result = Cpu.A - hlValue;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(hlValue)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x7: {
            trace("SUB A, A");
            const result = Cpu.A - Cpu.A;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.A)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x8: {
            trace("SBC A, B");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.B - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.B) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x9: {
            trace("SBC A, C");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.C - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.C) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xA: {
            trace("SBC A, D");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.D - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.D) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xB: {
            trace("SBC A, E");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.E - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.E) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xC: {
            trace("SBC A, H");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.H - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.H) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xD: {
            trace("SBC A, L");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.L - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.L) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xE: {
            trace("SBC A, (HL)");
            const carry = <u8>getCarryFlag();
            const hl = getHL();
            const value = readByte(hl);
            const result = Cpu.A - value - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(value) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xF: {
            trace("SBC A, A");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.A - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.A) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handleAxOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("AND A, B");
            const result = Cpu.A & Cpu.B;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x1: {
            trace("AND A, C");
            const result = Cpu.A & Cpu.C;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x2: {
            trace("AND A, D");
            const result = Cpu.A & Cpu.D;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x3: {
            trace("AND A, E");
            const result = Cpu.A & Cpu.E;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x4: {
            trace("AND A, H");
            const result = Cpu.A & Cpu.H;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x5: {
            trace("AND A, L");
            const result = Cpu.A & Cpu.L;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x6: {
            trace("AND A, (HL)");
            const hl = getHL();
            const hlValue = readByte(hl);
            const result = Cpu.A & hlValue;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x7: {
            trace("AND A, A");
            const result = Cpu.A & Cpu.A;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x8: {
            trace("XOR A, B");
            const result = Cpu.A ^ Cpu.B;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x9: {
            trace("XOR A, C");
            const result = Cpu.A ^ Cpu.C;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0xA: {
            trace("XOR A, D");
            const result = Cpu.A ^ Cpu.D;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0xB: {
            trace("XOR A, E");
            const result = Cpu.A ^ Cpu.E;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0xC: {
            trace("XOR A, H");
            const result = Cpu.A ^ Cpu.H;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0xD: {
            trace("XOR A, L");
            const result = Cpu.A ^ Cpu.L;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0xE: {
            trace("XOR A, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const result = Cpu.A ^ value;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0xF: {
            trace("XOR A, A");
            const result = Cpu.A ^ Cpu.A;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handleBxOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("OR A, B");
            const result = Cpu.A | Cpu.B;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x1: {
            trace("OR A, C");
            const result = Cpu.A | Cpu.C;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x2: {
            trace("OR A, D");
            const result = Cpu.A | Cpu.D;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x3: {
            trace("OR A, E");
            const result = Cpu.A | Cpu.E;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x4: {
            trace("OR A, H");
            const result = Cpu.A | Cpu.H;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x5: {
            trace("OR A, L");
            const result = Cpu.A | Cpu.L;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x6: {
            trace("OR A, (HL)");
            const hl = getHL();
            const hlValue = readByte(hl);
            const result = Cpu.A | hlValue;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x7: {
            trace("OR A, A");
            const result = Cpu.A | Cpu.A;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            break;
        }
        case 0x8: {
            trace("CP A, B");
            const result = Cpu.A - Cpu.B;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.B)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        case 0x9: {
            trace("CP A, C");
            const result = Cpu.A - Cpu.C;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        case 0xA: {
            trace("CP A, D");
            const result = Cpu.A - Cpu.D;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.D)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        case 0xB: {
            trace("CP A, E");
            const result = Cpu.A - Cpu.E;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        case 0xC: {
            trace("CP A, H");
            const result = Cpu.A - Cpu.H;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.H)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        case 0xD: {
            trace("CP A, L");
            const result = Cpu.A - Cpu.L;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        case 0xE: {
            trace("CP A, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const result = Cpu.A - value;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(value)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        case 0xF: {
            trace("CP A, A");
            const result = Cpu.A - Cpu.A;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.A)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handleCxOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("RET NZ");
            const zeroFlag = getZeroFlag();
            // syncCycle(4)
            if (zeroFlag == 0) {
                const lowByte = readByte(Cpu.sp);
                const highByte = readByte(Cpu.sp + 1);
                Cpu.sp += 2;
                // syncCycle(4)
                Cpu.pc = combineBytes(highByte, lowByte);
            }
            break;
        }
        case 0x1: {
            trace("POP BC");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            setBC(combineBytes(highByte, lowByte));
            break;
        }
        case 0x2: {
            trace("JP NZ, nn");
            const zeroFlag = getZeroFlag();
            const nn = readWordAtPc();
            if (zeroFlag == 0) {
                // syncCycle(4)
                Cpu.pc = nn;
            }
            break;
        }
        case 0x3: {
            trace("JP nn");
            const nn = readWordAtPc();
            // syncCycle(4)
            Cpu.pc = nn;
            break;
        }
        case 0x4: {
            trace("CALL NZ, nn");
            const zeroFlag = getZeroFlag();
            const nn = readWordAtPc();
            if (zeroFlag == 0) {
                // syncCycle(4)
                writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
                writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
                Cpu.sp -= 2;
                Cpu.pc = nn;
            }
            break;
        }
        case 0x5: {
            trace("PUSH BC");
            // syncCycle(4)
            writeByte(Cpu.sp - 1, Cpu.B);
            writeByte(Cpu.sp - 2, Cpu.C);
            Cpu.sp -= 2;
            break;
        }
        case 0x6: {
            trace("ADD A, n");
            const n = readByteAtPc();
            const result = Cpu.A + n;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x7: {
            trace("RST 00h");
            // OPCODE_TDB
            break;
        }
        case 0x8: {
            trace("RET Z");
            const zeroFlag = getZeroFlag();
            // syncCycle(4)
            if (zeroFlag == 1) {
                const lowByte = readByte(Cpu.sp);
                const highByte = readByte(Cpu.sp + 1);
                Cpu.sp += 2;
                // syncCycle(4)
                Cpu.pc = combineBytes(highByte, lowByte);
            }
            break;
        }
        case 0x9: {
            trace("RET");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            // syncCycle(4)
            Cpu.pc = combineBytes(highByte, lowByte);
            break;
        }
        case 0xA: {
            trace("JP Z");
            const zeroFlag = getZeroFlag();
            const nn = readWordAtPc();
            if (zeroFlag == 1) {
                // syncCycle(4);
                Cpu.pc = nn;
            }
            break;
        }
        case 0xB: {
            trace("PREFIX CB");
            const cbOpcode = readByteAtPc();
            handleCBOpcode(cbOpcode);
            break;
        }
        case 0xC: {
            trace("CALL Z, nn");
            const zeroFlag = getZeroFlag();
            const nn = readWordAtPc();
            if (zeroFlag == 1) {
                // syncCycle(4)
                writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
                writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
                Cpu.sp -= 2;
                Cpu.pc = nn;
            }
            break;
        }
        case 0xD: {
            trace("CALL nn");
            const nn = readWordAtPc();
            // syncCycle(4)
            writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
            writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
            Cpu.sp -= 2;
            Cpu.pc = nn;
            break;
        }
        case 0xE: {
            trace("ADC A, n");
            const carry = <u8>getCarryFlag();
            const n = readByteAtPc();
            const result = Cpu.A + n + carry;
            const halfCarry = ((getLowNibble(Cpu.A) + getLowNibble(n) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xF: {
            trace("RST 08h");
            // OPCODE_TDB
            break;

        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}

function handleDxOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("RET NC");
            const carryFlag = getCarryFlag();
            // syncCycle(4)
            if (carryFlag == 0) {
                const lowByte = readByte(Cpu.sp);
                const highByte = readByte(Cpu.sp + 1);
                Cpu.sp += 2;
                // syncCycle(4)
                Cpu.pc = combineBytes(highByte, lowByte);
            }
            break;
        }
        case 0x1: {
            trace("POP DE");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            setDE(combineBytes(highByte, lowByte));
            break;
        }
        case 0x2: {
            trace("JP NC, nn");
            const carryFlag = getCarryFlag();
            const nn = readWordAtPc();
            if (carryFlag == 0) {
                // syncCycle(4)
                Cpu.pc = nn;
            }
            break;
        }
        case 0x4: {
            trace("CALL NC, nn");
            const carryFlag = getCarryFlag();
            const nn = readWordAtPc();
            if (carryFlag == 0) {
                // syncCycle(4)
                writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
                writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
                Cpu.sp -= 2;
                Cpu.pc = nn;
            }
            break;
        }
        case 0x5: {
            trace("PUSH DE");
            // syncCycle(4)
            writeByte(Cpu.sp - 1, Cpu.D);
            writeByte(Cpu.sp - 2, Cpu.E);
            Cpu.sp -= 2;
            break;
        }
        case 0x6: {
            trace("SUB A, n");
            const n = readByteAtPc();
            const result = Cpu.A - n;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0x7: {
            trace("RST 10h");
            // OPCODE_TDB
            break;
        }
        case 0x8: {
            trace("RET C");
            const carryFlag = getCarryFlag();
            // syncCycle(4)
            if (carryFlag == 1) {
                const lowByte = readByte(Cpu.sp);
                const highByte = readByte(Cpu.sp + 1);
                Cpu.sp += 2;
                // syncCycle(4)
                Cpu.pc = combineBytes(highByte, lowByte);
            }
            break;
        }
        case 0x9: {
            trace("RETI");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            // syncCycle(4)
            Cpu.pc = combineBytes(highByte, lowByte);
            // NEED TO SET IME HERE
            // NEED TO SET IME HERE
            // NEED TO SET IME HERE
            // NEED TO SET IME HERE
            break;
        }
        case 0xA: {
            trace("JP C");
            const carryFlag = getCarryFlag();
            const nn = readWordAtPc();
            if (carryFlag == 1) {
                // syncCycle(4);
                Cpu.pc = nn;
            }
            break;
        }
        case 0xC: {
            trace("CALL C, nn");
            const carryFlag = getCarryFlag();
            const nn = readWordAtPc();
            if (carryFlag == 1) {
                // syncCycle(4)
                writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
                writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
                Cpu.sp -= 2;
                Cpu.pc = nn;
            }
            break;
        }
        case 0xE: {
            trace("SBC A, n");
            const carry = <u8>getCarryFlag();
            const n = readByteAtPc();
            const result = Cpu.A - n - carry;
            const halfCarry = ((getLowNibble(Cpu.A) - getLowNibble(n) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            break;
        }
        case 0xF: {
            trace("RST 18h");
            // OPCODE_TDB
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
        case 0x1: {
            handle1xOpcode(secondNibble);
            break;
        }
        case 0x2: {
            handle2xOpcode(secondNibble);
            break;
        }
        case 0x3: {
            handle3xOpcode(secondNibble);
            break;
        }
        case 0x4: {
            handle4xOpcode(secondNibble);
            break;
        }
        case 0x5: {
            handle5xOpcode(secondNibble);
            break;
        }
        case 0x6: {
            handle6xOpcode(secondNibble);
            break;
        }
        case 0x7: {
            handle7xOpcode(secondNibble);
            break;
        }
        case 0x8: {
            handle8xOpcode(secondNibble);
            break;
        }
        case 0x9: {
            handle9xOpcode(secondNibble);
            break;
        }
        case 0xA: {
            handleAxOpcode(secondNibble);
            break;
        }
        case 0xB: {
            handleBxOpcode(secondNibble);
            break;
        }
        case 0xC: {
            handleCxOpcode(secondNibble);
            break;
        }
        case 0xD: {
            handleDxOpcode(secondNibble);
            break;
        }
 
        default: {
            trace("This opcode isnt implemented yet");
            break;
        }
    }
}

export { executeOpcode };