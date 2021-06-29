import { Cpu } from './cpu/state';
import { fetchExecuteOpcode } from './cpu/opcode';
import { readByteAtPc } from './readWriteOperations';

declare function consoleLog(message: string): void;

export function step(stepTimes: i32): void {
  for (let index = 0; index < stepTimes; index++) {
    trace('step !')
    fetchExecuteOpcode();
  }
}

const CYCLE_PER_FRAME = 69905;

export function runFrame(): void {
  let cycle = 0;
  while (cycle < CYCLE_PER_FRAME) {
    cycle += fetchExecuteOpcode();
  }
}

export function runOneSecond(): void {
  for (let index = 0; index < 60; index++) {
    let cycle = 0;
    while (cycle < CYCLE_PER_FRAME) {
      cycle += fetchExecuteOpcode();
    }
  }
}

export function reset(): void {
  Cpu.reset();
  consoleLog("Reset");
}

export function loadRom(buffer: Uint8Array): void {
  for (let index = 0; index < buffer.length; index++) {
    if (index >= 0x8000) {
      trace("Rom array has a limit of 0x8000 byte");
      break;
    }
    Cpu.rom[index] = buffer[index];
  }
  consoleLog("Rom loaded");
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