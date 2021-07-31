import { getBitValue, setBitValue } from "../helpers/bitOperations";
import { setInterrupt, InterruptType } from "../interrupts";
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
    static mode: PpuMode = PpuMode.OAMSearch;
    static x: u8 = 0;

    static LCDC: u8 = 0;
    static STAT: u8 = 0;
    static SCY: u8 = 0;
    static SCX: u8 = 0;
    static LY: u8 = 0;
    static LYC: u8 = 0;
    static DMA: u8 = 0;
    static BGP: u8 = 0;
    static OBP0: u8 = 0;
    static OBP1: u8 = 0;
    static WY: u8 = 0;
    static WX: u8 = 0;


    static screen: u8[] = new Array<u8>(23040).fill(0);
    
    static reset(): void {
        Ppu.cycle = 0;
        Ppu.mode = PpuMode.OAMSearch
        Ppu.x = 0;

        Ppu.LCDC = 0;
        Ppu.STAT = 0;
        Ppu.SCY = 0;
        Ppu.SCX = 0;
        Ppu.LY = 0;
        Ppu.LYC = 0;
        Ppu.DMA = 0;
        Ppu.BGP = 0;
        Ppu.OBP0 = 0;
        Ppu.OBP1 = 0;
        Ppu.WY = 0;
        Ppu.WX = 0;

        Ppu.screen = new Array<u8>(23040).fill(0);
        Fetcher.reset();
    }
}

function setPpuMode(mode: PpuMode): void {
    Ppu.mode = mode;
    if (mode == PpuMode.HBlank) {
        setBitValue(Ppu.STAT, 0, 0);
    } else if (mode == PpuMode.VBlank) {
        setBitValue(Ppu.STAT, 0, 1);
    } else if (mode == PpuMode.OAMSearch) {
        setBitValue(Ppu.STAT, 0, 0);
        setBitValue(Ppu.STAT, 1, 1);
    } else {
        setBitValue(Ppu.STAT, 0, 1);
        setBitValue(Ppu.STAT, 1, 1);
    }
}

export function tickPpu(): void {

    if (getBitValue(Ppu.LCDC, 7) == 0)
        return;

    // if (Ppu.LY == LYC) {
    //     unSafeWriteByte(0xFF41, setBitValue(STAT, 2, 1));
    // }
    // else 
    //     unSafeWriteByte(0xFF41, setBitValue(STAT, 2, 0));


    // if (getBitValue(STAT, 6) == 1 && getBitValue(STAT, 2) == 1) {
    //     setInterrupt(InterruptType.LCD_STAT);
    // }

    Ppu.cycle++;
    switch (Ppu.mode) {

        case PpuMode.OAMSearch: {
            if (Ppu.cycle == 80) {
                setPpuMode(PpuMode.PixelTransfer);
                Ppu.x = 0;
                const tileMapRowAddr: u16 = 0x9800 + (32 * (((Ppu.LY + Ppu.SCY) & 0xFF) / 8));
                const tileLine: u8 = (Ppu.LY + Ppu.SCY) % 8;
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
                Ppu.LY += 1;
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
                Ppu.LY += 1;
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
export { LCDC_ADDRESS, STAT_ADDRESS, SCY_ADDRESS, SCX_ADDRESS, LY_ADDRESS, LYC_ADDRESS, DMA_ADDRESS, BGP_ADDRESS, OBP0_ADDRESS, OBP1_ADDRESS, WX_ADDRESS, WY_ADDRESS } from './constants';