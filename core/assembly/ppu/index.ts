import { getBitValue, setBitValue } from "../helpers/bitOperations";
import { readByte, unSafeWriteByte } from "../memory";
import { Fetcher, startFetcher, tickFetcher } from './fetcher';

enum PpuMode {
    OAMSearch = 0,
    PixelTransfer,
    HBlank,
    VBlank,
}

function getIndex(x: u16, y: u16): u16 {
    return (y * 160) + x;
}

export class Ppu {
    static cycle: u32 = 0;
    static mode: PpuMode = PpuMode.OAMSearch
    static LY: u8 = 0;
    static LYC: u8 = 0;
    static x: u8 = 0;
    static screen: u8[] = new Array<u8>(23040).fill(0);
    
    static reset(): void {
        Ppu.cycle = 0;
        Ppu.mode = PpuMode.OAMSearch
        setLY(0);
        Ppu.x = 0;
        Ppu.screen = new Array<u8>(23040).fill(0);
        Fetcher.reset();
    }
}



function setLY(LY: u8): void {
    Ppu.LY = LY;
    unSafeWriteByte(0xFF44, LY);
}

function setPpuMode(mode: PpuMode): void {
    Ppu.mode = mode;
    let STAT = readByte(0xFF41);
    if (mode == PpuMode.HBlank) {
        setBitValue(STAT, 0, 0);
    } else if (mode == PpuMode.VBlank) {
        setBitValue(STAT, 0, 1);
    } else if (mode == PpuMode.OAMSearch) {
        setBitValue(STAT, 0, 0);
        setBitValue(STAT, 1, 1);
    } else {
        setBitValue(STAT, 0, 1);
        setBitValue(STAT, 1, 1);
    }
    unSafeWriteByte(0xFF41, STAT);
}

export function tickPpu(): void {
    const LCDC = readByte(0xFF40);
    const STAT = readByte(0xFF41);
    const SCY = readByte(0xFF42);
    const LYC = readByte(0xFF45);

    if (getBitValue(LCDC, 7) == 0)
        return;

    if (Ppu.LY == LYC) {
        unSafeWriteByte(0xFF41, setBitValue(STAT, 2, 1));
    }
    else 
        unSafeWriteByte(0xFF41, setBitValue(STAT, 2, 0));


    if (getBitValue(STAT, 6) == 1 && getBitValue(STAT, 2) == 1) {
        trace("triggers a interrupts")
    }

    Ppu.cycle++;
    switch (Ppu.mode) {

        case PpuMode.OAMSearch: {
            if (Ppu.cycle == 80) {
                setPpuMode(PpuMode.PixelTransfer);
                Ppu.x = 0;
                const tileMapRowAddr: u16 = 0x9800 + (32 * (((Ppu.LY + SCY) & 0xFF) / 8));
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
                setPpuMode(PpuMode.HBlank);
            }
            break;
        }
        case PpuMode.HBlank: {
            if (Ppu.cycle == 456) {
                Ppu.cycle = 0;
                setLY(Ppu.LY + 1);
                if (Ppu.LY == 144) {
                    setPpuMode(PpuMode.VBlank);
                } else {
                    setPpuMode(PpuMode.OAMSearch);
                }
            }
            break;
        }
        case PpuMode.VBlank: {
            if (Ppu.cycle == 456) {
                Ppu.cycle = 0;
                setLY(Ppu.LY + 1);
                if (Ppu.LY == 153) {
                    Ppu.LY = 0;
                    setPpuMode(PpuMode.OAMSearch);
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