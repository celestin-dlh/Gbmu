export class Cpu {
  static registerA: u8 = 1;
  static registerB: u8 = 0;
  static registerC: u8 = 0;
  static registerD: u8 = 0;
  static registerE: u8 = 0;
  static registerH: u8 = 0;
  static registerL: u8 = 0;
  static registerF: u8 = 0;
  static pc: u16 = 0;
  static cycle: i32 = 0;
  static memory: Uint8Array = new Uint8Array(0xFFFF);
}