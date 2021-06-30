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
import { writeMemoryMap } from '../readWriteOperations';


export class Cpu {

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

  static ime: bool = false;

  static reset(): void {
    Cpu.A = 0x01;
    Cpu.B = 0x0;
    Cpu.C = 0x13;
    Cpu.D = 0;
    Cpu.E = 0xD8;
    Cpu.H = 0x01;
    Cpu.L = 0x4D;
    Cpu.F = 0xB0;

    Cpu.pc = 0x0;
    // Cpu.pc = 0x100;
    Cpu.sp = 0xFFFE;

    Cpu.cycle = 0;

    Cpu.rom = new Uint8Array(ROM_SIZE).fill(0);
    Cpu.videoRam = new Uint8Array(VIDEO_RAM_SIZE).fill(0);
    Cpu.externalRam = new Uint8Array(EXTERNAL_RAM_SIZE).fill(0);
    Cpu.workRam = new Uint8Array(WORK_RAM_SIZE).fill(0);
    Cpu.echoRam = new Uint8Array(ECHO_RAM_SIZE).fill(0);
    Cpu.oam = new Uint8Array(OAM_SIZE).fill(0);
    Cpu.unusedMemory = new Uint8Array(UNUSED_MEMORY_SIZE).fill(0);
    Cpu.ioRegisters = new Uint8Array(IO_REGISTERS_SIZE).fill(0);
    Cpu.highRam = new Uint8Array(HIGH_RAM_SIZE).fill(0);
    Cpu.IE = new Uint8Array(IE_SIZE).fill(0);
  
    Cpu.ime = false;
    setDefaultValue();
  }
}

function setDefaultValue(): void {
  writeMemoryMap(0xFF05, 0x0);
  writeMemoryMap(0xFF06, 0x0);
  writeMemoryMap(0xFF07, 0x0);
  writeMemoryMap(0xFF10, 0x80);
  writeMemoryMap(0xFF11, 0xBF);
  writeMemoryMap(0xFF12, 0xF3);
  writeMemoryMap(0xFF14, 0xBF);
  writeMemoryMap(0xFF16, 0x3F);
  writeMemoryMap(0xFF17, 0x00);
  writeMemoryMap(0xFF19, 0xBF);
  writeMemoryMap(0xFF1A, 0x7F);
  writeMemoryMap(0xFF1B, 0xFF);
  writeMemoryMap(0xFF1C, 0x9F);
  writeMemoryMap(0xFF1E, 0xBF);
  writeMemoryMap(0xFF20, 0xFF);
  writeMemoryMap(0xFF21, 0x00);
  writeMemoryMap(0xFF22, 0x00);
  writeMemoryMap(0xFF23, 0xBF);
  writeMemoryMap(0xFF24, 0x77);
  writeMemoryMap(0xFF25, 0xF3);
  writeMemoryMap(0xFF26, 0xF1);
  writeMemoryMap(0xFF40, 0x91);
  writeMemoryMap(0xFF42, 0x00);
  writeMemoryMap(0xFF43, 0x00);

  writeMemoryMap(0xFF45, 0x00);
  writeMemoryMap(0xFF47, 0xFC);
  writeMemoryMap(0xFF48, 0xFF);
  writeMemoryMap(0xFF49, 0xFF);
  writeMemoryMap(0xFF4A, 0x00);
  writeMemoryMap(0xFF4B, 0x00);
  writeMemoryMap(0xFFFF, 0x00);
}

export function setIme(): void {
  Cpu.ime = true;
}

export function unsetIme(): void {
  Cpu.ime = false;
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