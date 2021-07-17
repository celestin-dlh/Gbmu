import { getBitValue } from "../helpers/bitOperations";
import { readByte } from "../memory";

enum FetcherMode {
    ReadTileId = 0,
    ReadTileData0,
    ReadTileData1,
    PushToFIFO
}

export class Fetcher {
    static FIFO: u8[] = new Array<u8>(0);
    static cycle: u16 = 0;
    static mode: FetcherMode = 0;
    static mapAddr: u16 = 0;
    static tileIndex: u8 = 0;
    static tileLine: u8 = 0;
    static tileId: u16 = 0;
    static tileData: Uint8Array = new Uint8Array(8);

    static clearFIFO(): void {
        Fetcher.FIFO = new Array<u8>(0);
    }

    static reset(): void {
        Fetcher.FIFO = new Array<u8>(0);
        Fetcher.cycle = 0;
        Fetcher.mode = 0;
        Fetcher.mapAddr = 0;
        Fetcher.tileIndex = 0;
        Fetcher.tileLine = 0;
        Fetcher.tileId = 0;
        Fetcher.tileData = new Uint8Array(8);
    } 
}

export function startFetcher(mapAddr: u16, tileLine: u8): void {
    Fetcher.tileIndex = 0;
    Fetcher.mapAddr = mapAddr;
    Fetcher.tileLine = tileLine;
    Fetcher.mode = FetcherMode.ReadTileId;

    trace("New line \n", 1, tileLine);

    Fetcher.clearFIFO();
}

export function tickFetcher(): void {
    Fetcher.cycle++;
    if (Fetcher.cycle < 2)
        return;
    Fetcher.cycle = 0;

    switch (Fetcher.mode) {
        case FetcherMode.ReadTileId: {
            const addr = Fetcher.mapAddr + Fetcher.tileIndex;
            Fetcher.tileId = readByte(Fetcher.mapAddr + Fetcher.tileIndex);
            // trace(`addr: ${addr.toString(16)}`);
            // trace(`Fetcher.tileLine`, 1, Fetcher.tileLine);
            trace(`Fetcher.tileId: ${Fetcher.tileId.toString(16)}`);

            Fetcher.mode = FetcherMode.ReadTileData0;
            break;
        }
        case FetcherMode.ReadTileData0: {
            const offset: u16 = 0x8000 + (Fetcher.tileId * 16);
            trace(`Offset: ${offset.toString(16)}`);
            const addr: u16 = offset + (Fetcher.tileLine * 2);
            const byte = readByte(addr);

            // trace(`Current byte: ${byte.toString(16)}`)
            // trace(`addr: ${addr.toString(16)}`);
            // trace(`Byte: ${byte.toString(16)}`);
            for (let index: u8 = 0; index < 8; index++) {
                Fetcher.tileData[index] = <u8>getBitValue(byte, 7 - index);
            }
            Fetcher.mode = FetcherMode.ReadTileData1;
            break;
        }
        case FetcherMode.ReadTileData1: {
            const offset: u16 = 0x8000 + (Fetcher.tileId * 16);
            const addr: u16 = offset + (Fetcher.tileLine * 2) + 1;
            const byte = readByte(addr);
            // for (let index: u8 = 0; index < 8; index++) {
            //     Fetcher.tileData[index] = (byte >> index) & 1;
            // }
            Fetcher.mode = FetcherMode.PushToFIFO;
            break;
        }
        case FetcherMode.PushToFIFO: {
            if (Fetcher.FIFO.length <= 8) {
                for (let index = 7; index >= 0; index--) {
                    Fetcher.FIFO.push(Fetcher.tileData[index]);
                }
                Fetcher.tileIndex++;
                Fetcher.mode = FetcherMode.ReadTileId;
            }
            break;
        }
        default: {
            abort("UNREACHABLE FETCHER MODE");
            break;
        }
    }
}