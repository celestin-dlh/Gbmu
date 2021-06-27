export function getLowNibble(byte: u8): u8 {
    return (byte & 0xF);    
}

export function getHighNibble(byte: u8): u8 {
    return ((byte & 0xF0) >> 4);    
}

export function getLowByte(word: u16): u8 {
    return <u8>(word & 0xFF);
}

export function getHighByte(word: u16): u8 {
    return <u8>((word & 0xFF00) >> 8);
}

export function combineBytes(highByte: u8, lowByte: u8): u16 {
   return (<u16>highByte << 8) | <u16>lowByte;
}