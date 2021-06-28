import { Cpu } from './cpu/state';
import {
    ROM_START,
    ROM_END,
    VIDEO_RAM_START,
    VIDEO_RAM_END,
    EXTERNAL_RAM_START,
    EXTERNAL_RAM_END,
    WORK_RAM_START,
    WORK_RAM_END,
    ECHO_RAM_START,
    ECHO_RAM_END,
    OAM_START,
    OAM_END,
    UNUSED_MEMORY_START,
    UNUSED_MEMORY_END,
    IO_REGISTERS_START,
    IO_REGISTERS_END,
    HIGH_RAM_START,
    HIGH_RAM_END,
    IE_START,
    IE_END
} from './constants';
import { combineBytes } from './helpers';

export function writeByte(address: u16, byte: u8): void {
    // syncCycle(4);
    writeMemoryMap(address, byte);
}

function writeMemoryMap(address: u16, byte: u8): void {
    if (address >= ROM_START && address <= ROM_END) {
        new Error("ROM IS READ ONLY");
    } 
    else if (address >= VIDEO_RAM_START && address <= VIDEO_RAM_END) {
        Cpu.videoRam[address - VIDEO_RAM_START] = byte;
    } 
    else if (address >= EXTERNAL_RAM_START && address <= EXTERNAL_RAM_END) {
        Cpu.externalRam[address - EXTERNAL_RAM_START] = byte;
    } 
    else if (address >= WORK_RAM_START && address <= WORK_RAM_END) {
        Cpu.workRam[address - WORK_RAM_START] = byte;
    } 
    else if (address >= ECHO_RAM_START && address <= ECHO_RAM_END) {
        new Error("Nintendo says use of this area is prohibited.");
    } 
    else if (address >= OAM_START && address <= OAM_END) {
        Cpu.oam[address - OAM_START] = byte;
    } 
    else if (address >= UNUSED_MEMORY_START && address <= UNUSED_MEMORY_END) {
        new Error("Nintendo says use of this area is prohibited.");
    } 
    else if (address >= IO_REGISTERS_START && address <= IO_REGISTERS_END) {
        Cpu.ioRegisters[address - IO_REGISTERS_START] = byte;
    } 
    else if (address >= HIGH_RAM_START && address <= HIGH_RAM_END) {
        Cpu.highRam[address - HIGH_RAM_START] = byte;
    } 
    else if (address >= IE_START && address <= IE_END) {
        Cpu.IE[address - IE_START] = byte;
    } 

    new Error("Error: This should be unreachable");
}

export function readByteAtPc(): u8 {
    const byte = readMemoryMap(Cpu.pc);
    Cpu.pc += 1;
    // syncCycle(4);
    return byte;
} 

export function readByte(address: u16): u8 {
    const byte = readMemoryMap(address);
    // syncCycle(4);
    return byte;
}
  
export function readWordAtPc(): u16 {
    const lowByte = readByteAtPc();
    const highByte = readByteAtPc();
    return combineBytes(highByte, lowByte);
}

export function readMemoryMap(address: u16): u8 {
    if (address >= ROM_START && address <= ROM_END) {
        return Cpu.rom[address];
    } 
    else if (address >= VIDEO_RAM_START && address <= VIDEO_RAM_END) {
        return Cpu.videoRam[address - VIDEO_RAM_START];
    } 
    else if (address >= EXTERNAL_RAM_START && address <= EXTERNAL_RAM_END) {
        return Cpu.externalRam[address - EXTERNAL_RAM_START];
    } 
    else if (address >= WORK_RAM_START && address <= WORK_RAM_END) {
        return Cpu.workRam[address - WORK_RAM_START];
    } 
    else if (address >= ECHO_RAM_START && address <= ECHO_RAM_END) {
        return Cpu.echoRam[address - ECHO_RAM_START];
    } 
    else if (address >= OAM_START && address <= OAM_END) {
        return Cpu.oam[address - OAM_START];
    } 
    else if (address >= UNUSED_MEMORY_START && address <= UNUSED_MEMORY_END) {
        return Cpu.unusedMemory[address - UNUSED_MEMORY_START];
    } 
    else if (address >= IO_REGISTERS_START && address <= IO_REGISTERS_END) {
        return Cpu.ioRegisters[address - IO_REGISTERS_START];
    } 
    else if (address >= HIGH_RAM_START && address <= HIGH_RAM_END) {
        return Cpu.highRam[address - HIGH_RAM_START];
    } 
    else if (address >= IE_START && address <= IE_END) {
        return Cpu.IE[address - IE_START];
    } 

    trace("Error: This should be unreachable");
    return 0;
}
