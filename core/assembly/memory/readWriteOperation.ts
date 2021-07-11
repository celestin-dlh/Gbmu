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
    IE_END,
} from '../constants';
import { Cpu } from '../cpu';
import { combineBytes } from '../helpers/bitOperations';
import { syncCycle } from '../syncCycle';
import { resetDiv } from '../timers';
import { Memory } from './index';

export function writeByteSync(address: u16, byte: u8): void {
    writeByte(address, byte);
    syncCycle(4);
}

export function writeByte(address: u16, byte: u8): void {
    if (address >= ROM_START && address <= ROM_END) {
        new Error("ROM IS READ ONLY");
    } 
    else if (address >= VIDEO_RAM_START && address <= VIDEO_RAM_END) {
        Memory.videoRam[address - VIDEO_RAM_START] = byte;
    } 
    else if (address >= EXTERNAL_RAM_START && address <= EXTERNAL_RAM_END) {
        Memory.externalRam[address - EXTERNAL_RAM_START] = byte;
    } 
    else if (address >= WORK_RAM_START && address <= WORK_RAM_END) {
        Memory.workRam[address - WORK_RAM_START] = byte;
    } 
    else if (address >= ECHO_RAM_START && address <= ECHO_RAM_END) {
        new Error("Nintendo says use of this area is prohibited.");
    } 
    else if (address >= OAM_START && address <= OAM_END) {
        Memory.oam[address - OAM_START] = byte;
    } 
    else if (address >= UNUSED_MEMORY_START && address <= UNUSED_MEMORY_END) {
        new Error("Nintendo says use of this area is prohibited.");
    } 
    else if (address >= IO_REGISTERS_START && address <= IO_REGISTERS_END) {
        Memory.ioRegisters[address - IO_REGISTERS_START] = byte;

        // DIV Timer
        if (address === 0xFF04) {
            resetDiv();
            return;
        } 

        // blarggs test - serial output
        if (address === 0xFF02 && byte === 0x81) {
            const char = String.fromCharCode(Memory.ioRegisters[0xFF01 - IO_REGISTERS_START]);
            trace(char);
            Memory.ioRegisters[0xFF02 - IO_REGISTERS_START] = 0;
        }
    } 
    else if (address >= HIGH_RAM_START && address <= HIGH_RAM_END) {
        Memory.highRam[address - HIGH_RAM_START] = byte;
    } 
    else if (address >= IE_START && address <= IE_END) {
        Memory.IE[address - IE_START] = byte;
    }
    else abort("Error: This should be unreachable");
}

export function readByteAtPc(): u8 {
    const byte = readByte(Cpu.pc);
    Cpu.pc += 1;
    syncCycle(4);
    return byte;
} 

export function readWordAtPc(): u16 {
    const lowByte = readByteAtPc();
    const highByte = readByteAtPc();
    return combineBytes(highByte, lowByte);
}

export function readByteSync(address: u16): u8 {
    const byte = readByte(address);
    syncCycle(4);
    return byte;
}
  
export function readByte(address: u16): u8 {
    if (address >= ROM_START && address <= ROM_END) {
        return Memory.rom[address];
    } 
    else if (address >= VIDEO_RAM_START && address <= VIDEO_RAM_END) {
        return Memory.videoRam[address - VIDEO_RAM_START];
    } 
    else if (address >= EXTERNAL_RAM_START && address <= EXTERNAL_RAM_END) {
        return Memory.externalRam[address - EXTERNAL_RAM_START];
    } 
    else if (address >= WORK_RAM_START && address <= WORK_RAM_END) {
        return Memory.workRam[address - WORK_RAM_START];
    } 
    else if (address >= ECHO_RAM_START && address <= ECHO_RAM_END) {
        return Memory.echoRam[address - ECHO_RAM_START];
    } 
    else if (address >= OAM_START && address <= OAM_END) {
        return Memory.oam[address - OAM_START];
    } 
    else if (address >= UNUSED_MEMORY_START && address <= UNUSED_MEMORY_END) {
        return Memory.unusedMemory[address - UNUSED_MEMORY_START];
    } 
    else if (address >= IO_REGISTERS_START && address <= IO_REGISTERS_END) {
        return Memory.ioRegisters[address - IO_REGISTERS_START];
    } 
    else if (address >= HIGH_RAM_START && address <= HIGH_RAM_END) {
        return Memory.highRam[address - HIGH_RAM_START];
    } 
    else if (address >= IE_START && address <= IE_END) {
        return Memory.IE[address - IE_START];
    } 
    else {
        abort("Error: This should be unreachable");
        return 0;
    }
}
