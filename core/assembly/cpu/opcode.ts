import { readByteAtPc, readWordAtPc, readByte, writeByte } from '../readWriteOperations';
import { Cpu, getBC, setBC, getDE, setDE, getHL, setHL, setAF, setZeroFlag, setHalfCarryFlag, setNegativeFlag, getZeroFlag, getCarryFlag, setCarryFlag, setIme, unsetIme } from './state';
import { getLowNibble, getHighByte, getLowByte, combineBytes, getBitValue, setBitValue } from '../helpers';
import { handleCBOpcode } from './callbackOpcode';

function handle0xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("NOP");
            return 4;
        }
        case 0x1: {
            trace("LD BC, nn");
            Cpu.C = readByteAtPc();
            Cpu.B = readByteAtPc();
            return 12;
        }
        case 0x2: {
            trace("LD (BC), A");
            const bcAddress = getBC();
            writeByte(bcAddress, Cpu.A);
            return 8;
        }
        case 0x3: {
            trace("INC BC");
            const value = ((getBC() + 1) & 0xFFFF); 
            setBC(value);
            // syncCycle(4)
            return 8;
        }
        case 0x4: {
            trace("INC B");
            const value = ((Cpu.B + 1) & 0xFF); 
            const halfCarry: bool = ((getLowNibble(Cpu.B) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.B = value;
            return 4;
        }
        case 0x5: {
            trace("DEC B");
            const value = ((Cpu.B - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.B) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.B = value;
            return 4;
        }
        case 0x6: {
            trace("LD B, n");
            Cpu.B = readByteAtPc();
            return 8;
        }
        case 0x7: {
            trace("RLCA");
            const eighthBit = getBitValue(Cpu.A, 7);
            const shiftedValue = Cpu.A << 1;
            Cpu.A = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(0);
            setCarryFlag(eighthBit);
            return 4;
        }
        case 0x8: {
            trace("LD (nn), SP");
            const lowN = readByteAtPc();
            writeByte(lowN, getLowByte(Cpu.sp));
            const highN = readByteAtPc();
            writeByte(highN, getHighByte(Cpu.sp));
            return 20;
        }
        case 0x9: {
            trace("ADD HL, BC");
            const hl = getHL();
            const bc = getBC();
            const result = hl + bc;
            const halfCarry: bool = ((getLowNibble(Cpu.L) + getLowByte(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
            return 8;
        }
        case 0xA: {
            trace("LD A, (BC)");
            const bcAddress = getBC();
            Cpu.A = readByte(bcAddress);
            return 8;
        }
        case 0xB: {
            trace("DEC BC");
            const bc = getBC();
            const bcDec = ((bc - 1) & 0xFFFF);
            setBC(bcDec);
            // syncCycle(4)
            return 8;
        }
        case 0xC: {
            trace("INC C");
            const value = ((Cpu.C + 1) & 0xFF); 
            const halfCarry: bool = ((getLowNibble(Cpu.C) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.C = value;
            return 4;
        }
        case 0xD: {
            trace("DEC C");
            const value = ((Cpu.C - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.C) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.C = value;
            return 4;
        }
        case 0xE: {
            trace("LD C, n");
            Cpu.C = readByteAtPc();
            return 8;
        }
        case 0xF: {
            trace("RRCA");
            const firstBit = getBitValue(Cpu.A, 0);
            const shiftedValue = Cpu.A >> 1;
            Cpu.A = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(0);
            setCarryFlag(firstBit);
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handle1xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("STOP");
            abort("STOP CRASH IN GAMEBOY CLASSIC");
            // WEIRD_INSTRUCTION ONLY USE IN GBC
            Cpu.pc += 1;
            return 4;
        }
        case 0x1: {
            trace("LD DE, nn");
            Cpu.E = readByteAtPc();
            Cpu.D = readByteAtPc();
            return 12;
        }
        case 0x2: {
            trace("LD (DE), A");
            const deAddress = getDE();
            writeByte(deAddress, Cpu.A);
            return 8;
        }
        case 0x3: {
            trace("INC DE");
            const value = ((getDE() + 1) & 0xFFFF); 
            setDE(value);
            // syncCycle(4)
            return 8;
        }
        case 0x4: {
            trace("INC D");
            const value = ((Cpu.D + 1) & 0xFF); 
            const halfCarry: bool = ((getLowNibble(Cpu.D) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.D = value;
            return 4;
        }
        case 0x5: {
            trace("DEC D");
            const value = ((Cpu.D - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.D) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.D = value;
            return 4;
        }
        case 0x6: {
            trace("LD D, n");
            Cpu.D = readByteAtPc();
            return 8;
        }
        case 0x7: {
            trace("RLA");
            const eighthBit = getBitValue(Cpu.B, 7);
            const shiftedValue = Cpu.A << 1;
            Cpu.A = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(0);
            setCarryFlag(eighthBit);
            return 4;
        }
        case 0x8: {
            trace("JR e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            // syncCycle(4)
            Cpu.pc += relativeOffset;
            return 12;
        }
        case 0x9: {
            trace("ADD HL, DE");
            const hl = getHL();
            const de = getDE();
            const result = hl + de;
            const halfCarry: bool = ((getLowNibble(Cpu.L) + getLowByte(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
            return 8;
        }
        case 0xA: {
            trace("LD A, (DE)");
            const deAddress = getDE();
            Cpu.A = readByte(deAddress);
            return 8;
        }
        case 0xB: {
            trace("DEC DE");
            const value = ((getDE() - 1) & 0xFFFF); 
            setDE(value);
            // syncCycle(4)
            return 8;
        }
        case 0xC: {
            trace("INC E");
            const value = ((Cpu.E + 1) & 0xFF); 
            const halfCarry: bool = ((getLowNibble(Cpu.E) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.E = value;
            return 4;
        }
        case 0xD: {
            trace("DEC E");
            const value = ((Cpu.E - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.E) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.E = value;
            return 4;
        }
        case 0xE: {
            trace("LD E, n");
            Cpu.E = readByteAtPc();
            return 8;
        }
        case 0xF: {
            trace("RRA");
            const firstBit = getBitValue(Cpu.A, 0);
            const shiftedValue = Cpu.A >> 1;
            Cpu.A = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(0);
            setCarryFlag(firstBit);
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handle2xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("JR NZ, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const zeroFlag = getZeroFlag();
            if (zeroFlag == 0) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
                return 12;
            }
            return 8;
        }
        case 0x1: {
            trace("LD HL, nn");
            Cpu.L = readByteAtPc();
            Cpu.H = readByteAtPc();
            return 12;
        }
        case 0x2: {
            trace("LD (HL+), A");
            const hl = getHL();
            writeByte(hl, Cpu.A);
            const hlInc = ((hl + 1) & 0xFFFF);
            setHL(hlInc);
            return 8;
        }
        case 0x3: {
            trace("INC HL");
            const value = ((getHL() + 1) & 0xFFFF); 
            setHL(value);
            // syncCycle(4)
            return 8;
        }
        case 0x4: {
            trace("INC H");
            const value = ((Cpu.H + 1) & 0xFF); 
            const halfCarry: bool = ((getLowNibble(Cpu.H) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.H = value;
            return 4;
        }
        case 0x5: {
            trace("DEC H");
            const value = ((Cpu.H - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.H) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.H = value;
            return 4;
        }
        case 0x6: {
            trace("LD H, n");
            Cpu.H = readByteAtPc();
            return 8;
        }
        case 0x7: {
            trace("DAA");
            // OPCODE_TBD
            return 4;
        }
        case 0x8: {
            trace("JR Z, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const zeroFlag = getZeroFlag();
            if (zeroFlag == 1) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
                return 12;
            }
            return 8;
        }
        case 0x9: {
            trace("ADD HL, HL");
            const hl = getHL();
            const result = hl + hl;
            const halfCarry: bool = ((getLowNibble(Cpu.L) + getLowByte(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
            return 8;
        }
        case 0xA: {
            trace("LD A, (HL+)");
            const hl = getHL();
            Cpu.A = readByte(hl);
            const hlInc = ((hl + 1) & 0xFFFF);
            setHL(hlInc);
            return 8;
        }
        case 0xB: {
            trace("DEC HL");
            const value = ((getHL() - 1) & 0xFFFF); 
            setHL(value);
            // syncCycle(4)
            return 8;
        }
        case 0xC: {
            trace("INC L");
            const value = ((Cpu.L + 1) & 0xFF); 
            const halfCarry: bool = ((getLowNibble(Cpu.L) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.L = value;
            return 4;
        }
        case 0xD: {
            trace("DEC L");
            const value = ((Cpu.L - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.L) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.L = value;
            return 4;
        }
        case 0xE: {
            trace("LD L, n");
            Cpu.L = readByteAtPc();
            return 8;
        }
        case 0xF: {
            trace("CPL");
            Cpu.A = Cpu.A ^ 0xFF;
            setHalfCarryFlag(1);
            setNegativeFlag(1);
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }    
}

function handle3xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("JR NC, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const carryFlag = getCarryFlag();
            if (carryFlag == 0) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
                return 12;
            }
            return 8;
        }
        case 0x1: {
            trace("LD SP, nn");
            Cpu.sp = readWordAtPc();
            return 12;
        }
        case 0x2: {
            trace("LD (HL-), A");
            const hl = getHL();
            writeByte(hl, Cpu.A);
            const hlDec = ((hl - 1) & 0xFFFF);
            setHL(hlDec);
            return 8;
        }
        case 0x3: {
            trace("INC SP");
            const spInc = ((Cpu.sp + 1) & 0xFFFF);
            Cpu.sp = spInc;
            // syncCycle(4)
            return 8;
        }
        case 0x4: {
            trace("INC (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const valueInc = ((value + 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(value) + 1) & 0x10) > 0 ? 1 : 0;
            setNegativeFlag(0);
            setZeroFlag(valueInc > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            writeByte(hl, valueInc);
            return 12;
        }
        case 0x5: {
            trace("DEC (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const valueDec = ((value - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(value) - 1) & 0x10) > 0 ? 1 : 0;
            setNegativeFlag(1);
            setZeroFlag(valueDec > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            writeByte(hl, valueDec);
            return 12;
        }
        case 0x6: {
            trace("LD (HL), n");
            const n = readByteAtPc();
            const hlAddress = getHL();
            writeByte(hlAddress, n);
            return 12;
        }
        case 0x7: {
            trace("SCF");
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(1);
            return 4;
        }
        case 0x8: {
            trace("JR C, e");
            const relativeOffset: i8 = <i8>readByteAtPc();
            const carryFlag = getCarryFlag();
            if (carryFlag) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
                return 12;
            }
            return 8;
        }
        case 0x9: {
            trace("ADD HL, SP");
            const hl = getHL();
            const result = hl + Cpu.sp;
            const halfCarry: bool = ((getLowNibble(Cpu.L) + getLowByte(Cpu.sp)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setHL(result & 0xFFFF);
            // syncCycle(4)
            return 8;
        }
        case 0xA: {
            trace("LD A, (HL-)");
            const hl = getHL();
            Cpu.A = readByte(hl);
            const hlDec = ((hl - 1) & 0xFFFF);
            setHL(hlDec);
            return 8;
        }
        case 0xB: {
            trace("DEC SP");
            const spDec = ((Cpu.sp - 1) & 0xFFFF);
            Cpu.sp = spDec;
            // syncCycle(4)
            return 8;
        }
        case 0xC: {
            trace("INC A");
            const value = ((Cpu.A + 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.A) + 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(0);
            Cpu.A = value;
            return 4;
        }
        case 0xD: {
            trace("DEC A");
            const value = ((Cpu.A - 1) & 0xFF);
            const halfCarry: bool = ((getLowNibble(Cpu.A) - 1) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(value > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            Cpu.A = value;
            return 4;
        }
        case 0xE: {
            trace("LD A, n");
            Cpu.A = readByteAtPc();
            return 8;
        }
        case 0xF: {
            trace("CCF");
            // OPCODE_TBD
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }    
}

function handle4xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("LD B, B");
            Cpu.B = Cpu.B;
            return 4;
        }
        case 0x1: {
            trace("LD B, C");
            Cpu.B = Cpu.C;
            return 4;
        }
        case 0x2: {
            trace("LD B, D");
            Cpu.B = Cpu.D;
            return 4;
        }
        case 0x3: {
            trace("LD B, E");
            Cpu.B = Cpu.E;
            return 4;
        }
        case 0x4: {
            trace("LD B, H");
            Cpu.B = Cpu.H;
            return 4;
        }
        case 0x5: {
            trace("LD B, L");
            Cpu.B = Cpu.L;
            return 4;
        }
        case 0x6: {
            trace("LD B, (HL)");
            const hl = getHL();
            Cpu.B = readByte(hl);
            return 8;
        }
        case 0x7: {
            trace("LD B, A");
            Cpu.B = Cpu.A;
            return 4;
        }
        case 0x8: {
            trace("LD C, B");
            Cpu.C = Cpu.B;
            return 4;
        }
        case 0x9: {
            trace("LD C, C");
            Cpu.C = Cpu.C;
            return 4;
        }
        case 0xA: {
            trace("LD C, D");
            Cpu.C = Cpu.D;
            return 4;
        }
        case 0xB: {
            trace("LD C, E");
            Cpu.C = Cpu.E;
            return 4;
        }
        case 0xC: {
            trace("LD C, H");
            Cpu.C = Cpu.H;
            return 4;
        }
        case 0xD: {
            trace("LD C, L");
            Cpu.C = Cpu.L;
            return 4;
        }
        case 0xE: {
            trace("LD C, (HL)");
            const hl = getHL();
            Cpu.C = readByte(hl);
            return 8;
        }
        case 0xF: {
            trace("LD C, A");
            Cpu.C = Cpu.A;
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handle5xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("LD D, B");
            Cpu.D = Cpu.B;
            return 4;
        }
        case 0x1: {
            trace("LD D, C");
            Cpu.D = Cpu.C;
            return 4;
        }
        case 0x2: {
            trace("LD D, D");
            Cpu.D = Cpu.D;
            return 4;
        }
        case 0x3: {
            trace("LD D, E");
            Cpu.D = Cpu.E;
            return 4;
        }
        case 0x4: {
            trace("LD D, H");
            Cpu.D = Cpu.H;
            return 4;
        }
        case 0x5: {
            trace("LD D, L");
            Cpu.D = Cpu.L;
            return 4;
        }
        case 0x6: {
            trace("LD D, (HL)");
            const hl = getHL();
            Cpu.D = readByte(hl);
            return 8;
        }
        case 0x7: {
            trace("LD D, A");
            Cpu.D = Cpu.A;
            return 4;
        }
        case 0x8: {
            trace("LD E, B");
            Cpu.E = Cpu.B;
            return 4;
        }
        case 0x9: {
            trace("LD E, C");
            Cpu.E = Cpu.C;
            return 4;
        }
        case 0xA: {
            trace("LD E, D");
            Cpu.E = Cpu.D;
            return 4;
        }
        case 0xB: {
            trace("LD E, E");
            Cpu.E = Cpu.E;
            return 4;
        }
        case 0xC: {
            trace("LD E, H");
            Cpu.E = Cpu.H;
            return 4;
        }
        case 0xD: {
            trace("LD E, L");
            Cpu.E = Cpu.L;
            return 4;
        }
        case 0xE: {
            trace("LD E, (HL)");
            const hl = getHL();
            Cpu.E = readByte(hl);
            return 8;
        }
        case 0xF: {
            trace("LD E, A");
            Cpu.E = Cpu.A;
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handle6xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("LD H, B");
            Cpu.H = Cpu.B;
            return 4;
        }
        case 0x1: {
            trace("LD H, C");
            Cpu.H = Cpu.C;
            return 4;
        }
        case 0x2: {
            trace("LD H, D");
            Cpu.H = Cpu.D;
            return 4;
        }
        case 0x3: {
            trace("LD H, E");
            Cpu.H = Cpu.E;
            return 4;
        }
        case 0x4: {
            trace("LD H, H");
            Cpu.H = Cpu.H;
            return 4;
        }
        case 0x5: {
            trace("LD H, L");
            Cpu.H = Cpu.L;
            return 4;
        }
        case 0x6: {
            trace("LD H, (HL)");
            const hl = getHL();
            Cpu.H = readByte(hl);
            return 8;
        }
        case 0x7: {
            trace("LD H, A");
            Cpu.H = Cpu.A;
            return 4;
        }
        case 0x8: {
            trace("LD L, B");
            Cpu.L = Cpu.B;
            return 4;
        }
        case 0x9: {
            trace("LD L, C");
            Cpu.L = Cpu.C;
            return 4;
        }
        case 0xA: {
            trace("LD L, D");
            Cpu.L = Cpu.D;
            return 4;
        }
        case 0xB: {
            trace("LD L, E");
            Cpu.L = Cpu.E;
            return 4;
        }
        case 0xC: {
            trace("LD L, H");
            Cpu.L = Cpu.H;
            return 4;
        }
        case 0xD: {
            trace("LD L, L");
            Cpu.L = Cpu.L;
            return 4;
        }
        case 0xE: {
            trace("LD L, (HL)");
            const hl = getHL();
            Cpu.L = readByte(hl);
            return 8;
        }
        case 0xF: {
            trace("LD L, A");
            Cpu.L = Cpu.A;
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handle7xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("LD (HL), B");
            const hl = getHL();
            writeByte(hl, Cpu.B);
            return 8;
        }
        case 0x1: {
            trace("LD (HL), C");
            const hl = getHL();
            writeByte(hl, Cpu.C);
            return 8;
        }
        case 0x2: {
            trace("LD (HL), D");
            const hl = getHL();
            writeByte(hl, Cpu.D);
            return 8;
        }
        case 0x3: {
            trace("LD (HL), E");
            const hl = getHL();
            writeByte(hl, Cpu.E);
            return 8;
        }
        case 0x4: {
            trace("LD (HL), H");
            const hl = getHL();
            writeByte(hl, Cpu.H);
            return 8;
        }
        case 0x5: {
            trace("LD (HL), L");
            const hl = getHL();
            writeByte(hl, Cpu.L);
            return 8;
        }
        case 0x6: {

            // TBD
            trace("HALT");
            // TBD

            return 4;
        }
        case 0x7: {
            trace("LD (HL), A");
            const hl = getHL();
            writeByte(hl, Cpu.A);
            return 8;
        }
        case 0x8: {
            trace("LD A, B");
            Cpu.A = Cpu.B;
            return 4;
        }
        case 0x9: {
            trace("LD A, C");
            Cpu.A = Cpu.C;
            return 4;
        }
        case 0xA: {
            trace("LD A, D");
            Cpu.A = Cpu.D;
            return 4;
        }
        case 0xB: {
            trace("LD A, E");
            Cpu.A = Cpu.E;
            return 4;
        }
        case 0xC: {
            trace("LD A, H");
            Cpu.A = Cpu.H;
            return 8;
        }
        case 0xD: {
            trace("LD A, L");
            Cpu.A = Cpu.L;
            return 4;
        }
        case 0xE: {
            trace("LD A, (HL)");
            const hl = getHL();
            Cpu.A = readByte(hl);
            return 8;
        }
        case 0xF: {
            trace("LD A, A");
            Cpu.A = Cpu.A;
            return 8;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handle8xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("ADD A, B");
            const result = Cpu.A + Cpu.B;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.B)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x1: {
            trace("ADD A, C");
            const result = Cpu.A + Cpu.C;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x2: {
            trace("ADD A, D");
            const result = Cpu.A + Cpu.D;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.D)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x3: {
            trace("ADD A, E");
            const result = Cpu.A + Cpu.E;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x4: {
            trace("ADD A, H");
            const result = Cpu.A + Cpu.H;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.H)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x5: {
            trace("ADD A, L");
            const result = Cpu.A + Cpu.L;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x6: {
            trace("ADD A, (HL)");
            const hl = getHL();
            const hlValue = readByte(hl);
            const result = Cpu.A + hlValue;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(hlValue)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0x7: {
            trace("ADD A, A");
            const result = Cpu.A + Cpu.A;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.A)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x8: {
            trace("ADC A, B");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.B + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.B) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x9: {
            trace("ADC A, C");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.C + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.C) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xA: {
            trace("ADC A, D");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.D + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.D) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xB: {
            trace("ADC A, E");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.E + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.E) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xC: {
            trace("ADC A, H");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.H + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.H) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xD: {
            trace("ADC A, L");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.L + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.L) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xE: {
            trace("ADC A, (HL)");
            const carry = <u8>getCarryFlag();
            const hl = getHL();
            const value = readByte(hl);
            const result = Cpu.A + value + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(value) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0xF: {
            trace("ADC A, A");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A + Cpu.A + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(Cpu.A) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handle9xOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("SUB A, B");
            const result = Cpu.A - Cpu.B;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.B)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x1: {
            trace("SUB A, C");
            const result = Cpu.A - Cpu.C;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x2: {
            trace("SUB A, D");
            const result = Cpu.A - Cpu.D;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.D)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x3: {
            trace("SUB A, E");
            const result = Cpu.A - Cpu.E;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x4: {
            trace("SUB A, H");
            const result = Cpu.A - Cpu.H;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.H)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x5: {
            trace("SUB A, L");
            const result = Cpu.A - Cpu.L;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x6: {
            trace("SUB A, (HL)");
            const hl = getHL();
            const hlValue = readByte(hl);
            const result = Cpu.A - hlValue;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(hlValue)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0x7: {
            trace("SUB A, A");
            const result = Cpu.A - Cpu.A;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.A)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x8: {
            trace("SBC A, B");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.B - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.B) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0x9: {
            trace("SBC A, C");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.C - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.C) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xA: {
            trace("SBC A, D");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.D - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.D) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xB: {
            trace("SBC A, E");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.E - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.E) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xC: {
            trace("SBC A, H");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.H - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.H) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xD: {
            trace("SBC A, L");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.L - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.L) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        case 0xE: {
            trace("SBC A, (HL)");
            const carry = <u8>getCarryFlag();
            const hl = getHL();
            const value = readByte(hl);
            const result = Cpu.A - value - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(value) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0xF: {
            trace("SBC A, A");
            const carry = <u8>getCarryFlag();
            const result = Cpu.A - Cpu.A - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.A) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handleAxOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("AND A, B");
            const result = Cpu.A & Cpu.B;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x1: {
            trace("AND A, C");
            const result = Cpu.A & Cpu.C;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x2: {
            trace("AND A, D");
            const result = Cpu.A & Cpu.D;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x3: {
            trace("AND A, E");
            const result = Cpu.A & Cpu.E;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x4: {
            trace("AND A, H");
            const result = Cpu.A & Cpu.H;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x5: {
            trace("AND A, L");
            const result = Cpu.A & Cpu.L;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
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
            return 8;
        }
        case 0x7: {
            trace("AND A, A");
            const result = Cpu.A & Cpu.A;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(1);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x8: {
            trace("XOR A, B");
            const result = Cpu.A ^ Cpu.B;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x9: {
            trace("XOR A, C");
            const result = Cpu.A ^ Cpu.C;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0xA: {
            trace("XOR A, D");
            const result = Cpu.A ^ Cpu.D;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0xB: {
            trace("XOR A, E");
            const result = Cpu.A ^ Cpu.E;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0xC: {
            trace("XOR A, H");
            const result = Cpu.A ^ Cpu.H;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0xD: {
            trace("XOR A, L");
            const result = Cpu.A ^ Cpu.L;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
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
            return 8;
        }
        case 0xF: {
            trace("XOR A, A");
            const result = Cpu.A ^ Cpu.A;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handleBxOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("OR A, B");
            const result = Cpu.A | Cpu.B;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x1: {
            trace("OR A, C");
            const result = Cpu.A | Cpu.C;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x2: {
            trace("OR A, D");
            const result = Cpu.A | Cpu.D;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x3: {
            trace("OR A, E");
            const result = Cpu.A | Cpu.E;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x4: {
            trace("OR A, H");
            const result = Cpu.A | Cpu.H;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x5: {
            trace("OR A, L");
            const result = Cpu.A | Cpu.L;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
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
            return 8;
        }
        case 0x7: {
            trace("OR A, A");
            const result = Cpu.A | Cpu.A;
            setCarryFlag(0);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result;
            return 4;
        }
        case 0x8: {
            trace("CP A, B");
            const result = Cpu.A - Cpu.B;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.B)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 4;
        }
        case 0x9: {
            trace("CP A, C");
            const result = Cpu.A - Cpu.C;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.C)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 4;
        }
        case 0xA: {
            trace("CP A, D");
            const result = Cpu.A - Cpu.D;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.D)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 4;
        }
        case 0xB: {
            trace("CP A, E");
            const result = Cpu.A - Cpu.E;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.E)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 4;
        }
        case 0xC: {
            trace("CP A, H");
            const result = Cpu.A - Cpu.H;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.H)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 4;
        }
        case 0xD: {
            trace("CP A, L");
            const result = Cpu.A - Cpu.L;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.L)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 4;
        }
        case 0xE: {
            trace("CP A, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const result = Cpu.A - value;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(value)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 8;
        }
        case 0xF: {
            trace("CP A, A");
            const result = Cpu.A - Cpu.A;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(Cpu.A)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            return 4;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handleCxOpcode(opcode: u8): i32 {
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
                return 20;
            }
            return 8;
        }
        case 0x1: {
            trace("POP BC");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            setBC(combineBytes(highByte, lowByte));
            return 12;
        }
        case 0x2: {
            trace("JP NZ, nn");
            const zeroFlag = getZeroFlag();
            const nn = readWordAtPc();
            if (zeroFlag == 0) {
                // syncCycle(4)
                Cpu.pc = nn;
                return 16;
            }
            return 12;
        }
        case 0x3: {
            trace("JP nn");
            const nn = readWordAtPc();
            trace("NN", 1, nn);
            // syncCycle(4)
            Cpu.pc = nn;
            return 16;
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
                return 24;
            }
            return 12;
        }
        case 0x5: {
            trace("PUSH BC");
            // syncCycle(4)
            writeByte(Cpu.sp - 1, Cpu.B);
            writeByte(Cpu.sp - 2, Cpu.C);
            Cpu.sp -= 2;
            return 16;
        }
        case 0x6: {
            trace("ADD A, n");
            const n = readByteAtPc();
            const result = Cpu.A + n;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0x7: {
            trace("RST 00h");
            // OPCODE_TDB
            return 16;
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
                return 20;
            }
            return 8;
        }
        case 0x9: {
            trace("RET");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            // syncCycle(4)
            Cpu.pc = combineBytes(highByte, lowByte);
            return 16;
        }
        case 0xA: {
            trace("JP Z");
            const zeroFlag = getZeroFlag();
            const nn = readWordAtPc();
            if (zeroFlag == 1) {
                // syncCycle(4);
                Cpu.pc = nn;
                return 16;
            }
            return 12;
        }
        case 0xB: {
            trace("PREFIX CB");
            const cbOpcode = readByteAtPc();
            return handleCBOpcode(cbOpcode);
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
                return 24;
            }
            return 12;
        }
        case 0xD: {
            trace("CALL nn");
            const nn = readWordAtPc();
            // syncCycle(4)
            writeByte(Cpu.sp - 1, getHighByte(Cpu.pc));
            writeByte(Cpu.sp - 2, getLowByte(Cpu.pc));
            Cpu.sp -= 2;
            Cpu.pc = nn;
            return 24;
        }
        case 0xE: {
            trace("ADC A, n");
            const carry = <u8>getCarryFlag();
            const n = readByteAtPc();
            const result = Cpu.A + n + carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) + getLowNibble(n) + carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(0);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0xF: {
            trace("RST 08h");
            // OPCODE_TDB
            return 16;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handleDxOpcode(opcode: u8): i32 {
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
                return 20;
            }
            return 8;
        }
        case 0x1: {
            trace("POP DE");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            setDE(combineBytes(highByte, lowByte));
            return 12;
        }
        case 0x2: {
            trace("JP NC, nn");
            const carryFlag = getCarryFlag();
            const nn = readWordAtPc();
            if (carryFlag == 0) {
                // syncCycle(4)
                Cpu.pc = nn;
                return 16;
            }
            return 12;
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
                return 24;
            }
            return 12;
        }
        case 0x5: {
            trace("PUSH DE");
            // syncCycle(4)
            writeByte(Cpu.sp - 1, Cpu.D);
            writeByte(Cpu.sp - 2, Cpu.E);
            Cpu.sp -= 2;
            return 16;
        }
        case 0x6: {
            trace("SUB A, n");
            const n = readByteAtPc();
            const result = Cpu.A - n;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0x7: {
            trace("RST 10h");
            // OPCODE_TDB
            return 16;
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
                return 20;
            }
            return 8;
        }
        case 0x9: {
            trace("RETI");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            // syncCycle(4)
            Cpu.pc = combineBytes(highByte, lowByte);
            setIme();
            return 16;
        }
        case 0xA: {
            trace("JP C");
            const carryFlag = getCarryFlag();
            const nn = readWordAtPc();
            if (carryFlag == 1) {
                // syncCycle(4);
                Cpu.pc = nn;
                return 16;
            }
            return 12;
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
                return 24;
            }
            return 12;
        }
        case 0xE: {
            trace("SBC A, n");
            const carry = <u8>getCarryFlag();
            const n = readByteAtPc();
            const result = Cpu.A - n - carry;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(n) - carry) & 0x10) > 0 ? 1 : 0;
            setCarryFlag((result > 0xFF) ? 1 : 0);
            setNegativeFlag(1);
            setHalfCarryFlag(halfCarry);
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            Cpu.A = result & 0xFF;
            return 8;
        }
        case 0xF: {
            trace("RST 18h");
            // OPCODE_TDB
            return 16;

        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handleExOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("LD (FF00 + n), A");
            const n = readByteAtPc();
            const address = combineBytes(0xFF, n);
            writeByte(address, Cpu.A);
            return 12;
        }
        case 0x1: {
            trace("POP HL");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            setHL(combineBytes(highByte, lowByte));
            return 12;
        }
        case 0x2: {
            trace("LD (FF00 + C), A");
            const address = combineBytes(0xFF, Cpu.C);
            writeByte(address, Cpu.A);
            return 8;
        }
        case 0x5: {
            trace("PUSH HL");
            // syncCycle(4)
            writeByte(Cpu.sp - 1, Cpu.H);
            writeByte(Cpu.sp - 2, Cpu.L);
            Cpu.sp -= 2;
            return 16;
        }
        case 0x6: {
            trace("AND A, n");
            const n = readByteAtPc();
            const result = Cpu.A & n;
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            setNegativeFlag(0);
            setCarryFlag(0);
            setHalfCarryFlag(1);
            Cpu.A = result;
            return 8;
        }
        case 0x7: {
            trace("RST 20h");
            // OPCODE_TDB
            return 16;
        }
        case 0x8: {
            trace("ADD SP, n");
            const n = <i8>readByteAtPc();
            const result = Cpu.sp + n;
            const lowSp = getLowByte(Cpu.sp);
            const halfCarry: bool = ((getLowNibble(lowSp) - getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
            setHalfCarryFlag(halfCarry);
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setZeroFlag(0);
            setNegativeFlag(0);
            Cpu.sp = result & 0xFFFF;
            return 16;
        }
        case 0x9: {
            trace("JP HL");
            Cpu.pc = getHL();
            return 4;
        }
        case 0xA: {
            trace("LD (nn), A");
            const nn = readWordAtPc();
            writeByte(nn, Cpu.A);
            return 16;
        }
        case 0xE: {
            trace("XOR A, n");
            const n = readByteAtPc();
            const result = Cpu.A ^ n;
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(0);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            Cpu.A = result;
            return 8;
        }
        case 0xF: {
            trace("RST 28h");
            // OPCODE_TDB
            return 16;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

function handleFxOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            trace("LD A, (FF00 + n)");
            const n = readByteAtPc();
            const address = combineBytes(0xFF, n);
            Cpu.A = readByte(address);
            return 12;
        }
        case 0x1: {
            trace("POP AF");
            const lowByte = readByte(Cpu.sp);
            const highByte = readByte(Cpu.sp + 1);
            Cpu.sp += 2;
            setAF(combineBytes(highByte, lowByte));
            return 12;
        }
        case 0x2: {
            trace("LD A, (FF00 + C)");
            const address = combineBytes(0xFF, Cpu.C);
            Cpu.A = readByte(address);
            return 8;
        }
        case 0x3: {
            trace("DI");
            unsetIme();
            return 4;
        }
        case 0x5: {
            trace("PUSH AF");
            // syncCycle(4)
            writeByte(Cpu.sp - 1, Cpu.A);
            writeByte(Cpu.sp - 2, Cpu.F);
            Cpu.sp -= 2;
            return 16;
        }
        case 0x6: {
            trace("OR A, n");
            const n = readByteAtPc();
            const result = Cpu.A | n;
            setZeroFlag((result & 0xFF) > 0 ? 0 : 1);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            Cpu.A = result;
            return 8;
        }
        case 0x7: {
            trace("RST 30h");
            // OPCODE_TDB
            return 16;
        }
        case 0x8: {
            trace("LD HL, SP + n");
            // not sure about this instruction
            const n = <i8>readByteAtPc();
            const result = Cpu.sp + n;
            const lowSp = getLowByte(Cpu.sp);
            const halfCarry: bool = ((getLowNibble(lowSp) - getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
            setHalfCarryFlag(halfCarry);
            setCarryFlag(result > 0xFFFF ? 1 : 0);
            setZeroFlag(0);
            setNegativeFlag(0);
            // syncCycle(4)
            setHL(result);
            return 12;
        }
        case 0x9: {
            trace("LD SP, HL");
            // syncCycle(4)
            Cpu.sp = getHL();
            return 8;
        }
        case 0xA: {
            trace("LD A, (nn)");
            const nn = readWordAtPc();
            Cpu.A = readByte(nn);
            return 16;
        }
        case 0xB: {
            trace("EI");
            setIme();
            return 4;
        }
        case 0xE: {
            trace("CP A, n");
            const n = readByteAtPc();
            const result = Cpu.A - n;
            const halfCarry: bool = ((getLowNibble(Cpu.A) - getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(result > 0xFF ? 1 : 0);
            setHalfCarryFlag(halfCarry);
            setNegativeFlag(1);
            return 8;
        }
        case 0xF: {
            trace("RST 38h");
            // OPCODE_TDB
            return 16;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}

// Example: if opcode = 0x15
// firstNibble = 0x1
// secondNibble = 0x5
export function fetchExecuteOpcode(): i32 {
    const opcode: u8 = readByteAtPc();
    const firstNibble: u8 = opcode >> 4;
    const secondNibble: u8 = opcode & 0xF;

    switch (firstNibble) {
        case 0x0: return handle0xOpcode(secondNibble);
        case 0x1: return handle1xOpcode(secondNibble);
        case 0x2: return handle2xOpcode(secondNibble);
        case 0x3: return handle3xOpcode(secondNibble);
        case 0x4: return handle4xOpcode(secondNibble);
        case 0x5: return handle5xOpcode(secondNibble);
        case 0x6: return handle6xOpcode(secondNibble);
        case 0x7: return handle7xOpcode(secondNibble);
        case 0x8: return handle8xOpcode(secondNibble);
        case 0x9: return handle9xOpcode(secondNibble);
        case 0xA: return handleAxOpcode(secondNibble);
        case 0xB: return handleBxOpcode(secondNibble);
        case 0xC: return handleCxOpcode(secondNibble);
        case 0xD: return handleDxOpcode(secondNibble);
        case 0xE: return handleExOpcode(secondNibble);
        case 0xF: return handleFxOpcode(secondNibble);
        default: {
            abort("Imposible opcode");
            return -1;
        }
    }
}