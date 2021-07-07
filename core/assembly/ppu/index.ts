import { getBitValue } from "../helpers";
import { readMemoryMap, writeByte, writeMemoryMap } from "../memory"




class Ppu {
    static cycle: u32 = 0;
    // static fifo = new Array<u8>();
}

// function pixelFetcher(): void {
//     // const mapIndex 
//     // const tile =     
// }

// function fifo() {
    
// }

function incrementLY(): void {
    const LY = readMemoryMap(0xFF44) + 1;
    if (LY > 153) {
        writeMemoryMap(0xFF44, 0);
    } else {
        writeMemoryMap(0xFF44, LY);
    }
}


function getPPUMode(): u8 {
    const STAT = readMemoryMap(0xFF41);
    return STAT & 0b11;
}

export function syncPPU(cycle: u8): void {
    // const ppuMode =
    
    const lcdc = readMemoryMap(0xFF40);
    // bit 7 of lcdc need to be set
    if (!getBitValue(lcdc, 7)) {
        return;
    }
    
    Ppu.cycle += cycle;
    if (Ppu.cycle <= 80) {
        // OAM SEARCH
    }


    if (Ppu.cycle >= 456) {
        Ppu.cycle -= 456;
        incrementLY();
    }

    



    
}

