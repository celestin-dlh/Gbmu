import { getBitValue } from "../helpers/bitOperations";
import { readByte, unSafeWriteByte } from "../memory";
import { Fetcher, startFetcher, tickFetcher } from './fetcher';

enum PpuMode {
    OAMSearch = 0,
    PixelTransfer,
    HBlank,
    VBlank,
}

export class Ppu {
    static cycle: u32 = 0;
    static mode: PpuMode = PpuMode.OAMSearch
    static LY: u8 = 0;
    static x: u8 = 0;
    static screen: u8[] = new Array<u8>(23040).fill(0);
    
    static reset(): void {
        Ppu.cycle = 0;
        Ppu.mode = PpuMode.OAMSearch
        Ppu.LY = 0;
        Ppu.x = 0;
        Ppu.screen = new Array<u8>(23040).fill(0);
        Fetcher.reset();
    }
}

function getIndex(x: u16, y: u16): u16 {
    return (y * 160) + x;
}

function incrementLY(): void {
    const newLY = Ppu.LY + 1;
    Ppu.LY = newLY;
    unSafeWriteByte(0xFF44, newLY);
}

export function tickPpu(): void {
    const LCDC = readByte(0xFF40);
    const LY = readByte(0xFF44);
    const SCY = readByte(0xFF42);

    // check if ppu if enable
    if (getBitValue(LCDC, 7) == 0) {
        return;
    } 

    Ppu.cycle++;

    switch (Ppu.mode) {
        case PpuMode.OAMSearch: {
            if (Ppu.cycle == 80) {
                Ppu.mode = PpuMode.PixelTransfer;
                Ppu.x = 0;
                const tileMapRowAddr: u16 = 0x9800 + (32 * (((Ppu.LY + SCY) & 0xFF) / 8));
                // const tileMapRowAddr: u16 = 0x9800 + (((Ppu.LY + SCY) / 8) * 32);
                // trace(`${tileMapRowAddr.toString(16)}`)
                const tileLine: u8 = (Ppu.LY + SCY) % 8;
                startFetcher(tileMapRowAddr, tileLine);
            }
            break;
        }
        case PpuMode.PixelTransfer: {
            tickFetcher();
            if (Fetcher.FIFO.length > 0) {
                Ppu.x++;
                const poppedPixel = Fetcher.FIFO.pop();
                const screenIndex = getIndex(Ppu.x, Ppu.LY);
                Ppu.screen[screenIndex] = poppedPixel
            }
            if (Ppu.x == 160) {
                Ppu.mode = PpuMode.HBlank;
            }
            break;
        }
        case PpuMode.HBlank: {
            if (Ppu.cycle == 456) {
                Ppu.cycle = 0;
                // Ppu.LY++;
                incrementLY();
                if (Ppu.LY == 144) {
                    Ppu.mode = PpuMode.VBlank;
                } else {
                    Ppu.mode = PpuMode.OAMSearch;
                }
            }
            break;
        }
        case PpuMode.VBlank: {
            if (Ppu.cycle == 456) {
                Ppu.cycle = 0;
                // Ppu.LY++;
                incrementLY();
                if (Ppu.LY == 153) {
                    Ppu.LY = 0;
                    Ppu.mode = PpuMode.OAMSearch;
                }
            }
            break;
        }
        default: {
            abort("UNREACHABLE PPU MODE");
            break;
        }
    }
}

export { getBackground, getVideoRegisters, getWholeTileData } from './debug';