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

function loadNintendoLogo(): void {
  const starting = 0x104;
  const nintendoLogo = [0xCE,0xED,0x66,0x66,0xCC,0x0D,0x00,0x0B,0x03,0x73,0x00,0x83,0x00,0x0C,0x00,0x0D, 0x00,0x08,0x11,0x1F,0x88,0x89,0x00,0x0E,0xDC,0xCC,0x6E,0xE6,0xDD,0xDD,0xD9,0x99, 0xBB,0xBB,0x67,0x63,0x6E,0x0E,0xEC,0xCC,0xDD,0xDC,0x99,0x9F,0xBB,0xB9,0x33,0x3E]

  for(let index = 0; index < nintendoLogo.length; index++) {
    Cpu.rom[starting + index] = nintendoLogo[index];
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

  loadNintendoLogo();
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