import { executeOpcode } from './cpu';
import { dmgBootRom } from './constants';
import { syncCycle } from './syncCycle';
import { Cpu } from './cpu';
import { Interrupt, interruptHandling } from './interrupts';
import { Memory, readByteAtPc, unSafeWriteByte } from './memory';
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
  while (cycle <= CYCLE_PER_FRAME) {
    if (Cpu.isHalted) {
      syncCycle(4);
      cycle += 4;
    } else {
      const opcode = fetchOpcode();
      cycle += executeOpcode(opcode);
    }
    interruptHandling();
  }
}

function loadDmgBootRom(): void {
  for(let index = 0; index < dmgBootRom.length; index++) {
    unSafeWriteByte(<u16>index, <u8>dmgBootRom[index]);
  }
}

export function reset(): void {
  Cpu.reset();
  Interrupt.reset();
  Memory.reset();
  Timer.reset();
  Ppu.reset();
}

export function loadRom(buffer: Uint8Array): void {
  reset();

  Memory.romBuffer = buffer;
  for (let index = 0; index < buffer.length; index++) {
    if (index >= 0x8000) {
      trace("Rom array has a limit of 0x8000 byte");
      break;
    }
    unSafeWriteByte(<u16>index, buffer[index]);
  }
  loadDmgBootRom();
  trace("Rom loaded");
}


export { Ppu } from './ppu';

export function getScreen(): u8[] {
  return Ppu.screen;
}




// debug
export { getDisassembler, getCpuRegisters } from './cpu';
export { getMemory } from './memory';
export { getBackground, getVideoRegisters, getWholeTileData } from './ppu';
export { getTimersRegisters } from './timers';
export { getInterruptsRegisters } from './interrupts';
