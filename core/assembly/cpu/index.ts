import { combineBytes, getHighByte, getLowByte } from '../helpers/bitOperations';

export class Cpu {
  // static A: u8 = 0;
  // static B: u8 = 0;
  // static C: u8 = 0;
  // static D: u8 = 0;
  // static E: u8 = 0;
  // static H: u8 = 0;
  // static L: u8 = 0;
  // static F: u8 = 0;
  // static pc: u16 = 0x0;
  // static sp: u16 = 0;

  static A: u8 = 0x01;
  static B: u8 = 0x0;
  static C: u8 = 0x13;
  static D: u8 = 0;
  static E: u8 = 0xD8;
  static H: u8 = 0x01;
  static L: u8 = 0x4D;
  static F: u8 = 0xB0;
  static pc: u16 = 0x100;
  static sp: u16 = 0xFFFE;

  static isHalted: bool = false;

  static reset(): void {
    // Cpu.A = 0x01;
    // Cpu.B = 0x0;
    // Cpu.C = 0x13;
    // Cpu.D = 0;
    // Cpu.E = 0xD8;
    // Cpu.H = 0x01;
    // Cpu.L = 0x4D;
    // Cpu.F = 0xB0;
    // Cpu.pc = 0x100;
    // Cpu.sp = 0xFFFE;
    
    Cpu.A = 0x0;
    Cpu.B = 0x0;
    Cpu.C = 0x0;
    Cpu.D = 0x0;
    Cpu.E = 0x0;
    Cpu.H = 0x0;
    Cpu.L = 0x0;
    Cpu.F = 0x0;
    Cpu.pc = 0x0;
    Cpu.sp = 0x0;
  
    Cpu.isHalted = false;
  }

  static getBC(): u16 {
    return combineBytes(Cpu.B, Cpu.C);
  }

  static getDE(): u16 {
    return combineBytes(Cpu.D, Cpu.E);
  }

  static getHL(): u16 {
    return combineBytes(Cpu.H, Cpu.L);
  }

  static setBC(word: u16): void {
    Cpu.C = getLowByte(word);
    Cpu.B = getHighByte(word);
  }
  
  static setDE(word: u16): void {
    Cpu.E = getLowByte(word);
    Cpu.D = getHighByte(word);
  }
  
  static setHL(word: u16): void {
    Cpu.L = getLowByte(word);
    Cpu.H = getHighByte(word);
  }
  
  static setAF(word: u16): void {
    Cpu.F = getLowByte(word) & 0b1111_0000;
    Cpu.A = getHighByte(word);
  }
}

export {
  setZeroFlag,
  setNegativeFlag,
  setHalfCarryFlag,
  setCarryFlag,
  getZeroFlag,
  getNegativeFlag,
  getHalfCarryFlag,
  getCarryFlag
} from './flag';

export {
  executeOpcode
} from './opcode';

export {
  getCpuRegisters,
  getDisassembler
} from './debug';