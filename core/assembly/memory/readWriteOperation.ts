import {
    ROM_0_START,
    ROM_0_END,
    ROM_1_START,
    ROM_1_END,
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
    ROM_SIZE,
} from '../constants';
import { Cpu } from '../cpu';
import { combineBytes, getHighByte } from '../helpers/bitOperations';
import { syncCycle } from '../syncCycle';
import { Timer, DIV_ADDRESS, TIMA_ADDRESS, TAC_ADDRESS, TMA_ADDRESS } from '../timers';
import { Ppu, LCDC_ADDRESS, STAT_ADDRESS, SCY_ADDRESS, SCX_ADDRESS, LY_ADDRESS, LYC_ADDRESS, DMA_ADDRESS, BGP_ADDRESS, OBP0_ADDRESS, OBP1_ADDRESS, WX_ADDRESS, WY_ADDRESS } from '../ppu';
import { Memory } from './index';


function switchRomBank(romBankNumber: u8): void {
    for (let index: u16 = 0; index < ROM_SIZE; index++) {
        unSafeWriteByte(<u16>ROM_1_START + index, Memory.romBuffer[ROM_SIZE * romBankNumber + index]);
    }
}

export function writeByteSync(address: u16, byte: u8): void {
    writeByte(address, byte);
    syncCycle(4);
}

export function writeByte(address: u16, byte: u8): void {
    if (address >= ROM_0_START && address <= ROM_0_END) {
        if (address >= 0x2000 && address <= 0x3FFF) {
            switchRomBank(byte);
        }
    } 
    else if (address >= ROM_1_START && address <= ROM_1_END) {
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
        // timers
        if (address == DIV_ADDRESS) {
            Timer.DIV = 0;
            return;
        }
        if (address == TIMA_ADDRESS) {
            Timer.TIMA = byte;
            return;
        }
        if (address == TMA_ADDRESS) {
            Timer.TMA = byte;
            return;
        }
        if (address == TAC_ADDRESS) {
            Timer.TAC = byte;
            return;
        }

        // PPU
        if (address == LCDC_ADDRESS) {
            Ppu.LCDC = byte;
            return;
        }
        if (address == STAT_ADDRESS) {
            Ppu.STAT = byte;
            return;
        }
        if (address == SCY_ADDRESS) {
            Ppu.SCY = byte;
            return;
        }
        if (address == SCX_ADDRESS) {
            Ppu.SCX = byte;
            return;
        }
        if (address == LY_ADDRESS) {
            abort("LY is read only");
            return;
        }
        if (address == LYC_ADDRESS) {
            Ppu.LYC = byte;
            return;
        }
        if (address == DMA_ADDRESS) {
            Ppu.DMA = byte;
            return;
        }
        if (address == BGP_ADDRESS) {
            Ppu.BGP = byte;
            return;
        }
        if (address == OBP0_ADDRESS) {
            Ppu.OBP0 = byte;
            return;
        }
        if (address == OBP1_ADDRESS) {
            Ppu.OBP1 = byte;
            return;
        }
        if (address == WX_ADDRESS) {
            Ppu.WX = byte;
            return;
        }
        if (address == WY_ADDRESS) {
            Ppu.WY = byte;
            return;
        }
        Memory.ioRegisters[address - IO_REGISTERS_START] = byte;

    } 
    else if (address >= HIGH_RAM_START && address <= HIGH_RAM_END) {
        Memory.highRam[address - HIGH_RAM_START] = byte;
    } 
    else if (address >= IE_START && address <= IE_END) {
        Memory.IE[address - IE_START] = byte;
    }
    else abort("Error: This should be unreachable");
}

export function unSafeWriteByte(address: u16, byte: u8): void {
    if (address >= ROM_0_START && address <= ROM_0_END) {
        Memory.rom0[address] = byte;
    } 
    else if (address >= ROM_1_START && address <= ROM_1_END) {
        Memory.rom1[address - ROM_1_START] = byte;
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
        Memory.echoRam[address - ECHO_RAM_START] = byte;
    } 
    else if (address >= OAM_START && address <= OAM_END) {
        Memory.oam[address - OAM_START] = byte;
    } 
    else if (address >= UNUSED_MEMORY_START && address <= UNUSED_MEMORY_END) {
        Memory.unusedMemory[address - UNUSED_MEMORY_START] = byte;
    } 
    else if (address >= IO_REGISTERS_START && address <= IO_REGISTERS_END) {
        Memory.ioRegisters[address - IO_REGISTERS_START] = byte;
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
    if (address >= ROM_0_START && address <= ROM_0_END) {
        return Memory.rom0[address];
    } 
    else if (address >= ROM_1_START && address <= ROM_1_END) {
        return Memory.rom1[address - ROM_1_START];
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
        // timers
        if (address == DIV_ADDRESS) 
            return getHighByte(Timer.DIV);
        if (address == TIMA_ADDRESS)
            return Timer.TIMA;
        if (address == TMA_ADDRESS)
            return Timer.TMA;
        if (address == TAC_ADDRESS)
            return Timer.TAC;

        // PPU
        if (address == LCDC_ADDRESS)
            return Ppu.LCDC;
        if (address == STAT_ADDRESS)
            return Ppu.STAT;
        if (address == SCY_ADDRESS)
            return Ppu.SCY;
        if (address == SCX_ADDRESS)
            return Ppu.SCX;
        if (address == LY_ADDRESS)
            return Ppu.LY;
        if (address == LYC_ADDRESS)
            return Ppu.LYC;
        if (address == DMA_ADDRESS)
            return Ppu.DMA;
        if (address == BGP_ADDRESS)
            return Ppu.BGP;
        if (address == OBP0_ADDRESS)
            return Ppu.OBP0;
        if (address == OBP1_ADDRESS)
            return Ppu.OBP1;
        if (address == WX_ADDRESS)
            return Ppu.WX;
        if (address == WY_ADDRESS)
            return Ppu.WY;

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

