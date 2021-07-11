import { readByte } from ".";

function getMemoryRow(address: u16): u8[] {
    const row = new Array<u8>(0);
    for (let index = 0; index < 16; index++) {
        const addr = address + <u16>index;
        row.push(readByte(addr));
    }
    return row;
}

export function getMemory(startAddress: u16): u8[][] {
    let safeStartAddress = startAddress;
    if (startAddress >= 0xFF70)
        safeStartAddress = 0xFF70;
    else if (startAddress <= 0)
        safeStartAddress = 0;

    const memory = new Array<u8[]>(0);
    for (let index = 0; index < 9; index++) {
        const row = getMemoryRow(safeStartAddress + (<u16>index * 16))
        memory.push(row);
    }
    return memory;
}