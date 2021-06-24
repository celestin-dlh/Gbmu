import { Cpu } from './cpuState';
// import { executeOpcode } from './opcode';
// import { readByteAtPc } from './readWriteOperations';

// const cycleForOneFrame = 69905;

// function fetchOpcode(): i32 {
//   const opcode = readByteAtPc();
//   return opcode;
// }

// export function runFrame(): void {
//   while (Cpu.cycle < cycleForOneFrame) {
//     const opcode = fetchOpcode();
//     executeOpcode(opcode); 
//   }
// }

export function loadRom(buffer: Uint8Array): void {
  if (buffer.length > 0x8000) {
    trace("Rom has a limited size of 0x8000 bytes");
    return;
  }
  for (let index = 0; index < buffer.length; index++) {
    Cpu.rom[index] = buffer[index];
  }
  trace("Rom loaded")
}

export { getRegisters, getDisassembler, getMemory } from './debug/index';