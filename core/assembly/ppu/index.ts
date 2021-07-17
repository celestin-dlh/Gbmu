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
    static screen: u8[] = new Array<u8>(23040).fill(1);
    
    static reset(): void {
        Ppu.cycle = 0;
        Ppu.mode = PpuMode.OAMSearch
        Ppu.LY = 0;
        Ppu.x = 0;
        Ppu.screen = new Array<u8>(23040).fill(1);


        Fetcher.reset();
    }
}

function getIndex(x: u16, y: u16): u16 {
    return (y * 160) + x;
}

export function tickPpu(): void {
    const LCDC = readByte(0xFF40);
    const LY = readByte(0xFF44);

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

                const tileMapRowAddr: u16 = 0x9900 + ((Ppu.LY / 8) * 32);
                const tileLine: u8 = Ppu.LY % 8;
                // trace(`tileMapRowAddr ${tileMapRowAddr.toString(16)}`)
                startFetcher(tileMapRowAddr, tileLine);
            }
            break;
        }
        case PpuMode.PixelTransfer: {
            tickFetcher();

            if (Fetcher.FIFO.length > 0) {
                Ppu.x += 1;
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
                // trace("Hblank period !");

                Ppu.cycle = 0;
                Ppu.LY += 1;
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
                Ppu.LY += 1;
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