import { Cpu } from './cpu/state';
import { executeOpcode } from './cpu/opcode';
import { readByteAtPc } from './readWriteOperations';

export function step(): void {
  const opcode: u8 = readByteAtPc();
  executeOpcode(opcode);
}

export function loadRom(buffer: Uint8Array): void {
  Cpu.rom[0x100] = 0xCB;
  Cpu.rom[0x101] = 0x28;
  // for (let index = 0; index < buffer.length; index++) {
  //   if (index >= 0x8000) {
  //     trace("Rom array has a limit of 0x8000 byte");
  //     break;
  //   }
  //   Cpu.rom[index] = buffer[index];
  // }
  // trace("Rom loaded");
}

export { getRegisters, getDisassembler, getMemory } from './debug/index';