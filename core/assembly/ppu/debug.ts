import { getBitValue } from "../helpers/bitOperations";
import { readByte } from "../memory";

export function getVideoRegisters(): u8[] {
    const videoRegistersArray = new Array<u8>(15).fill(0);
    videoRegistersArray[0] = readByte(0xFF40); // LCDC
    videoRegistersArray[1] = readByte(0xFF41); // STAT
    videoRegistersArray[2] = readByte(0xFF42); // SCY
    videoRegistersArray[3] = readByte(0xFF43); // SCX
    videoRegistersArray[4] = readByte(0xFF44); // LY
    videoRegistersArray[5] = readByte(0xFF45); // LYC
    videoRegistersArray[6] = readByte(0xFF46); // DMA
    videoRegistersArray[7] = readByte(0xFF47); // BGP
    videoRegistersArray[8] = readByte(0xFF48); // OBP0
    videoRegistersArray[9] = readByte(0xFF49); // OBP1
    videoRegistersArray[10] = readByte(0xFF4A); // WY
    videoRegistersArray[11] = readByte(0xFF4B); // WX
    videoRegistersArray[12] = readByte(0xFF68); // BCPS
    videoRegistersArray[13] = readByte(0xFF69); // BCPD
    videoRegistersArray[14] = readByte(0xFF6A); // OCPS
    videoRegistersArray[15] = readByte(0xFF6B); // OCPD
    return videoRegistersArray;
}

function getIndex(x: u16, y: u16): u16 {
    return (y * 256) + x;
}

function getTileData(tileStartIndex: u16, background: u8[], xStart: u16, yStart: u16): void {
    for (let y: u8 = 0; y < 8; y++) {
        for (let x: u8 = 0; x < 8; x++) {
            const lowByte = readByte(tileStartIndex + <u16>(y * 2));
            const highByte = readByte(tileStartIndex + <u16>((y * 2) + 1));
            const highBit = (highByte << x) & 0x80;
            const lowBit = (lowByte << x) & 0x80;
            background[getIndex(xStart + x, yStart + y)] = (highBit << 1 | lowBit);
        }
    }
}

export function getBackground(): u8[] {
    const background = new Array<u8>(256 * 256).fill(0);
    const LCDC = readByte(0xFF40);
    const bgMemoryTileMap: u16 = getBitValue(LCDC, 3) ? 0x9C00 : 0x9800;
    const tileDataArea = getBitValue(LCDC, 4) ? 0x8000 : 0x8800;

    if (tileDataArea == 0x8000) {
        
        for (let index: u16 = 0; index < 1024; index++) {
            const mapIndex = bgMemoryTileMap + index;
            const valueAtIndex = <u16>readByte(mapIndex);
            const tileStartIndex: u16 = valueAtIndex * 16 + <u16>0x8000;

            const xStart = (index % 32) * 8;
            const yStart = (index / 32) * 8;

            getTileData(tileStartIndex, background, xStart, yStart);
        }
        
    } else {
        // tdb the 8800 addressing method
    }



    return background;
}