import { readByteAtPc, readWordAtPc, readByte, writeByte } from './readWriteOperations';
import { Cpu, getBC, setBC, getDE, setDE, getHL, setHL, setZeroFlag, setHalfCarryFlag, setNegativeFlag, getZeroFlag, getCarryFlag, setCarryFlag } from './cpuState';
import { loadToRegister, loadToPairRegister, loadToMemoryAddress } from './instructions';
import { getLowNibble, getHighByte, getLowByte } from './helpers';

function fetchOpcode(): u8 {
    return readByteAtPc();
}

/*
    opcode done: (not tested at all)
    from 0x40 to 0x7F | except 0x76 (HALT OPCODE)

*/


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
        case 0x7: {
            trace("RLCA");
            // OPCODE_TBD
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
            let value = getDE();
            value = ((value + 1) & 0xFFFF); 
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
            const newPc = Cpu.pc + relativeOffset;
            // syncCycle(4)
            Cpu.pc = newPc;
        }
        case 0x9: {
            trace("ADD HL, DE");
            // OPCODE_TBD
            // setNegativeFlag(0);
        }
        case 0xA: {
            trace("LD A, (DE)");
            const deAddress = getDE();
            Cpu.A = readByte(deAddress);
        }
        case 0xB: {
            trace("DEC DE");
            let value = getDE();
            value = ((value - 1) & 0xFFFF); 
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
            if (!zeroFlag) {
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
            const hlAddress = getHL();
            writeByte(hlAddress, Cpu.A);
            const hlAddressInc = ((hlAddress + 1) & 0xFFFF);
            setBC(hlAddressInc);
        }
        case 0x3: {
            trace("INC HL");
            const hl = getHL();
            const hlInc = ((hl + 1) & 0xFFFF); 
            setHL(hlInc);
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
            if (zeroFlag) {
                Cpu.pc += relativeOffset;
                // syncCycle(4)
            }
        }
        case 0x9: {
            trace("ADD HL, HL");
            // OPCODE_TBD
            // setNegativeFlag(0);
        }
        case 0xA: {
            trace("LD A, (HL+)");
            const hlAddress = getHL();
            Cpu.A = readByte(hlAddress);
            const hlAddressInc = ((hlAddress + 1) & 0xFFFF);
            setHL(hlAddressInc);
        }
        case 0xB: {
            trace("DEC HL");
            let value = getHL();
            value = ((value - 1) & 0xFFFF); 
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
            // OPCODE_TBD
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
            if (!carryFlag) {
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
            const hlAddress = getHL();
            writeByte(hlAddress, Cpu.A);
            const hlAddressDec = ((hlAddress - 1) & 0xFFFF);
            setHL(hlAddressDec);
        }
        case 0x3: {
            trace("INC SP");
            const spInc = ((Cpu.sp + 1) & 0xFF);
            Cpu.sp = spInc;
            // syncCycle(4)
        }
        case 0x4: {
            trace("INC (HL)");
            const hlAddress = getHL();
            const valueAtAddress = readByte(hlAddress);
            const valueAtAddressInc = ((valueAtAddress + 1) & 0xFF);
            const halfCarry = ((getLowNibble(valueAtAddress) + 1) & 0x10) > 0 ? 1 : 0;
            setNegativeFlag(0);
            setZeroFlag(valueAtAddressInc > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            writeByte(hlAddress, valueAtAddressInc);
        }
        case 0x5: {
            trace("DEC (HL)");
            const hlAddress = getHL();
            const valueAtAddress = readByte(hlAddress);
            const valueAtAddressDec = ((valueAtAddress - 1) & 0xFF);
            const halfCarry = ((getLowNibble(valueAtAddress) - 1) & 0x10) > 0 ? 1 : 0;
            setNegativeFlag(1);
            setZeroFlag(valueAtAddressDec > 0 ? 0 : 1);
            setHalfCarryFlag(halfCarry);
            writeByte(hlAddress, valueAtAddressDec);
        }
        case 0x6: {
            trace("LD (HL), n");
            const n = readByteAtPc();
            const hlAddress = getHL();
            writeByte(hlAddress, n);
        }
        case 0x7: {
            trace("SCF");
            // OPCODE_TBD
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
            // OPCODE_TBD
            // setNegativeFlag(0);
        }
        case 0xA: {
            trace("LD A, (HL-)");
            const hlAddress = getHL();
            Cpu.A = readByte(hlAddress);
            const hlAddressDec = ((hlAddress - 1) & 0xFFFF);
            setHL(hlAddressDec);
        }
        case 0xB: {
            trace("DEC SP");
            Cpu.sp = ((Cpu.sp - 1) & 0xFFFF);
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

function handle5xOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("LD D, B");
            loadToRegister("D", Cpu.B);
            break;
        }
        case 0x1: {
            trace("LD D, C");
            loadToRegister("D", Cpu.C);
            break;
        }
        case 0x2: {
            trace("LD D, D");
            loadToRegister("D", Cpu.D);
            break;
        }
        case 0x3: {
            trace("LD D, E");
            loadToRegister("D", Cpu.E);
            break;
        }
        case 0x4: {
            trace("LD D, H");
            loadToRegister("D", Cpu.H);
            break;
        }
        case 0x5: {
            trace("LD D, L");
            loadToRegister("D", Cpu.L);
            break;
        }
        case 0x6: {
            trace("LD D, (HL)");
            const HL = getHL();
            loadToRegister("D", readByte(HL));
            break;
        }
        case 0x7: {
            trace("LD D, A");
            loadToRegister("D", Cpu.A);
            break;
        }
        case 0x8: {
            trace("LD E, B");
            loadToRegister("E", Cpu.B);
            break;
        }
        case 0x9: {
            trace("LD E, C");
            loadToRegister("E", Cpu.C);
            break;
        }
        case 0xA: {
            trace("LD E, D");
            loadToRegister("E", Cpu.D);
            break;
        }
        case 0xB: {
            trace("LD E, E");
            loadToRegister("E", Cpu.E);
            break;
        }
        case 0xC: {
            trace("LD E, H");
            loadToRegister("E", Cpu.H);
            break;
        }
        case 0xD: {
            trace("LD E, L");
            loadToRegister("E", Cpu.L);
            break;
        }
        case 0xE: {
            trace("LD E, (HL)");
            const HL = getHL();
            loadToRegister("E", readByte(HL));
            break;
        }
        case 0xF: {
            trace("LD E, A");
            loadToRegister("E", Cpu.A);
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
            loadToRegister("H", Cpu.B);
            break;
        }
        case 0x1: {
            trace("LD H, C");
            loadToRegister("H", Cpu.C);
            break;
        }
        case 0x2: {
            trace("LD H, D");
            loadToRegister("H", Cpu.D);
            break;
        }
        case 0x3: {
            trace("LD H, E");
            loadToRegister("H", Cpu.E);
            break;
        }
        case 0x4: {
            trace("LD H, H");
            loadToRegister("H", Cpu.H);
            break;
        }
        case 0x5: {
            trace("LD H, L");
            loadToRegister("H", Cpu.L);
            break;
        }
        case 0x6: {
            trace("LD H, (HL)");
            const HL = getHL();
            loadToRegister("H", readByte(HL));
            break;
        }
        case 0x7: {
            trace("LD H, A");
            loadToRegister("H", Cpu.A);
            break;
        }
        case 0x8: {
            trace("LD L, B");
            loadToRegister("L", Cpu.B);
            break;
        }
        case 0x9: {
            trace("LD L, C");
            loadToRegister("L", Cpu.C);
            break;
        }
        case 0xA: {
            trace("LD L, D");
            loadToRegister("L", Cpu.D);
            break;
        }
        case 0xB: {
            trace("LD L, E");
            loadToRegister("L", Cpu.E);
            break;
        }
        case 0xC: {
            trace("LD L, H");
            loadToRegister("L", Cpu.H);
            break;
        }
        case 0xD: {
            trace("LD L, L");
            loadToRegister("L", Cpu.L);
            break;
        }
        case 0xE: {
            trace("LD L, (HL)");
            const HL = getHL();
            loadToRegister("L", readByte(HL));
            break;
        }
        case 0xF: {
            trace("LD L, A");
            loadToRegister("L", Cpu.A);
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
            const HL = getHL();
            loadToMemoryAddress(HL, Cpu.B);
            break;
        }
        case 0x1: {
            trace("LD (HL), C");
            const HL = getHL();
            loadToMemoryAddress(HL, Cpu.C);
            break;
        }
        case 0x2: {
            trace("LD (HL), D");
            const HL = getHL();
            loadToMemoryAddress(HL, Cpu.D);
            break;
        }
        case 0x3: {
            trace("LD (HL), E");
            const HL = getHL();
            loadToMemoryAddress(HL, Cpu.E);
            break;
        }
        case 0x4: {
            trace("LD (HL), H");
            const HL = getHL();
            loadToMemoryAddress(HL, Cpu.H);
            break;
        }
        case 0x5: {
            trace("LD (HL), L");
            const HL = getHL();
            loadToMemoryAddress(HL, Cpu.L);
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
            const HL = getHL();
            loadToMemoryAddress(HL, Cpu.A);
            break;
        }
        case 0x8: {
            trace("LD A, B");
            loadToRegister("A", Cpu.B);
            break;
        }
        case 0x9: {
            trace("LD A, C");
            loadToRegister("A", Cpu.C);
            break;
        }
        case 0xA: {
            trace("LD A, D");
            loadToRegister("A", Cpu.D);
            break;
        }
        case 0xB: {
            trace("LD A, E");
            loadToRegister("A", Cpu.E);
            break;
        }
        case 0xC: {
            trace("LD A, H");
            loadToRegister("A", Cpu.H);
            break;
        }
        case 0xD: {
            trace("LD A, L");
            loadToRegister("A", Cpu.L);
            break;
        }
        case 0xE: {
            trace("LD A, (HL)");
            const HL = getHL();
            loadToRegister("A", readByte(HL));
            break;
        }
        case 0xF: {
            trace("LD A, A");
            loadToRegister("A", Cpu.A);
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
 
        default: {
            trace("This opcode isnt implemented yet");
            break;
        }
    }
}

export { fetchOpcode, executeOpcode };