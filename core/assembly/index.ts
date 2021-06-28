import { Cpu } from './cpu/state';
import { executeOpcode } from './cpu/opcode';
import { readByteAtPc } from './readWriteOperations';

export function step(stepTimes: i32): void {
  for (let index = 0; index < stepTimes; index++) {
    const opcode: u8 = readByteAtPc();
    executeOpcode(opcode);
  }
}

export function loadRom(buffer: Uint8Array): void {
  for (let index = 0; index < buffer.length; index++) {
    if (index >= 0x8000) {
      trace("Rom array has a limit of 0x8000 byte");
      break;
    }
    Cpu.rom[index] = buffer[index];
  }
  trace("Rom loaded");
}

export { getRegisters, getOtherRegister, getDisassembler, getMemory } from './debug/index';

function notPrintingTrace(
  message: string,
  n: i32 = 0,
  a0: f64 = 0,
  a1: f64 = 0,
  a2: f64 = 0,
  a3: f64 = 0,
  a4: f64 = 0,
): void {

}