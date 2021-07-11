import { executeOpcode } from './cpu';
import { dmgBootRom } from './constants';
import { syncCycle } from './syncCycle';
import { Cpu } from './cpu';
import { Interrupt, interruptHandling } from './interrupts';
import { Memory, readByteAtPc } from './memory';
import { Ppu } from './ppu';
import { Timer } from './timers';

function fetchOpcode(): u8 {
  return readByteAtPc();
}

export function step(stepNumber: i32): void {
  for (let index = 0; index < stepNumber; index++) {
    if (Cpu.isHalted) {
      syncCycle(4);
    } else {
      const opcode = fetchOpcode();
      executeOpcode(opcode);
    }
    interruptHandling();
  }
}

const CYCLE_PER_FRAME = 69905;

export function runFrame(): void {
  let cycle = 0;
  while (cycle < CYCLE_PER_FRAME) {
    const opcode = fetchOpcode();
    cycle += executeOpcode(opcode);
    interruptHandling();
  }
}

export function runOneSecond(): void {
  let cycle = 0;
  while (cycle < CYCLE_PER_FRAME * 60) {
    const opcode = fetchOpcode();
    cycle += executeOpcode(opcode);
    interruptHandling();
  }
}








function loadDmgBootRom(): void {
  for(let index = 0; index < dmgBootRom.length; index++) {
    Memory.rom[index] = dmgBootRom[index];
  }
}

export function loadRom(buffer: Uint8Array): void {
  reset();
  for (let index = 0; index < buffer.length; index++) {
    if (index >= 0x8000) {
      trace("Rom array has a limit of 0x8000 byte");
      break;
    }
    Memory.rom[index] = buffer[index];
  }
  const subArray = buffer.subarray(0, 0x100);
  loadDmgBootRom();
  trace("Rom loaded");
}





export function reset(): void {
  Cpu.reset();
  Interrupt.reset();
  Memory.reset();
  Timer.reset();
  Ppu.reset();
  trace("Reset");
}

// debug
export { getDisassembler, getCpuRegisters } from './cpu';
export { getMemory } from './memory';