import { Cpu } from './cpuState';
import { readByteAtPc } from './readWriteOperations';
import { getInstructionLength } from './debug';
import { executeOpcode, fetchOpcode } from './opcode';

export function step(): void {
  const opcode: u8 = fetchOpcode();
  executeOpcode(opcode);
}

export function loadRom(buffer: Uint8Array): void {
  Cpu.rom[0] = 0x06;
  Cpu.rom[1] = 0xFF;
  Cpu.rom[2] = 0x6;
  Cpu.rom[3] = 0xAA;
  // for (let index = 0; index < buffer.length; index++) {
  //   if (index >= 0x8000) {
  //     trace("Rom array has a limit of 0x8000 byte");
  //     break;
  //   }
  //   Cpu.rom[index] = buffer[index];
  // }
  // trace("Rom loaded")
}

export { getRegisters, getDisassembler, getMemory } from './debug/index';