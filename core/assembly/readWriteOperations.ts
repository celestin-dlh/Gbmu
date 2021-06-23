import { Cpu } from './cpuState';
import { syncCycle } from './cycle';
import { ROM_START, ROM_END, VIDEO_RAM_START, VIDEO_RAM_END, EXTERNAL_RAM_START, EXTERNAL_RAM_END, WORK_RAM_START, WORK_RAM_END } from './constants';

// take 4 cycles
export function readByteAtPc(): u8 {
    const byte = Cpu.rom[Cpu.pc];
    Cpu.pc += 1;
    syncCycle(4);
    return byte;
} 
  
// take 8 cycles (4 + 4)
export function readWordAtPc(): u16 {
    const leastSignificantByte = readByteAtPc();
    const mostSignificantByte = readByteAtPc();
    return (mostSignificantByte << 8) | leastSignificantByte;
}

// function readRom(params:type) {
    
// }

export function readMemory(address: u16): void {
    if (address >= ROM_START && address <= ROM_END) {
        
    } else if (address >= VIDEO_RAM_START && address <= VIDEO_RAM_END) {
        
    } else if (address >= EXTERNAL_RAM_START && address <= EXTERNAL_RAM_END) {
        
    } else if (address >= WORK_RAM_START && address <= WORK_RAM_END) {

    }
}