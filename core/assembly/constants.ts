export const ROM_SIZE: u16 = 0x8000; // 32768
export const ROM_START: u16 = 0x0000;
export const ROM_END: u16 = 0x7FFF;

export const VIDEO_RAM_SIZE: u16 = 0x2000; // 8192
export const VIDEO_RAM_START: u16 = 0x8000;
export const VIDEO_RAM_END: u16 = 0x9FFF;

export const EXTERNAL_RAM_SIZE: u16 = 0x2000; // 8192
export const EXTERNAL_RAM_START: u16 = 0xA000;
export const EXTERNAL_RAM_END: u16 = 0xBFFF;

export const WORK_RAM_SIZE: u16 = 0x2000; // 8192
export const WORK_RAM_START: u16 = 0xC000;
export const WORK_RAM_END: u16 = 0xDFFF;

export const ECHO_RAM_SIZE: u16 = 0x1E00; // 7680
export const ECHO_RAM_START: u16 = 0xE000;
export const ECHO_RAM_END: u16 = 0xFDFF;

export const OAM_SIZE: u16 = 0xA0; // 160
export const OAM_START: u16 = 0xFE00;
export const OAM_END: u16 = 0xFE9F;

export const UNUSED_MEMORY_SIZE: u16 = 0x60; // 96
export const UNUSED_MEMORY_START: u16 = 0xFEA0;
export const UNUSED_MEMORY_END: u16 = 0xFEFF;

export const IO_REGISTERS_SIZE: u16 = 0x80; // 128
export const IO_REGISTERS_START: u16 = 0xFF00;
export const IO_REGISTERS_END: u16 = 0xFF7F;

export const HIGH_RAM_SIZE: u16 = 0x7F; // 127
export const HIGH_RAM_START: u16 = 0xFF80;
export const HIGH_RAM_END: u16 = 0xFFFE;

export const IE_SIZE: u16 = 0x1; // 1
export const IE_START: u16 = 0xFFFF;
export const IE_END: u16 = 0xFFFF;
