import { Cpu } from './cpuState';
import { executeOpcode } from './opcode';

const MAXCYCLES = 69905;
export function fetchOpcode(): u8 {
  const opcode = Cpu.memory[Cpu.pc];
  Cpu.pc += 1;
  return opcode;
}

export { executeOpcode } from './opcode';