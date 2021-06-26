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
} from './constants';

class Cpu {
  static A: u8 = 0;
  static B: u8 = 0;
  static C: u8 = 0;
  static D: u8 = 0;
  static E: u8 = 0;
  static H: u8 = 0;
  static L: u8 = 0;
  static F: u8 = 0;

  static pc: u16 = 0;

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

function getBC(): u16 {
  return (<u16>Cpu.B << 8) | Cpu.C
}

function getDE(): u16 {
  return (<u16>Cpu.D << 8) | Cpu.E
}

function getHL(): u16 {
  return (<u16>Cpu.H << 8) | Cpu.L
}

function setBC(word: u16): void {
  const mostSignificantByte = <u8>(word >> 8); 
  const leastSignificantByte = <u8>word;
  
  Cpu.B = mostSignificantByte;
  Cpu.C = leastSignificantByte;
}

function setDE(word: u16): void {
  const mostSignificantByte = <u8>(word >> 8); 
  const leastSignificantByte = <u8>word;
  
  Cpu.D = mostSignificantByte;
  Cpu.E = leastSignificantByte;
}

function setHL(word: u16): void {
  const mostSignificantByte = <u8>(word >> 8); 
  const leastSignificantByte = <u8>word;
  
  Cpu.H = mostSignificantByte;
  Cpu.L = leastSignificantByte;
}

export { Cpu, getBC, getDE, getHL, setBC, setDE, setHL }