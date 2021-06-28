import { readByte, writeByte } from '../readWriteOperations';
import { Cpu, getHL, setZeroFlag, setHalfCarryFlag, setNegativeFlag, getCarryFlag, setCarryFlag } from './state';
import { getLowNibble, getBitValue, setBitValue, getHighNibble, combineNibbles } from '../helpers';

export function handleCBOpcode(opcode: u8): void {
    switch (opcode) {
        case 0x0: {
            trace("RLC B");
            const eighthBit = getBitValue(Cpu.B, 7);
            const shiftedValue = Cpu.B << 1;
            Cpu.B = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x1: {
            trace("RLC C");
            const eighthBit = getBitValue(Cpu.C, 7);
            const shiftedValue = Cpu.C << 1;
            Cpu.C = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x2: {
            trace("RLC D");
            const eighthBit = getBitValue(Cpu.D, 7);
            const shiftedValue = Cpu.D << 1;
            Cpu.D = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x3: {
            trace("RLC E");
            const eighthBit = getBitValue(Cpu.E, 7);
            const shiftedValue = Cpu.E << 1;
            Cpu.E = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x4: {
            trace("RLC H");
            const eighthBit = getBitValue(Cpu.H, 7);
            const shiftedValue = Cpu.H << 1;
            Cpu.H = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x5: {
            trace("RLC L");
            const eighthBit = getBitValue(Cpu.L, 7);
            const shiftedValue = Cpu.L << 1;
            Cpu.L = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x6: {
            trace("RLC (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            let shiftedValue = value << 1;
            shiftedValue = setBitValue(shiftedValue, 0, eighthBit);
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x7: {
            trace("RLC A");
            const eighthBit = getBitValue(Cpu.A, 7);
            const shiftedValue = Cpu.A << 1;
            Cpu.A = setBitValue(shiftedValue, 0, eighthBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x8: {
            trace("RRC B");
            const firstBit = getBitValue(Cpu.B, 0);
            const shiftedValue = Cpu.B >> 1;
            Cpu.B = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x9: {
            trace("RRC C");
            const firstBit = getBitValue(Cpu.C, 0);
            const shiftedValue = Cpu.C >> 1;
            Cpu.C = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0xA: {
            trace("RRC D");
            const firstBit = getBitValue(Cpu.D, 0);
            const shiftedValue = Cpu.D >> 1;
            Cpu.D = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0xB: {
            trace("RRC E");
            const firstBit = getBitValue(Cpu.E, 0);
            const shiftedValue = Cpu.E >> 1;
            Cpu.E = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0xC: {
            trace("RRC H");
            const firstBit = getBitValue(Cpu.H, 0);
            const shiftedValue = Cpu.H >> 1;
            Cpu.H = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0xD: {
            trace("RRC L");
            const firstBit = getBitValue(Cpu.L, 0);
            const shiftedValue = Cpu.L >> 1;
            Cpu.L = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0xE: {
            trace("RRC (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const firstBit = getBitValue(value, 0);
            let shiftedValue = value >> 1;
            shiftedValue = setBitValue(shiftedValue, 7, firstBit);
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0xF: {
            trace("RRC A");
            const firstBit = getBitValue(Cpu.A, 0);
            const shiftedValue = Cpu.A >> 1;
            Cpu.A = setBitValue(shiftedValue, 7, firstBit);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x10: {
            trace("RL B");
            const eighthBit = getBitValue(Cpu.B, 7);
            const shiftedValue = Cpu.B << 1;
            Cpu.B = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x11: {
            trace("RL C");
            const eighthBit = getBitValue(Cpu.C, 7);
            const shiftedValue = Cpu.C << 1;
            Cpu.C = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x12: {
            trace("RL D");
            const eighthBit = getBitValue(Cpu.D, 7);
            const shiftedValue = Cpu.D << 1;
            Cpu.D = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x13: {
            trace("RL E");
            const eighthBit = getBitValue(Cpu.E, 7);
            const shiftedValue = Cpu.E << 1;
            Cpu.E = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x14: {
            trace("RL H");
            const eighthBit = getBitValue(Cpu.H, 7);
            const shiftedValue = Cpu.H << 1;
            Cpu.H = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;

        }
        case 0x15: {
            trace("RL L");
            const eighthBit = getBitValue(Cpu.L, 7);
            const shiftedValue = Cpu.L << 1;
            Cpu.L = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x16: {
            trace("RL (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            let shiftedValue = value << 1;
            shiftedValue = setBitValue(shiftedValue, 0, getCarryFlag());
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x17: {
            trace("RL A");
            const eighthBit = getBitValue(Cpu.A, 7);
            const shiftedValue = Cpu.A << 1;
            Cpu.A = setBitValue(shiftedValue, 0, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            break;
        }
        case 0x18: {
            trace("RR B");
            const firstBit = getBitValue(Cpu.B, 0);
            const shiftedValue = Cpu.B >> 1;
            Cpu.B = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.B > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x19: {
            trace("RR C");
            const firstBit = getBitValue(Cpu.C, 0);
            const shiftedValue = Cpu.C >> 1;
            Cpu.C = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.C > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x1A: {
            trace("RR D");
            const firstBit = getBitValue(Cpu.D, 0);
            const shiftedValue = Cpu.D >> 1;
            Cpu.D = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.D > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x1B: {
            trace("RR E");
            const firstBit = getBitValue(Cpu.E, 0);
            const shiftedValue = Cpu.E >> 1;
            Cpu.E = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.E > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x1C: {
            trace("RR H");
            const firstBit = getBitValue(Cpu.H, 0);
            const shiftedValue = Cpu.H >> 1;
            Cpu.H = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.H > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x1D: {
            trace("RR L");
            const firstBit = getBitValue(Cpu.L, 0);
            const shiftedValue = Cpu.L >> 1;
            Cpu.L = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.L > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x1E: {
            trace("RR (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const firstBit = getBitValue(value, 0);
            let shiftedValue = value >> 1;
            shiftedValue = setBitValue(shiftedValue, 7, getCarryFlag());
            writeByte(hl, shiftedValue);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(shiftedValue > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x1F: {
            trace("RR A");
            const firstBit = getBitValue(Cpu.A, 0);
            const shiftedValue = Cpu.A >> 1;
            Cpu.A = setBitValue(shiftedValue, 7, getCarryFlag());
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(Cpu.A > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            break;
        }
        case 0x20: {
            trace("SLA B");
            const eighthBit = getBitValue(Cpu.B, 7);
            const result = Cpu.B << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.B = result;
            break;
        }
        case 0x21: {
            trace("SLA C");
            const eighthBit = getBitValue(Cpu.C, 7);
            const result = Cpu.C << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.C = result;
            break;
        }
        case 0x22: {
            trace("SLA D");
            const eighthBit = getBitValue(Cpu.D, 7);
            const result = Cpu.D << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.D = result;
            break;
        }
        case 0x23: {
            trace("SLA E");
            const eighthBit = getBitValue(Cpu.E, 7);
            const result = Cpu.E << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.E = result;
            break;
        }
        case 0x24: {
            trace("SLA H");
            const eighthBit = getBitValue(Cpu.H, 7);
            const result = Cpu.H << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.H = result;
            break;
        }
        case 0x25: {
            trace("SLA L");
            const eighthBit = getBitValue(Cpu.L, 7);
            const result = Cpu.L << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.L = result;
            break;
        }
        case 0x26: {
            trace("SLA (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            const result = value << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            writeByte(hl, result);
            break;
        }
        case 0x27: {
            trace("SLA A");
            const eighthBit = getBitValue(Cpu.A, 7);
            const result = Cpu.A << 1;
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(eighthBit);
            Cpu.A = result;
            break;
        }
        case 0x28: {
            trace("SRA B");
            const eighthBit = getBitValue(Cpu.B, 7);
            const firstBit = getBitValue(Cpu.B, 0);
            let result = Cpu.B >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.B = result;
            break;
        }
        case 0x29: {
            trace("SRA C");
            const eighthBit = getBitValue(Cpu.C, 7);
            const firstBit = getBitValue(Cpu.C, 0);
            let result = Cpu.C >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.C = result;
            break;
        }
        case 0x2A: {
            trace("SRA D");
            const eighthBit = getBitValue(Cpu.D, 7);
            const firstBit = getBitValue(Cpu.D, 0);
            let result = Cpu.D >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.D = result;
            break;
        }
        case 0x2B: {
            trace("SRA E");
            const eighthBit = getBitValue(Cpu.E, 7);
            const firstBit = getBitValue(Cpu.E, 0);
            let result = Cpu.E >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.E = result;
            break;
        }
        case 0x2C: {
            trace("SRA H");
            const eighthBit = getBitValue(Cpu.H, 7);
            const firstBit = getBitValue(Cpu.H, 0);
            let result = Cpu.H >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.H = result;
            break;
        }
        case 0x2D: {
            trace("SRA L");
            const eighthBit = getBitValue(Cpu.L, 7);
            const firstBit = getBitValue(Cpu.L, 0);
            let result = Cpu.L >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.L = result;
            break;
        }
        case 0x2E: {
            trace("SRA (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const eighthBit = getBitValue(value, 7);
            const firstBit = getBitValue(value, 0);
            let result = value >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            writeByte(hl, value);
            break;
        }
        case 0x2F: {
            trace("SRA A");
            const eighthBit = getBitValue(Cpu.A, 7);
            const firstBit = getBitValue(Cpu.A, 0);
            let result = Cpu.A >> 1;
            result = setBitValue(result, 7, eighthBit);
            setHalfCarryFlag(0);
            setNegativeFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.A = result;
            break;
        }
        case 0x30: {
            trace("SWAP B");
            const lowNibble = getLowNibble(Cpu.B);
            const highNibble = getHighNibble(Cpu.B);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.B = swapped;
            break;
        }
        case 0x31: {
            trace("SWAP C");
            const lowNibble = getLowNibble(Cpu.C);
            const highNibble = getHighNibble(Cpu.C);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.C = swapped;
            break;
        }
        case 0x32: {
            trace("SWAP D");
            const lowNibble = getLowNibble(Cpu.D);
            const highNibble = getHighNibble(Cpu.D);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.D = swapped;
            break;
        }
        case 0x33: {
            trace("SWAP E");
            const lowNibble = getLowNibble(Cpu.E);
            const highNibble = getHighNibble(Cpu.E);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.E = swapped;
            break;
        }
        case 0x34: {
            trace("SWAP H");
            const lowNibble = getLowNibble(Cpu.H);
            const highNibble = getHighNibble(Cpu.H);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.H = swapped;
            break;
        }
        case 0x35: {
            trace("SWAP L");
            const lowNibble = getLowNibble(Cpu.L);
            const highNibble = getHighNibble(Cpu.L);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.L = swapped;
            break;
        }
        case 0x36: {
            trace("SWAP (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const lowNibble = getLowNibble(value);
            const highNibble = getHighNibble(value);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            writeByte(hl, swapped);
            break;
        }
        case 0x37: {
            trace("SWAP A");
            const lowNibble = getLowNibble(Cpu.A);
            const highNibble = getHighNibble(Cpu.A);
            const swapped = combineNibbles(lowNibble, highNibble);
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setCarryFlag(0);
            setZeroFlag(swapped > 0 ? 0 : 1);
            Cpu.A = swapped;
            break;
        }
        case 0x38: {
            trace("SRL B");
            const firstBit = getBitValue(Cpu.B, 0);
            const result = Cpu.B >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.B = result;
            break;
        }
        case 0x39: {
            trace("SRL C");
            const firstBit = getBitValue(Cpu.C, 0);
            const result = Cpu.C >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.C = result;
            break;
        }
        case 0x3A: {
            trace("SRL D");
            const firstBit = getBitValue(Cpu.D, 0);
            const result = Cpu.D >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.D = result;
            break;
        }
        case 0x3B: {
            trace("SRL E");
            const firstBit = getBitValue(Cpu.E, 0);
            const result = Cpu.E >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.E = result;
            break;
        }
        case 0x3C: {
            trace("SRL H");
            const firstBit = getBitValue(Cpu.H, 0);
            const result = Cpu.H >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.H = result;
            break;
        }
        case 0x3D: {
            trace("SRL L");
            const firstBit = getBitValue(Cpu.L, 0);
            const result = Cpu.L >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.L = result;
            break;
        }
        case 0x3E: {
            trace("SRL (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const firstBit = getBitValue(value, 0);
            const result = value >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            writeByte(hl, value);
            break;
        }
        case 0x3F: {
            trace("SRL A");
            const firstBit = getBitValue(Cpu.A, 0);
            const result = Cpu.A >> 1;
            setNegativeFlag(0);
            setHalfCarryFlag(0);
            setZeroFlag(result > 0 ? 0 : 1);
            setCarryFlag(firstBit);
            Cpu.A = result;
            break;
        }
        case 0x40: {
            trace("BIT 0, B");
            const bit = getBitValue(Cpu.B, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x41: {
            trace("BIT 0, C");
            const bit = getBitValue(Cpu.C, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x42: {
            trace("BIT 0, D");
            const bit = getBitValue(Cpu.D, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x43: {
            trace("BIT 0, E");
            const bit = getBitValue(Cpu.E, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x44: {
            trace("BIT 0, H");
            const bit = getBitValue(Cpu.H, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x45: {
            trace("BIT 0, L");
            const bit = getBitValue(Cpu.L, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x46: {
            trace("BIT 0, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x47: {
            trace("BIT 0, A");
            const bit = getBitValue(Cpu.A, 0);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x48: {
            trace("BIT 1, B");
            const bit = getBitValue(Cpu.B, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x49: {
            trace("BIT 1, C");
            const bit = getBitValue(Cpu.C, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x4A: {
            trace("BIT 1, D");
            const bit = getBitValue(Cpu.D, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x4B: {
            trace("BIT 1, E");
            const bit = getBitValue(Cpu.E, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x4C: {
            trace("BIT 1, H");
            const bit = getBitValue(Cpu.H, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x4D: {
            trace("BIT 1, L");
            const bit = getBitValue(Cpu.L, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x4E: {
            trace("BIT 1, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x4F: {
            trace("BIT 1, A");
            const bit = getBitValue(Cpu.A, 1);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x50: {
            trace("BIT 2, B");
            const bit = getBitValue(Cpu.B, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x51: {
            trace("BIT 2, C");
            const bit = getBitValue(Cpu.C, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x52: {
            trace("BIT 2, D");
            const bit = getBitValue(Cpu.D, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x53: {
            trace("BIT 2, E");
            const bit = getBitValue(Cpu.E, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x54: {
            trace("BIT 2, H");
            const bit = getBitValue(Cpu.H, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x55: {
            trace("BIT 2, L");
            const bit = getBitValue(Cpu.L, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x56: {
            trace("BIT 2, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x57: {
            trace("BIT 2, A");
            const bit = getBitValue(Cpu.A, 2);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x58: {
            trace("BIT 3, B");
            const bit = getBitValue(Cpu.B, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x59: {
            trace("BIT 3, C");
            const bit = getBitValue(Cpu.C, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x5A: {
            trace("BIT 3, D");
            const bit = getBitValue(Cpu.D, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x5B: {
            trace("BIT 3, E");
            const bit = getBitValue(Cpu.E, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x5C: {
            trace("BIT 3, H");
            const bit = getBitValue(Cpu.H, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x5D: {
            trace("BIT 3, L");
            const bit = getBitValue(Cpu.L, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x5E: {
            trace("BIT 3, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x5F: {
            trace("BIT 3, A");
            const bit = getBitValue(Cpu.A, 3);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x60: {
            trace("BIT 4, B");
            const bit = getBitValue(Cpu.B, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x61: {
            trace("BIT 4, C");
            const bit = getBitValue(Cpu.C, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x62: {
            trace("BIT 4, D");
            const bit = getBitValue(Cpu.D, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x63: {
            trace("BIT 4, E");
            const bit = getBitValue(Cpu.E, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x64: {
            trace("BIT 4, H");
            const bit = getBitValue(Cpu.H, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x65: {
            trace("BIT 4, L");
            const bit = getBitValue(Cpu.L, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x66: {
            trace("BIT 4, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x67: {
            trace("BIT 4, A");
            const bit = getBitValue(Cpu.A, 4);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x68: {
            trace("BIT 5, B");
            const bit = getBitValue(Cpu.B, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x69: {
            trace("BIT 5, C");
            const bit = getBitValue(Cpu.C, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x6A: {
            trace("BIT 5, D");
            const bit = getBitValue(Cpu.D, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x6B: {
            trace("BIT 5, E");
            const bit = getBitValue(Cpu.E, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x6C: {
            trace("BIT 5, H");
            const bit = getBitValue(Cpu.H, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x6D: {
            trace("BIT 5, L");
            const bit = getBitValue(Cpu.L, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x6E: {
            trace("BIT 5, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x6F: {
            trace("BIT 5, A");
            const bit = getBitValue(Cpu.A, 5);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x70: {
            trace("BIT 6, B");
            const bit = getBitValue(Cpu.B, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x71: {
            trace("BIT 6, C");
            const bit = getBitValue(Cpu.C, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x72: {
            trace("BIT 6, D");
            const bit = getBitValue(Cpu.D, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x73: {
            trace("BIT 6, E");
            const bit = getBitValue(Cpu.E, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x74: {
            trace("BIT 6, H");
            const bit = getBitValue(Cpu.H, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x75: {
            trace("BIT 6, L");
            const bit = getBitValue(Cpu.L, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x76: {
            trace("BIT 6, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x77: {
            trace("BIT 6, A");
            const bit = getBitValue(Cpu.A, 6);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x78: {
            trace("BIT 7, B");
            const bit = getBitValue(Cpu.B, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x79: {
            trace("BIT 7, C");
            const bit = getBitValue(Cpu.C, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x7A: {
            trace("BIT 7, D");
            const bit = getBitValue(Cpu.D, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x7B: {
            trace("BIT 7, E");
            const bit = getBitValue(Cpu.E, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x7C: {
            trace("BIT 7, H");
            const bit = getBitValue(Cpu.H, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x7D: {
            trace("BIT 7, L");
            const bit = getBitValue(Cpu.L, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x7E: {
            trace("BIT 7, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            const bit = getBitValue(value, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x7F: {
            trace("BIT 7, A");
            const bit = getBitValue(Cpu.A, 7);
            setHalfCarryFlag(1);
            setNegativeFlag(0);
            setZeroFlag(bit);
            break;
        }
        case 0x80: {
            trace("RES 0, B");
            Cpu.B = setBitValue(Cpu.B, 0, 0);
            break;
        }
        case 0x81: {
            trace("RES 0, C");
            Cpu.C = setBitValue(Cpu.C, 0, 0);
            break;
        }
        case 0x82: {
            trace("RES 0, D");
            Cpu.D = setBitValue(Cpu.D, 0, 0);
            break;
        }
        case 0x83: {
            trace("RES 0, E");
            Cpu.E = setBitValue(Cpu.E, 0, 0);
            break;
        }
        case 0x84: {
            trace("RES 0, H");
            Cpu.H = setBitValue(Cpu.H, 0, 0);
            break;
        }
        case 0x85: {
            trace("RES 0, L");
            Cpu.L = setBitValue(Cpu.L, 0, 0);
            break;
        }
        case 0x86: {
            trace("RES 0, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 0, 0));
            break;
        }
        case 0x87: {
            trace("RES 0, A");
            Cpu.A = setBitValue(Cpu.A, 0, 0);
            break;
        }
        case 0x88: {
            trace("RES 1, B");
            Cpu.B = setBitValue(Cpu.B, 1, 0);
            break;
        }
        case 0x89: {
            trace("RES 1, C");
            Cpu.C = setBitValue(Cpu.C, 1, 0);
            break;
        }
        case 0x8A: {
            trace("RES 1, D");
            Cpu.D = setBitValue(Cpu.D, 1, 0);
            break;
        }
        case 0x8B: {
            trace("RES 1, E");
            Cpu.E = setBitValue(Cpu.E, 1, 0);
            break;
        }
        case 0x8C: {
            trace("RES 1, H");
            Cpu.H = setBitValue(Cpu.H, 1, 0);
            break;
        }
        case 0x8D: {
            trace("RES 1, L");
            Cpu.L = setBitValue(Cpu.L, 1, 0);
            break;
        }
        case 0x8E: {
            trace("RES 1, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 1, 0));
            break;
        }
        case 0x8F: {
            trace("RES 1, A");
            Cpu.A = setBitValue(Cpu.A, 1, 0);
            break;
        }
        case 0x90: {
            trace("RES 2, B");
            Cpu.B = setBitValue(Cpu.B, 2, 0);
            break;
        }
        case 0x91: {
            trace("RES 2, C");
            Cpu.C = setBitValue(Cpu.C, 2, 0);
            break;
        }
        case 0x92: {
            trace("RES 2, D");
            Cpu.D = setBitValue(Cpu.D, 2, 0);
            break;
        }
        case 0x93: {
            trace("RES 2, E");
            Cpu.E = setBitValue(Cpu.E, 2, 0);
            break;
        }
        case 0x94: {
            trace("RES 2, H");
            Cpu.H = setBitValue(Cpu.H, 2, 0);
            break;
        }
        case 0x95: {
            trace("RES 2, L");
            Cpu.L = setBitValue(Cpu.L, 2, 0);
            break;
        }
        case 0x96: {
            trace("RES 2, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 2, 0));
            break;
        }
        case 0x97: {
            trace("RES 2, A");
            Cpu.A = setBitValue(Cpu.A, 2, 0);
            break;
        }
        case 0x98: {
            trace("RES 3, B");
            Cpu.B = setBitValue(Cpu.B, 3, 0);
            break;
        }
        case 0x99: {
            trace("RES 3, C");
            Cpu.C = setBitValue(Cpu.C, 3, 0);
            break;
        }
        case 0x9A: {
            trace("RES 3, D");
            Cpu.D = setBitValue(Cpu.D, 3, 0);
            break;
        }
        case 0x9B: {
            trace("RES 3, E");
            Cpu.E = setBitValue(Cpu.E, 3, 0);
            break;
        }
        case 0x9C: {
            trace("RES 3, H");
            Cpu.H = setBitValue(Cpu.H, 3, 0);
            break;
        }
        case 0x9D: {
            trace("RES 3, L");
            Cpu.L = setBitValue(Cpu.L, 3, 0);
            break;
        }
        case 0x9E: {
            trace("RES 3, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 3, 0));
            break;
        }
        case 0x9F: {
            trace("RES 3, A");
            Cpu.A = setBitValue(Cpu.A, 3, 0);
            break;
        }
        case 0xA0: {
            trace("RES 4, B");
            Cpu.B = setBitValue(Cpu.B, 4, 0);
            break;
        }
        case 0xA1: {
            trace("RES 4, C");
            Cpu.C = setBitValue(Cpu.C, 4, 0);
            break;
        }
        case 0xA2: {
            trace("RES 4, D");
            Cpu.D = setBitValue(Cpu.D, 4, 0);
            break;
        }
        case 0xA3: {
            trace("RES 4, E");
            Cpu.E = setBitValue(Cpu.E, 4, 0);
            break;
        }
        case 0xA4: {
            trace("RES 4, H");
            Cpu.H = setBitValue(Cpu.H, 4, 0);
            break;
        }
        case 0xA5: {
            trace("RES 4, L");
            Cpu.L = setBitValue(Cpu.L, 4, 0);
            break;
        }
        case 0xA6: {
            trace("RES 4, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 4, 0));
            break;
        }
        case 0xA7: {
            trace("RES 4, A");
            Cpu.A = setBitValue(Cpu.A, 4, 0);
            break;
        }
        case 0xA8: {
            trace("RES 5, B");
            Cpu.B = setBitValue(Cpu.B, 5, 0);
            break;
        }
        case 0xA9: {
            trace("RES 5, C");
            Cpu.C = setBitValue(Cpu.C, 5, 0);
            break;
        }
        case 0xAA: {
            trace("RES 5, D");
            Cpu.D = setBitValue(Cpu.D, 5, 0);
            break;
        }
        case 0xAB: {
            trace("RES 5, E");
            Cpu.E = setBitValue(Cpu.E, 5, 0);
            break;
        }
        case 0xAC: {
            trace("RES 5, H");
            Cpu.H = setBitValue(Cpu.H, 5, 0);
            break;
        }
        case 0xAD: {
            trace("RES 5, L");
            Cpu.L = setBitValue(Cpu.L, 5, 0);
            break;
        }
        case 0xAE: {
            trace("RES 5, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 5, 0));
            break;
        }
        case 0xAF: {
            trace("RES 5, A");
            Cpu.A = setBitValue(Cpu.A, 5, 0);
            break;
        }
        case 0xB0: {
            trace("RES 6, B");
            Cpu.B = setBitValue(Cpu.B, 6, 0);
            break;
        }
        case 0xB1: {
            trace("RES 6, C");
            Cpu.C = setBitValue(Cpu.C, 6, 0);
            break;
        }
        case 0xB2: {
            trace("RES 6, D");
            Cpu.D = setBitValue(Cpu.D, 6, 0);
            break;
        }
        case 0xB3: {
            trace("RES 6, E");
            Cpu.E = setBitValue(Cpu.E, 6, 0);
            break;
        }
        case 0xB4: {
            trace("RES 6, H");
            Cpu.H = setBitValue(Cpu.H, 6, 0);
            break;
        }
        case 0xB5: {
            trace("RES 6, L");
            Cpu.L = setBitValue(Cpu.L, 6, 0);
            break;
        }
        case 0xB6: {
            trace("RES 6, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 6, 0));
            break;
        }
        case 0xB7: {
            trace("RES 6, A");
            Cpu.A = setBitValue(Cpu.A, 6, 0);
            break;
        }
        case 0xB8: {
            trace("RES 7, B");
            Cpu.B = setBitValue(Cpu.B, 7, 0);
            break;
        }
        case 0xB9: {
            trace("RES 7, C");
            Cpu.C = setBitValue(Cpu.C, 7, 0);
            break;
        }
        case 0xBA: {
            trace("RES 7, D");
            Cpu.D = setBitValue(Cpu.D, 7, 0);
            break;
        }
        case 0xBB: {
            trace("RES 7, E");
            Cpu.E = setBitValue(Cpu.E, 7, 0);
            break;
        }
        case 0xBC: {
            trace("RES 7, H");
            Cpu.H = setBitValue(Cpu.H, 7, 0);
            break;
        }
        case 0xBD: {
            trace("RES 7, L");
            Cpu.L = setBitValue(Cpu.L, 7, 0);
            break;
        }
        case 0xBE: {
            trace("RES 7, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 7, 0));
            break;
        }
        case 0xBF: {
            trace("RES 7, A");
            Cpu.A = setBitValue(Cpu.A, 7, 0);
            break;
        }
        case 0xC0: {
            trace("SET 0, B");
            Cpu.B = setBitValue(Cpu.B, 0, 1);
            break;
        }
        case 0xC1: {
            trace("SET 0, C");
            Cpu.C = setBitValue(Cpu.C, 0, 1);
            break;
        }
        case 0xC2: {
            trace("SET 0, D");
            Cpu.D = setBitValue(Cpu.D, 0, 1);
            break;
        }
        case 0xC3: {
            trace("SET 0, E");
            Cpu.E = setBitValue(Cpu.E, 0, 1);
            break;
        }
        case 0xC4: {
            trace("SET 0, H");
            Cpu.H = setBitValue(Cpu.H, 0, 1);
            break;
        }
        case 0xC5: {
            trace("SET 0, L");
            Cpu.L = setBitValue(Cpu.L, 0, 1);
            break;
        }
        case 0xC6: {
            trace("SET 0, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 0, 1));
            break;
        }
        case 0xC7: {
            trace("SET 0, A");
            Cpu.A = setBitValue(Cpu.A, 0, 1);
            break;
        }
        case 0xC8: {
            trace("SET 1, B");
            Cpu.B = setBitValue(Cpu.B, 1, 1);
            break;
        }
        case 0xC9: {
            trace("SET 1, C");
            Cpu.C = setBitValue(Cpu.C, 1, 1);
            break;
        }
        case 0xCA: {
            trace("SET 1, D");
            Cpu.D = setBitValue(Cpu.D, 1, 1);
            break;
        }
        case 0xCB: {
            trace("SET 1, E");
            Cpu.E = setBitValue(Cpu.E, 1, 1);
            break;
        }
        case 0xCC: {
            trace("SET 1, H");
            Cpu.H = setBitValue(Cpu.H, 1, 1);
            break;
        }
        case 0xCD: {
            trace("SET 1, L");
            Cpu.L = setBitValue(Cpu.L, 1, 1);
            break;
        }
        case 0xCE: {
            trace("SET 1, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 1, 1));
            break;
        }
        case 0xCF: {
            trace("SET 1, A");
            Cpu.A = setBitValue(Cpu.A, 1, 1);
            break;
        }
        case 0xD0: {
            trace("SET 2, B");
            Cpu.B = setBitValue(Cpu.B, 2, 1);
            break;
        }
        case 0xD1: {
            trace("SET 2, C");
            Cpu.C = setBitValue(Cpu.C, 2, 1);
            break;
        }
        case 0xD2: {
            trace("SET 2, D");
            Cpu.D = setBitValue(Cpu.D, 2, 1);
            break;
        }
        case 0xD3: {
            trace("SET 2, E");
            Cpu.E = setBitValue(Cpu.E, 2, 1);
            break;
        }
        case 0xD4: {
            trace("SET 2, H");
            Cpu.H = setBitValue(Cpu.H, 2, 1);
            break;
        }
        case 0xD5: {
            trace("SET 2, L");
            Cpu.L = setBitValue(Cpu.L, 2, 1);
            break;
        }
        case 0xD6: {
            trace("SET 2, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 2, 1));
            break;
        }
        case 0xD7: {
            trace("SET 2, A");
            Cpu.A = setBitValue(Cpu.A, 2, 1);
            break;
        }
        case 0xD8: {
            trace("SET 3, B");
            Cpu.B = setBitValue(Cpu.B, 3, 1);
            break;
        }
        case 0xD9: {
            trace("SET 3, C");
            Cpu.C = setBitValue(Cpu.C, 3, 1);
            break;
        }
        case 0xDA: {
            trace("SET 3, D");
            Cpu.D = setBitValue(Cpu.D, 3, 1);
            break;
        }
        case 0xDB: {
            trace("SET 3, E");
            Cpu.E = setBitValue(Cpu.E, 3, 1);
            break;
        }
        case 0xDC: {
            trace("SET 3, H");
            Cpu.H = setBitValue(Cpu.H, 3, 1);
            break;
        }
        case 0xDD: {
            trace("SET 3, L");
            Cpu.L = setBitValue(Cpu.L, 3, 1);
            break;
        }
        case 0xDE: {
            trace("SET 3, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 3, 1));
            break;
        }
        case 0xDF: {
            trace("SET 3, A");
            Cpu.A = setBitValue(Cpu.A, 3, 1);
            break;
        }
        case 0xE0: {
            trace("SET 4, B");
            Cpu.B = setBitValue(Cpu.B, 4, 1);
            break;
        }
        case 0xE1: {
            trace("SET 4, C");
            Cpu.C = setBitValue(Cpu.C, 4, 1);
            break;
        }
        case 0xE2: {
            trace("SET 4, D");
            Cpu.D = setBitValue(Cpu.D, 4, 1);
            break;
        }
        case 0xE3: {
            trace("SET 4, E");
            Cpu.E = setBitValue(Cpu.E, 4, 1);
            break;
        }
        case 0xE4: {
            trace("SET 4, H");
            Cpu.H = setBitValue(Cpu.H, 4, 1);
            break;
        }
        case 0xE5: {
            trace("SET 4, L");
            Cpu.L = setBitValue(Cpu.L, 4, 1);
            break;
        }
        case 0xE6: {
            trace("SET 4, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 4, 1));
            break;
        }
        case 0xE7: {
            trace("SET 4, A");
            Cpu.A = setBitValue(Cpu.A, 4, 1);
            break;
        }
        case 0xE8: {
            trace("SET 5, B");
            Cpu.B = setBitValue(Cpu.B, 5, 1);
            break;
        }
        case 0xE9: {
            trace("SET 5, C");
            Cpu.C = setBitValue(Cpu.C, 5, 1);
            break;
        }
        case 0xEA: {
            trace("SET 5, D");
            Cpu.D = setBitValue(Cpu.D, 5, 1);
            break;
        }
        case 0xEB: {
            trace("SET 5, E");
            Cpu.E = setBitValue(Cpu.E, 5, 1);
            break;
        }
        case 0xEC: {
            trace("SET 5, H");
            Cpu.H = setBitValue(Cpu.H, 5, 1);
            break;
        }
        case 0xED: {
            trace("SET 5, L");
            Cpu.L = setBitValue(Cpu.L, 5, 1);
            break;
        }
        case 0xEE: {
            trace("SET 5, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 5, 1));
            break;
        }
        case 0xEF: {
            trace("SET 5, A");
            Cpu.A = setBitValue(Cpu.A, 5, 1);
            break;
        }
        case 0xF0: {
            trace("SET 6, B");
            Cpu.B = setBitValue(Cpu.B, 6, 1);
            break;
        }
        case 0xF1: {
            trace("SET 6, C");
            Cpu.C = setBitValue(Cpu.C, 6, 1);
            break;
        }
        case 0xF2: {
            trace("SET 6, D");
            Cpu.D = setBitValue(Cpu.D, 6, 1);
            break;
        }
        case 0xF3: {
            trace("SET 6, E");
            Cpu.E = setBitValue(Cpu.E, 6, 1);
            break;
        }
        case 0xF4: {
            trace("SET 6, H");
            Cpu.H = setBitValue(Cpu.H, 6, 1);
            break;
        }
        case 0xF5: {
            trace("SET 6, L");
            Cpu.L = setBitValue(Cpu.L, 6, 1);
            break;
        }
        case 0xF6: {
            trace("SET 6, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 6, 1));
            break;
        }
        case 0xF7: {
            trace("SET 6, A");
            Cpu.A = setBitValue(Cpu.A, 6, 1);
            break;
        }
        case 0xF8: {
            trace("SET 7, B");
            Cpu.B = setBitValue(Cpu.B, 7, 1);
            break;
        }
        case 0xF9: {
            trace("SET 7, C");
            Cpu.C = setBitValue(Cpu.C, 7, 1);
            break;
        }
        case 0xFA: {
            trace("SET 7, D");
            Cpu.D = setBitValue(Cpu.D, 7, 1);
            break;
        }
        case 0xFB: {
            trace("SET 7, E");
            Cpu.E = setBitValue(Cpu.E, 7, 1);
            break;
        }
        case 0xFC: {
            trace("SET 7, H");
            Cpu.H = setBitValue(Cpu.H, 7, 1);
            break;
        }
        case 0xFD: {
            trace("SET 7, L");
            Cpu.L = setBitValue(Cpu.L, 7, 1);
            break;
        }
        case 0xFE: {
            trace("SET 7, (HL)");
            const hl = getHL();
            const value = readByte(hl);
            writeByte(hl, setBitValue(value, 7, 1));
            break;
        }
        case 0xFF: {
            trace("SET 7, A");
            Cpu.A = setBitValue(Cpu.A, 7, 1);
            break;
        }
        default: {
            new Error("Unreachable code");
            break;
        }
    }
}