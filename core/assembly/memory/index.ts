import {
    ROM_SIZE,
    VIDEO_RAM_SIZE,
    EXTERNAL_RAM_SIZE,
    WORK_RAM_SIZE,
    ECHO_RAM_SIZE,
    OAM_SIZE,
    UNUSED_MEMORY_SIZE,
    IO_REGISTERS_SIZE,
    HIGH_RAM_SIZE,
    IE_SIZE
} from '../constants';
import { writeByte } from './readWriteOperation';

export class Memory {
    static rom0: Uint8Array = new Uint8Array(ROM_SIZE).fill(0);
    static rom1: Uint8Array = new Uint8Array(ROM_SIZE).fill(0);
    static videoRam: Uint8Array = new Uint8Array(VIDEO_RAM_SIZE).fill(0);
    static externalRam: Uint8Array = new Uint8Array(EXTERNAL_RAM_SIZE).fill(0);
    static workRam: Uint8Array = new Uint8Array(WORK_RAM_SIZE).fill(0);
    static echoRam: Uint8Array = new Uint8Array(ECHO_RAM_SIZE).fill(0);
    static oam: Uint8Array = new Uint8Array(OAM_SIZE).fill(0);
    static unusedMemory: Uint8Array = new Uint8Array(UNUSED_MEMORY_SIZE).fill(0);
    static ioRegisters: Uint8Array = new Uint8Array(IO_REGISTERS_SIZE).fill(0);
    static highRam: Uint8Array = new Uint8Array(HIGH_RAM_SIZE).fill(0);
    static IE: Uint8Array = new Uint8Array(IE_SIZE).fill(0);

    static romBuffer: Uint8Array;

    // MBC
    static romBankNumber: u8 = 1;

    static reset(): void {
        Memory.rom0 = new Uint8Array(ROM_SIZE).fill(0);
        Memory.rom1 = new Uint8Array(ROM_SIZE).fill(0);
        Memory.videoRam = new Uint8Array(VIDEO_RAM_SIZE).fill(0);
        Memory.externalRam = new Uint8Array(EXTERNAL_RAM_SIZE).fill(0);
        Memory.workRam = new Uint8Array(WORK_RAM_SIZE).fill(0);
        Memory.echoRam = new Uint8Array(ECHO_RAM_SIZE).fill(0);
        Memory.oam = new Uint8Array(OAM_SIZE).fill(0);
        Memory.unusedMemory = new Uint8Array(UNUSED_MEMORY_SIZE).fill(0);
        Memory.ioRegisters = new Uint8Array(IO_REGISTERS_SIZE).fill(0);
        Memory.highRam = new Uint8Array(HIGH_RAM_SIZE).fill(0);
        Memory.IE = new Uint8Array(IE_SIZE).fill(0);

        Memory.romBankNumber = 1;
    }
}

export function setDefaultValue(): void {
    writeByte(0xFF05, 0x0);
    writeByte(0xFF06, 0x0);
    writeByte(0xFF07, 0x0);
    writeByte(0xFF10, 0x80);
    writeByte(0xFF11, 0xBF);
    writeByte(0xFF12, 0xF3);
    writeByte(0xFF14, 0xBF);
    writeByte(0xFF16, 0x3F);
    writeByte(0xFF17, 0x00);
    writeByte(0xFF19, 0xBF);
    writeByte(0xFF1A, 0x7F);
    writeByte(0xFF1B, 0xFF);
    writeByte(0xFF1C, 0x9F);
    writeByte(0xFF1E, 0xBF);
    writeByte(0xFF20, 0xFF);
    writeByte(0xFF21, 0x00);
    writeByte(0xFF22, 0x00);
    writeByte(0xFF23, 0xBF);
    writeByte(0xFF24, 0x77);
    writeByte(0xFF25, 0xF3);
    writeByte(0xFF26, 0xF1);
    writeByte(0xFF40, 0x91);
    writeByte(0xFF42, 0x00);
    writeByte(0xFF43, 0x00);

    writeByte(0xFF45, 0x00);
    writeByte(0xFF47, 0xFC);
    writeByte(0xFF48, 0xFF);
    writeByte(0xFF49, 0xFF);
    writeByte(0xFF4A, 0x00);
    writeByte(0xFF4B, 0x00);
    writeByte(0xFFFF, 0x00);
}

export { readByte, readByteSync, readByteAtPc, readWordAtPc, writeByte, writeByteSync, unSafeWriteByte } from './readWriteOperation';
export { getMemory } from './debug';