import {
  ROM_SIZE,
  VIDEO_RAM_SIZE,
  EXTERNAL_RAM_SIZE,
  WORK_RAM_SIZE,
  ECHO_RAM_SIZE,
  OAM_SIZE,
  UNUSED_MEMORY_SIZE,
  IO_REGISTERS_SIZE,
  HIGH_RAM_SIZE,
  IE_SIZE
} from '../constants';
import { combineBytes, getHighByte, getLowByte } from '../helpers';

export class Cpu {
  static A: u8 = 0;
  static B: u8 = 0;
  static C: u8 = 0;
  static D: u8 = 0;
  static E: u8 = 0;
  static H: u8 = 0;
  static L: u8 = 0;
  static F: u8 = 0;

  static pc: u16 = 0x100;
  static sp: u16 = 0;

  static cycle: i32 = 0;

  // memory of the gameboy split in multiples array
  static rom: Uint8Array = new Uint8Array(ROM_SIZE).fill(0);
  static videoRam: Uint8Array = new Uint8Array(VIDEO_RAM_SIZE).fill(0);
  static externalRam: Uint8Array = new Uint8Array(EXTERNAL_RAM_SIZE).fill(0);
  static workRam: Uint8Array = new Uint8Array(WORK_RAM_SIZE).fill(0);
  static echoRam: Uint8Array = new Uint8Array(ECHO_RAM_SIZE).fill(0);
  static oam: Uint8Array = new Uint8Array(OAM_SIZE).fill(0);
  static unusedMemory: Uint8Array = new Uint8Array(UNUSED_MEMORY_SIZE).fill(0);
  static ioRegisters: Uint8Array = new Uint8Array(IO_REGISTERS_SIZE).fill(0);
  static highRam: Uint8Array = new Uint8Array(HIGH_RAM_SIZE).fill(0);
  static IE: Uint8Array = new Uint8Array(IE_SIZE).fill(0);
}



export function setZeroFlag(value: bool): void {
  Cpu.F = Cpu.F & 0b1111_0000;
  if (value) {
    Cpu.F = Cpu.F | 0b1000_0000;
  } else {
    Cpu.F = Cpu.F & 0b0111_0000;
  }
}

export function getZeroFlag(): bool {
  return ((Cpu.F & 0x80) > 0) ? 1 : 0; 
}

export function setNegativeFlag(value: bool): void {
  Cpu.F = Cpu.F & 0b1111_0000;
  if (value) {
    Cpu.F = Cpu.F | 0b0100_0000;
  } else {
    Cpu.F = Cpu.F & 0b1011_0000;
  }
}

export function getNegativeFlag(): bool {
  return ((Cpu.F & 0x40) > 0) ? 1 : 0; 
}

export function setHalfCarryFlag(value: bool): void {
  Cpu.F = Cpu.F & 0b1111_0000;
  if (value) {
    Cpu.F = Cpu.F | 0b0010_0000;
  } else {
    Cpu.F = Cpu.F & 0b1101_0000;
  }
}

export function getHalfCarryFlag(): bool {
  return ((Cpu.F & 0x20) > 0) ? 1 : 0; 
}

export function setCarryFlag(value: bool): void {
  Cpu.F = Cpu.F & 0b1111_0000;
  if (value) {
    Cpu.F = Cpu.F | 0b0001_0000;
  } else {
    Cpu.F = Cpu.F & 0b1110_0000;
  }
}

export function getCarryFlag(): bool {
  return ((Cpu.F & 0x10) > 0) ? 1 : 0; 
}


// export function checkHalfCarryFlag(): bool {
  
// }

export function getBC(): u16 {
  return combineBytes(Cpu.B, Cpu.C);
}

export function getDE(): u16 {
  return combineBytes(Cpu.D, Cpu.E);
}

export function getHL(): u16 {
  return combineBytes(Cpu.H, Cpu.L);
}

export function setBC(word: u16): void {
  Cpu.C = getLowByte(word);
  Cpu.B = getHighByte(word);
}

export function setDE(word: u16): void {
  Cpu.E = getLowByte(word);
  Cpu.D = getHighByte(word);
}

export function setHL(word: u16): void {
  Cpu.L = getLowByte(word);
  Cpu.H = getHighByte(word);
}

export function setAF(word: u16): void {
  Cpu.F = getLowByte(word) & 0b1111_0000;
  Cpu.A = getHighByte(word);
}