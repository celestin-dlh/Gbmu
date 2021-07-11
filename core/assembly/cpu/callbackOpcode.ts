import { readByte, writeByte } from '../memory';
import { Cpu, setZeroFlag, setHalfCarryFlag, setNegativeFlag, getCarryFlag, setCarryFlag } from '.';
import { getLowNibble, getBitValue, setBitValue, getHighNibble, combineNibbles } from '../helpers/bitOperations';

export function handleCBOpcode(opcode: u8): i32 {
    switch (opcode) {
        case 0x0: {
            // "RLC B"
            const eighthBit = getBitValue(Cpu.B, 7);
            const shiftedValue = Cpu.B << 1;
            Cpu.B = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x1: {
            // "RLC C"
            const eighthBit = getBitValue(Cpu.C, 7);
            const shiftedValue = Cpu.C << 1;
            Cpu.C = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x2: {
            // "RLC D"
            const eighthBit = getBitValue(Cpu.D, 7);
            const shiftedValue = Cpu.D << 1;
            Cpu.D = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x3: {
            // "RLC E"
            const eighthBit = getBitValue(Cpu.E, 7);
            const shiftedValue = Cpu.E << 1;
            Cpu.E = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x4: {
            // "RLC H"
            const eighthBit = getBitValue(Cpu.H, 7);
            const shiftedValue = Cpu.H << 1;
            Cpu.H = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x5: {
            // "RLC L"
            const eighthBit = getBitValue(Cpu.L, 7);
            const shiftedValue = Cpu.L << 1;
            Cpu.L = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x6: {
            // "RLC (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            let shiftedValue = value << 1;
            shiftedValue = setBitValue(shiftedValue, 0, eighthBit);
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 16;
        }
        case 0x7: {
            // "RLC A"
            const eighthBit = getBitValue(Cpu.A, 7);
            const shiftedValue = Cpu.A << 1;
            Cpu.A = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x8: {
            // "RRC B"
            const firstBit = getBitValue(Cpu.B, 0);
            const shiftedValue = Cpu.B >> 1;
            Cpu.B = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x9: {
            // "RRC C"
            const firstBit = getBitValue(Cpu.C, 0);
            const shiftedValue = Cpu.C >> 1;
            Cpu.C = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0xA: {
            // "RRC D"
            const firstBit = getBitValue(Cpu.D, 0);
            const shiftedValue = Cpu.D >> 1;
            Cpu.D = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0xB: {
            // "RRC E"
            const firstBit = getBitValue(Cpu.E, 0);
            const shiftedValue = Cpu.E >> 1;
            Cpu.E = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0xC: {
            // "RRC H"
            const firstBit = getBitValue(Cpu.H, 0);
            const shiftedValue = Cpu.H >> 1;
            Cpu.H = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0xD: {
            // "RRC L"
            const firstBit = getBitValue(Cpu.L, 0);
            const shiftedValue = Cpu.L >> 1;
            Cpu.L = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0xE: {
            // "RRC (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const firstBit = getBitValue(value, 0);
            let shiftedValue = value >> 1;
            shiftedValue = setBitValue(shiftedValue, 7, firstBit);
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 16;
        }
        case 0xF: {
            // "RRC A"
            const firstBit = getBitValue(Cpu.A, 0);
            const shiftedValue = Cpu.A >> 1;
            Cpu.A = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x10: {
            // "RL B"
            const eighthBit = getBitValue(Cpu.B, 7);
            const shiftedValue = Cpu.B << 1;
            Cpu.B = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x11: {
            // "RL C"
            const eighthBit = getBitValue(Cpu.C, 7);
            const shiftedValue = Cpu.C << 1;
            Cpu.C = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x12: {
            // "RL D"
            const eighthBit = getBitValue(Cpu.D, 7);
            const shiftedValue = Cpu.D << 1;
            Cpu.D = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x13: {
            // "RL E"
            const eighthBit = getBitValue(Cpu.E, 7);
            const shiftedValue = Cpu.E << 1;
            Cpu.E = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x14: {
            // "RL H"
            const eighthBit = getBitValue(Cpu.H, 7);
            const shiftedValue = Cpu.H << 1;
            Cpu.H = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;

        }
        case 0x15: {
            // "RL L"
            const eighthBit = getBitValue(Cpu.L, 7);
            const shiftedValue = Cpu.L << 1;
            Cpu.L = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x16: {
            // "RL (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            let shiftedValue = value << 1;
            shiftedValue = setBitValue(shiftedValue, 0, getCarryFlag());
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 16;
        }
        case 0x17: {
            // "RL A"
            const eighthBit = getBitValue(Cpu.A, 7);
            const shiftedValue = Cpu.A << 1;
            Cpu.A = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            return 8;
        }
        case 0x18: {
            // "RR B"
            const firstBit = getBitValue(Cpu.B, 0);
            const shiftedValue = Cpu.B >> 1;
            Cpu.B = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x19: {
            // "RR C"
            const firstBit = getBitValue(Cpu.C, 0);
            const shiftedValue = Cpu.C >> 1;
            Cpu.C = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x1A: {
            // "RR D"
            const firstBit = getBitValue(Cpu.D, 0);
            const shiftedValue = Cpu.D >> 1;
            Cpu.D = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x1B: {
            // "RR E"
            const firstBit = getBitValue(Cpu.E, 0);
            const shiftedValue = Cpu.E >> 1;
            Cpu.E = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x1C: {
            // "RR H"
            const firstBit = getBitValue(Cpu.H, 0);
            const shiftedValue = Cpu.H >> 1;
            Cpu.H = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x1D: {
            // "RR L"
            const firstBit = getBitValue(Cpu.L, 0);
            const shiftedValue = Cpu.L >> 1;
            Cpu.L = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x1E: {
            // "RR (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const firstBit = getBitValue(value, 0);
            let shiftedValue = value >> 1;
            shiftedValue = setBitValue(shiftedValue, 7, getCarryFlag());
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 16;
        }
        case 0x1F: {
            // "RR A"
            const firstBit = getBitValue(Cpu.A, 0);
            const shiftedValue = Cpu.A >> 1;
            Cpu.A = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            return 8;
        }
        case 0x20: {
            // "SLA B"
            const eighthBit = getBitValue(Cpu.B, 7);
            const result = Cpu.B << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.B = result;
            return 8;
        }
        case 0x21: {
            // "SLA C"
            const eighthBit = getBitValue(Cpu.C, 7);
            const result = Cpu.C << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.C = result;
            return 8;
        }
        case 0x22: {
            // "SLA D"
            const eighthBit = getBitValue(Cpu.D, 7);
            const result = Cpu.D << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.D = result;
            return 8;
        }
        case 0x23: {
            // "SLA E"
            const eighthBit = getBitValue(Cpu.E, 7);
            const result = Cpu.E << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.E = result;
            return 8;
        }
        case 0x24: {
            // "SLA H"
            const eighthBit = getBitValue(Cpu.H, 7);
            const result = Cpu.H << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.H = result;
            return 8;
        }
        case 0x25: {
            // "SLA L"
            const eighthBit = getBitValue(Cpu.L, 7);
            const result = Cpu.L << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.L = result;
            return 8;
        }
        case 0x26: {
            // "SLA (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            const result = value << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            writeByte(hl, result);
            return 16;
        }
        case 0x27: {
            // "SLA A"
            const eighthBit = getBitValue(Cpu.A, 7);
            const result = Cpu.A << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.A = result;
            return 8;
        }
        case 0x28: {
            // "SRA B"
            const eighthBit = getBitValue(Cpu.B, 7);
            const firstBit = getBitValue(Cpu.B, 0);
            let result = Cpu.B >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.B = result;
            return 8;
        }
        case 0x29: {
            // "SRA C"
            const eighthBit = getBitValue(Cpu.C, 7);
            const firstBit = getBitValue(Cpu.C, 0);
            let result = Cpu.C >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.C = result;
            return 8;
        }
        case 0x2A: {
            // "SRA D"
            const eighthBit = getBitValue(Cpu.D, 7);
            const firstBit = getBitValue(Cpu.D, 0);
            let result = Cpu.D >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.D = result;
            return 8;
        }
        case 0x2B: {
            // "SRA E"
            const eighthBit = getBitValue(Cpu.E, 7);
            const firstBit = getBitValue(Cpu.E, 0);
            let result = Cpu.E >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.E = result;
            return 8;
        }
        case 0x2C: {
            // "SRA H"
            const eighthBit = getBitValue(Cpu.H, 7);
            const firstBit = getBitValue(Cpu.H, 0);
            let result = Cpu.H >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.H = result;
            return 8;
        }
        case 0x2D: {
            // "SRA L"
            const eighthBit = getBitValue(Cpu.L, 7);
            const firstBit = getBitValue(Cpu.L, 0);
            let result = Cpu.L >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.L = result;
            return 8;
        }
        case 0x2E: {
            // "SRA (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            const firstBit = getBitValue(value, 0);
            let result = value >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            writeByte(hl, result);
            return 16;
        }
        case 0x2F: {
            // "SRA A"
            const eighthBit = getBitValue(Cpu.A, 7);
            const firstBit = getBitValue(Cpu.A, 0);
            let result = Cpu.A >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.A = result;
            return 8;
        }
        case 0x30: {
            // "SWAP B"
            const lowNibble = getLowNibble(Cpu.B);
            const highNibble = getHighNibble(Cpu.B);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.B = swapped;
            return 8;
        }
        case 0x31: {
            // "SWAP C"
            const lowNibble = getLowNibble(Cpu.C);
            const highNibble = getHighNibble(Cpu.C);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.C = swapped;
            return 8;
        }
        case 0x32: {
            // "SWAP D"
            const lowNibble = getLowNibble(Cpu.D);
            const highNibble = getHighNibble(Cpu.D);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.D = swapped;
            return 8;
        }
        case 0x33: {
            // "SWAP E"
            const lowNibble = getLowNibble(Cpu.E);
            const highNibble = getHighNibble(Cpu.E);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.E = swapped;
            return 8;
        }
        case 0x34: {
            // "SWAP H"
            const lowNibble = getLowNibble(Cpu.H);
            const highNibble = getHighNibble(Cpu.H);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.H = swapped;
            return 8;
        }
        case 0x35: {
            // "SWAP L"
            const lowNibble = getLowNibble(Cpu.L);
            const highNibble = getHighNibble(Cpu.L);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.L = swapped;
            return 8;
        }
        case 0x36: {
            // "SWAP (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const lowNibble = getLowNibble(value);
            const highNibble = getHighNibble(value);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            writeByte(hl, swapped);
            return 16;
        }
        case 0x37: {
            // "SWAP A"
            const lowNibble = getLowNibble(Cpu.A);
            const highNibble = getHighNibble(Cpu.A);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.A = swapped;
            return 8;
        }
        case 0x38: {
            // "SRL B"
            const firstBit = getBitValue(Cpu.B, 0);
            const result = Cpu.B >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.B = result;
            return 8;
        }
        case 0x39: {
            // "SRL C"
            const firstBit = getBitValue(Cpu.C, 0);
            const result = Cpu.C >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.C = result;
            return 8;
        }
        case 0x3A: {
            // "SRL D"
            const firstBit = getBitValue(Cpu.D, 0);
            const result = Cpu.D >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.D = result;
            return 8;
        }
        case 0x3B: {
            // "SRL E"
            const firstBit = getBitValue(Cpu.E, 0);
            const result = Cpu.E >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.E = result;
            return 8;
        }
        case 0x3C: {
            // "SRL H"
            const firstBit = getBitValue(Cpu.H, 0);
            const result = Cpu.H >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.H = result;
            return 8;
        }
        case 0x3D: {
            // "SRL L"
            const firstBit = getBitValue(Cpu.L, 0);
            const result = Cpu.L >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.L = result;
            return 8;
        }
        case 0x3E: {
            // "SRL (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const firstBit = getBitValue(value, 0);
            const result = value >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            writeByte(hl, result);
            return 16;
        }
        case 0x3F: {
            // "SRL A"
            const firstBit = getBitValue(Cpu.A, 0);
            const result = Cpu.A >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.A = result;
            return 8;
        }
        case 0x40: {
            // "BIT 0, B"
            const bit = getBitValue(Cpu.B, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x41: {
            // "BIT 0, C"
            const bit = getBitValue(Cpu.C, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x42: {
            // "BIT 0, D"
            const bit = getBitValue(Cpu.D, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x43: {
            // "BIT 0, E"
            const bit = getBitValue(Cpu.E, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x44: {
            // "BIT 0, H"
            const bit = getBitValue(Cpu.H, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x45: {
            // "BIT 0, L"
            const bit = getBitValue(Cpu.L, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x46: {
            // "BIT 0, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x47: {
            // "BIT 0, A"
            const bit = getBitValue(Cpu.A, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x48: {
            // "BIT 1, B"
            const bit = getBitValue(Cpu.B, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x49: {
            // "BIT 1, C"
            const bit = getBitValue(Cpu.C, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x4A: {
            // "BIT 1, D"
            const bit = getBitValue(Cpu.D, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x4B: {
            // "BIT 1, E"
            const bit = getBitValue(Cpu.E, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x4C: {
            // "BIT 1, H"
            const bit = getBitValue(Cpu.H, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x4D: {
            // "BIT 1, L"
            const bit = getBitValue(Cpu.L, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x4E: {
            // "BIT 1, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x4F: {
            // "BIT 1, A"
            const bit = getBitValue(Cpu.A, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x50: {
            // "BIT 2, B"
            const bit = getBitValue(Cpu.B, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x51: {
            // "BIT 2, C"
            const bit = getBitValue(Cpu.C, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x52: {
            // "BIT 2, D"
            const bit = getBitValue(Cpu.D, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x53: {
            // "BIT 2, E"
            const bit = getBitValue(Cpu.E, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x54: {
            // "BIT 2, H"
            const bit = getBitValue(Cpu.H, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x55: {
            // "BIT 2, L"
            const bit = getBitValue(Cpu.L, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x56: {
            // "BIT 2, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x57: {
            // "BIT 2, A"
            const bit = getBitValue(Cpu.A, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x58: {
            // "BIT 3, B"
            const bit = getBitValue(Cpu.B, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x59: {
            // "BIT 3, C"
            const bit = getBitValue(Cpu.C, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x5A: {
            // "BIT 3, D"
            const bit = getBitValue(Cpu.D, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x5B: {
            // "BIT 3, E"
            const bit = getBitValue(Cpu.E, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x5C: {
            // "BIT 3, H"
            const bit = getBitValue(Cpu.H, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x5D: {
            // "BIT 3, L"
            const bit = getBitValue(Cpu.L, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x5E: {
            // "BIT 3, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x5F: {
            // "BIT 3, A"
            const bit = getBitValue(Cpu.A, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x60: {
            // "BIT 4, B"
            const bit = getBitValue(Cpu.B, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x61: {
            // "BIT 4, C"
            const bit = getBitValue(Cpu.C, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x62: {
            // "BIT 4, D"
            const bit = getBitValue(Cpu.D, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x63: {
            // "BIT 4, E"
            const bit = getBitValue(Cpu.E, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x64: {
            // "BIT 4, H"
            const bit = getBitValue(Cpu.H, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x65: {
            // "BIT 4, L"
            const bit = getBitValue(Cpu.L, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x66: {
            // "BIT 4, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x67: {
            // "BIT 4, A"
            const bit = getBitValue(Cpu.A, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x68: {
            // "BIT 5, B"
            const bit = getBitValue(Cpu.B, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x69: {
            // "BIT 5, C"
            const bit = getBitValue(Cpu.C, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x6A: {
            // "BIT 5, D"
            const bit = getBitValue(Cpu.D, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x6B: {
            // "BIT 5, E"
            const bit = getBitValue(Cpu.E, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x6C: {
            // "BIT 5, H"
            const bit = getBitValue(Cpu.H, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x6D: {
            // "BIT 5, L"
            const bit = getBitValue(Cpu.L, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x6E: {
            // "BIT 5, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x6F: {
            // "BIT 5, A"
            const bit = getBitValue(Cpu.A, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x70: {
            // "BIT 6, B"
            const bit = getBitValue(Cpu.B, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x71: {
            // "BIT 6, C"
            const bit = getBitValue(Cpu.C, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x72: {
            // "BIT 6, D"
            const bit = getBitValue(Cpu.D, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x73: {
            // "BIT 6, E"
            const bit = getBitValue(Cpu.E, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x74: {
            // "BIT 6, H"
            const bit = getBitValue(Cpu.H, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x75: {
            // "BIT 6, L"
            const bit = getBitValue(Cpu.L, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x76: {
            // "BIT 6, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x77: {
            // "BIT 6, A"
            const bit = getBitValue(Cpu.A, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x78: {
            // "BIT 7, B"
            const bit = getBitValue(Cpu.B, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x79: {
            // "BIT 7, C"
            const bit = getBitValue(Cpu.C, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x7A: {
            // "BIT 7, D"
            const bit = getBitValue(Cpu.D, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x7B: {
            // "BIT 7, E"
            const bit = getBitValue(Cpu.E, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x7C: {
            // "BIT 7, H"
            const bit = getBitValue(Cpu.H, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x7D: {
            // "BIT 7, L"
            const bit = getBitValue(Cpu.L, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x7E: {
            // "BIT 7, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 12;
        }
        case 0x7F: {
            // "BIT 7, A"
            const bit = getBitValue(Cpu.A, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit ? 0 : 1);
            return 8;
        }
        case 0x80: {
            // "RES 0, B"
            Cpu.B = setBitValue(Cpu.B, 0, 0);
            return 8;
        }
        case 0x81: {
            // "RES 0, C"
            Cpu.C = setBitValue(Cpu.C, 0, 0);
            return 8;
        }
        case 0x82: {
            // "RES 0, D"
            Cpu.D = setBitValue(Cpu.D, 0, 0);
            return 8;
        }
        case 0x83: {
            // "RES 0, E"
            Cpu.E = setBitValue(Cpu.E, 0, 0);
            return 8;
        }
        case 0x84: {
            // "RES 0, H"
            Cpu.H = setBitValue(Cpu.H, 0, 0);
            return 8;
        }
        case 0x85: {
            // "RES 0, L"
            Cpu.L = setBitValue(Cpu.L, 0, 0);
            return 8;
        }
        case 0x86: {
            // "RES 0, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 0, 0));
            return 16;
        }
        case 0x87: {
            // "RES 0, A"
            Cpu.A = setBitValue(Cpu.A, 0, 0);
            return 8;
        }
        case 0x88: {
            // "RES 1, B"
            Cpu.B = setBitValue(Cpu.B, 1, 0);
            return 8;
        }
        case 0x89: {
            // "RES 1, C"
            Cpu.C = setBitValue(Cpu.C, 1, 0);
            return 8;
        }
        case 0x8A: {
            // "RES 1, D"
            Cpu.D = setBitValue(Cpu.D, 1, 0);
            return 8;
        }
        case 0x8B: {
            // "RES 1, E"
            Cpu.E = setBitValue(Cpu.E, 1, 0);
            return 8;
        }
        case 0x8C: {
            // "RES 1, H"
            Cpu.H = setBitValue(Cpu.H, 1, 0);
            return 8;
        }
        case 0x8D: {
            // "RES 1, L"
            Cpu.L = setBitValue(Cpu.L, 1, 0);
            return 8;
        }
        case 0x8E: {
            // "RES 1, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 1, 0));
            return 16;
        }
        case 0x8F: {
            // "RES 1, A"
            Cpu.A = setBitValue(Cpu.A, 1, 0);
            return 8;
        }
        case 0x90: {
            // "RES 2, B"
            Cpu.B = setBitValue(Cpu.B, 2, 0);
            return 8;
        }
        case 0x91: {
            // "RES 2, C"
            Cpu.C = setBitValue(Cpu.C, 2, 0);
            return 8;
        }
        case 0x92: {
            // "RES 2, D"
            Cpu.D = setBitValue(Cpu.D, 2, 0);
            return 8;
        }
        case 0x93: {
            // "RES 2, E"
            Cpu.E = setBitValue(Cpu.E, 2, 0);
            return 8;
        }
        case 0x94: {
            // "RES 2, H"
            Cpu.H = setBitValue(Cpu.H, 2, 0);
            return 8;
        }
        case 0x95: {
            // "RES 2, L"
            Cpu.L = setBitValue(Cpu.L, 2, 0);
            return 8;
        }
        case 0x96: {
            // "RES 2, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 2, 0));
            return 16;
        }
        case 0x97: {
            // "RES 2, A"
            Cpu.A = setBitValue(Cpu.A, 2, 0);
            return 8;
        }
        case 0x98: {
            // "RES 3, B"
            Cpu.B = setBitValue(Cpu.B, 3, 0);
            return 8;
        }
        case 0x99: {
            // "RES 3, C"
            Cpu.C = setBitValue(Cpu.C, 3, 0);
            return 8;
        }
        case 0x9A: {
            // "RES 3, D"
            Cpu.D = setBitValue(Cpu.D, 3, 0);
            return 8;
        }
        case 0x9B: {
            // "RES 3, E"
            Cpu.E = setBitValue(Cpu.E, 3, 0);
            return 8;
        }
        case 0x9C: {
            // "RES 3, H"
            Cpu.H = setBitValue(Cpu.H, 3, 0);
            return 8;
        }
        case 0x9D: {
            // "RES 3, L"
            Cpu.L = setBitValue(Cpu.L, 3, 0);
            return 8;
        }
        case 0x9E: {
            // "RES 3, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 3, 0));
            return 16;
        }
        case 0x9F: {
            // "RES 3, A"
            Cpu.A = setBitValue(Cpu.A, 3, 0);
            return 8;
        }
        case 0xA0: {
            // "RES 4, B"
            Cpu.B = setBitValue(Cpu.B, 4, 0);
            return 8;
        }
        case 0xA1: {
            // "RES 4, C"
            Cpu.C = setBitValue(Cpu.C, 4, 0);
            return 8;
        }
        case 0xA2: {
            // "RES 4, D"
            Cpu.D = setBitValue(Cpu.D, 4, 0);
            return 8;
        }
        case 0xA3: {
            // "RES 4, E"
            Cpu.E = setBitValue(Cpu.E, 4, 0);
            return 8;
        }
        case 0xA4: {
            // "RES 4, H"
            Cpu.H = setBitValue(Cpu.H, 4, 0);
            return 8;
        }
        case 0xA5: {
            // "RES 4, L"
            Cpu.L = setBitValue(Cpu.L, 4, 0);
            return 8;
        }
        case 0xA6: {
            // "RES 4, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 4, 0));
            return 16;
        }
        case 0xA7: {
            // "RES 4, A"
            Cpu.A = setBitValue(Cpu.A, 4, 0);
            return 8;
        }
        case 0xA8: {
            // "RES 5, B"
            Cpu.B = setBitValue(Cpu.B, 5, 0);
            return 8;
        }
        case 0xA9: {
            // "RES 5, C"
            Cpu.C = setBitValue(Cpu.C, 5, 0);
            return 8;
        }
        case 0xAA: {
            // "RES 5, D"
            Cpu.D = setBitValue(Cpu.D, 5, 0);
            return 8;
        }
        case 0xAB: {
            // "RES 5, E"
            Cpu.E = setBitValue(Cpu.E, 5, 0);
            return 8;
        }
        case 0xAC: {
            // "RES 5, H"
            Cpu.H = setBitValue(Cpu.H, 5, 0);
            return 8;
        }
        case 0xAD: {
            // "RES 5, L"
            Cpu.L = setBitValue(Cpu.L, 5, 0);
            return 8;
        }
        case 0xAE: {
            // "RES 5, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 5, 0));
            return 16;
        }
        case 0xAF: {
            // "RES 5, A"
            Cpu.A = setBitValue(Cpu.A, 5, 0);
            return 8;
        }
        case 0xB0: {
            // "RES 6, B"
            Cpu.B = setBitValue(Cpu.B, 6, 0);
            return 8;
        }
        case 0xB1: {
            // "RES 6, C"
            Cpu.C = setBitValue(Cpu.C, 6, 0);
            return 8;
        }
        case 0xB2: {
            // "RES 6, D"
            Cpu.D = setBitValue(Cpu.D, 6, 0);
            return 8;
        }
        case 0xB3: {
            // "RES 6, E"
            Cpu.E = setBitValue(Cpu.E, 6, 0);
            return 8;
        }
        case 0xB4: {
            // "RES 6, H"
            Cpu.H = setBitValue(Cpu.H, 6, 0);
            return 8;
        }
        case 0xB5: {
            // "RES 6, L"
            Cpu.L = setBitValue(Cpu.L, 6, 0);
            return 8;
        }
        case 0xB6: {
            // "RES 6, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 6, 0));
            return 16;
        }
        case 0xB7: {
            // "RES 6, A"
            Cpu.A = setBitValue(Cpu.A, 6, 0);
            return 8;
        }
        case 0xB8: {
            // "RES 7, B"
            Cpu.B = setBitValue(Cpu.B, 7, 0);
            return 8;
        }
        case 0xB9: {
            // "RES 7, C"
            Cpu.C = setBitValue(Cpu.C, 7, 0);
            return 8;
        }
        case 0xBA: {
            // "RES 7, D"
            Cpu.D = setBitValue(Cpu.D, 7, 0);
            return 8;
        }
        case 0xBB: {
            // "RES 7, E"
            Cpu.E = setBitValue(Cpu.E, 7, 0);
            return 8;
        }
        case 0xBC: {
            // "RES 7, H"
            Cpu.H = setBitValue(Cpu.H, 7, 0);
            return 8;
        }
        case 0xBD: {
            // "RES 7, L"
            Cpu.L = setBitValue(Cpu.L, 7, 0);
            return 8;
        }
        case 0xBE: {
            // "RES 7, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 7, 0));
            return 16;
        }
        case 0xBF: {
            // "RES 7, A"
            Cpu.A = setBitValue(Cpu.A, 7, 0);
            return 8;
        }
        case 0xC0: {
            // "SET 0, B"
            Cpu.B = setBitValue(Cpu.B, 0, 1);
            return 8;
        }
        case 0xC1: {
            // "SET 0, C"
            Cpu.C = setBitValue(Cpu.C, 0, 1);
            return 8;
        }
        case 0xC2: {
            // "SET 0, D"
            Cpu.D = setBitValue(Cpu.D, 0, 1);
            return 8;
        }
        case 0xC3: {
            // "SET 0, E"
            Cpu.E = setBitValue(Cpu.E, 0, 1);
            return 8;
        }
        case 0xC4: {
            // "SET 0, H"
            Cpu.H = setBitValue(Cpu.H, 0, 1);
            return 8;
        }
        case 0xC5: {
            // "SET 0, L"
            Cpu.L = setBitValue(Cpu.L, 0, 1);
            return 8;
        }
        case 0xC6: {
            // "SET 0, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 0, 1));
            return 16;
        }
        case 0xC7: {
            // "SET 0, A"
            Cpu.A = setBitValue(Cpu.A, 0, 1);
            return 8;
        }
        case 0xC8: {
            // "SET 1, B"
            Cpu.B = setBitValue(Cpu.B, 1, 1);
            return 8;
        }
        case 0xC9: {
            // "SET 1, C"
            Cpu.C = setBitValue(Cpu.C, 1, 1);
            return 8;
        }
        case 0xCA: {
            // "SET 1, D"
            Cpu.D = setBitValue(Cpu.D, 1, 1);
            return 8;
        }
        case 0xCB: {
            // "SET 1, E"
            Cpu.E = setBitValue(Cpu.E, 1, 1);
            return 8;
        }
        case 0xCC: {
            // "SET 1, H"
            Cpu.H = setBitValue(Cpu.H, 1, 1);
            return 8;
        }
        case 0xCD: {
            // "SET 1, L"
            Cpu.L = setBitValue(Cpu.L, 1, 1);
            return 8;
        }
        case 0xCE: {
            // "SET 1, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 1, 1));
            return 16;
        }
        case 0xCF: {
            // "SET 1, A"
            Cpu.A = setBitValue(Cpu.A, 1, 1);
            return 8;
        }
        case 0xD0: {
            // "SET 2, B"
            Cpu.B = setBitValue(Cpu.B, 2, 1);
            return 8;
        }
        case 0xD1: {
            // "SET 2, C"
            Cpu.C = setBitValue(Cpu.C, 2, 1);
            return 8;
        }
        case 0xD2: {
            // "SET 2, D"
            Cpu.D = setBitValue(Cpu.D, 2, 1);
            return 8;
        }
        case 0xD3: {
            // "SET 2, E"
            Cpu.E = setBitValue(Cpu.E, 2, 1);
            return 8;
        }
        case 0xD4: {
            // "SET 2, H"
            Cpu.H = setBitValue(Cpu.H, 2, 1);
            return 8;
        }
        case 0xD5: {
            // "SET 2, L"
            Cpu.L = setBitValue(Cpu.L, 2, 1);
            return 8;
        }
        case 0xD6: {
            // "SET 2, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 2, 1));
            return 16;
        }
        case 0xD7: {
            // "SET 2, A"
            Cpu.A = setBitValue(Cpu.A, 2, 1);
            return 8;
        }
        case 0xD8: {
            // "SET 3, B"
            Cpu.B = setBitValue(Cpu.B, 3, 1);
            return 8;
        }
        case 0xD9: {
            // "SET 3, C"
            Cpu.C = setBitValue(Cpu.C, 3, 1);
            return 8;
        }
        case 0xDA: {
            // "SET 3, D"
            Cpu.D = setBitValue(Cpu.D, 3, 1);
            return 8;
        }
        case 0xDB: {
            // "SET 3, E"
            Cpu.E = setBitValue(Cpu.E, 3, 1);
            return 8;
        }
        case 0xDC: {
            // "SET 3, H"
            Cpu.H = setBitValue(Cpu.H, 3, 1);
            return 8;
        }
        case 0xDD: {
            // "SET 3, L"
            Cpu.L = setBitValue(Cpu.L, 3, 1);
            return 8;
        }
        case 0xDE: {
            // "SET 3, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 3, 1));
            return 16;
        }
        case 0xDF: {
            // "SET 3, A"
            Cpu.A = setBitValue(Cpu.A, 3, 1);
            return 8;
        }
        case 0xE0: {
            // "SET 4, B"
            Cpu.B = setBitValue(Cpu.B, 4, 1);
            return 8;
        }
        case 0xE1: {
            // "SET 4, C"
            Cpu.C = setBitValue(Cpu.C, 4, 1);
            return 8;
        }
        case 0xE2: {
            // "SET 4, D"
            Cpu.D = setBitValue(Cpu.D, 4, 1);
            return 8;
        }
        case 0xE3: {
            // "SET 4, E"
            Cpu.E = setBitValue(Cpu.E, 4, 1);
            return 8;
        }
        case 0xE4: {
            // "SET 4, H"
            Cpu.H = setBitValue(Cpu.H, 4, 1);
            return 8;
        }
        case 0xE5: {
            // "SET 4, L"
            Cpu.L = setBitValue(Cpu.L, 4, 1);
            return 8;
        }
        case 0xE6: {
            // "SET 4, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 4, 1));
            return 16;
        }
        case 0xE7: {
            // "SET 4, A"
            Cpu.A = setBitValue(Cpu.A, 4, 1);
            return 8;
        }
        case 0xE8: {
            // "SET 5, B"
            Cpu.B = setBitValue(Cpu.B, 5, 1);
            return 8;
        }
        case 0xE9: {
            // "SET 5, C"
            Cpu.C = setBitValue(Cpu.C, 5, 1);
            return 8;
        }
        case 0xEA: {
            // "SET 5, D"
            Cpu.D = setBitValue(Cpu.D, 5, 1);
            return 8;
        }
        case 0xEB: {
            // "SET 5, E"
            Cpu.E = setBitValue(Cpu.E, 5, 1);
            return 8;
        }
        case 0xEC: {
            // "SET 5, H"
            Cpu.H = setBitValue(Cpu.H, 5, 1);
            return 8;
        }
        case 0xED: {
            // "SET 5, L"
            Cpu.L = setBitValue(Cpu.L, 5, 1);
            return 8;
        }
        case 0xEE: {
            // "SET 5, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 5, 1));
            return 16;
        }
        case 0xEF: {
            // "SET 5, A"
            Cpu.A = setBitValue(Cpu.A, 5, 1);
            return 8;
        }
        case 0xF0: {
            // "SET 6, B"
            Cpu.B = setBitValue(Cpu.B, 6, 1);
            return 8;
        }
        case 0xF1: {
            // "SET 6, C"
            Cpu.C = setBitValue(Cpu.C, 6, 1);
            return 8;
        }
        case 0xF2: {
            // "SET 6, D"
            Cpu.D = setBitValue(Cpu.D, 6, 1);
            return 8;
        }
        case 0xF3: {
            // "SET 6, E"
            Cpu.E = setBitValue(Cpu.E, 6, 1);
            return 8;
        }
        case 0xF4: {
            // "SET 6, H"
            Cpu.H = setBitValue(Cpu.H, 6, 1);
            return 8;
        }
        case 0xF5: {
            // "SET 6, L"
            Cpu.L = setBitValue(Cpu.L, 6, 1);
            return 8;
        }
        case 0xF6: {
            // "SET 6, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 6, 1));
            return 16;
        }
        case 0xF7: {
            // "SET 6, A"
            Cpu.A = setBitValue(Cpu.A, 6, 1);
            return 8;
        }
        case 0xF8: {
            // "SET 7, B"
            Cpu.B = setBitValue(Cpu.B, 7, 1);
            return 8;
        }
        case 0xF9: {
            // "SET 7, C"
            Cpu.C = setBitValue(Cpu.C, 7, 1);
            return 8;
        }
        case 0xFA: {
            // "SET 7, D"
            Cpu.D = setBitValue(Cpu.D, 7, 1);
            return 8;
        }
        case 0xFB: {
            // "SET 7, E"
            Cpu.E = setBitValue(Cpu.E, 7, 1);
            return 8;
        }
        case 0xFC: {
            // "SET 7, H"
            Cpu.H = setBitValue(Cpu.H, 7, 1);
            return 8;
        }
        case 0xFD: {
            // "SET 7, L"
            Cpu.L = setBitValue(Cpu.L, 7, 1);
            return 8;
        }
        case 0xFE: {
            // "SET 7, (HL)"
            const hl = Cpu.getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 7, 1));
            return 16;
        }
        case 0xFF: {
            // "SET 7, A"
            Cpu.A = setBitValue(Cpu.A, 7, 1);
            return 8;
        }
        default: {
            abort("Impossible opcode");
            return -1;
        }
    }
}