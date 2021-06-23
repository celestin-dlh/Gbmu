import { ROM_SIZE, WORK_RAM_SIZE, VIDEO_RAM_SIZE, EXTERNAL_RAM_SIZE } from './constants';

export class Cpu {
  static A: u8 = 1;
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
  static workRam: Uint8Array = new Uint8Array(WORK_RAM_SIZE).fill(0);
  static videoRam: Uint8Array = new Uint8Array(VIDEO_RAM_SIZE).fill(0);
  static externalRam: Uint8Array = new Uint8Array(EXTERNAL_RAM_SIZE).fill(0);
}