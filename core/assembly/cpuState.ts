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

export class Cpu {
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
  static rom: Uint8Array = new Uint8Array(ROM_SIZE).fill(0);
  static videoRam: Uint8Array = new Uint8Array(VIDEO_RAM_SIZE).fill(1);
  static externalRam: Uint8Array = new Uint8Array(EXTERNAL_RAM_SIZE).fill(2);
  static workRam: Uint8Array = new Uint8Array(WORK_RAM_SIZE).fill(3);
  static echoRam: Uint8Array = new Uint8Array(ECHO_RAM_SIZE).fill(4);
  static oam: Uint8Array = new Uint8Array(OAM_SIZE).fill(5);
  static unusedMemory: Uint8Array = new Uint8Array(UNUSED_MEMORY_SIZE).fill(6);
  static ioRegisters: Uint8Array = new Uint8Array(IO_REGISTERS_SIZE).fill(7);
  static highRam: Uint8Array = new Uint8Array(HIGH_RAM_SIZE).fill(8);
  static IE: Uint8Array = new Uint8Array(IE_SIZE).fill(9);
}