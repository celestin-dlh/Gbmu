export const ROM_SIZE: u16 = 0x4000; // 16384

export const ROM_0_START: u16 = 0x0000;
export const ROM_0_END: u16 = 0x3FFF;

export const ROM_1_START: u16 = 0x4000;
export const ROM_1_END: u16 = 0x7FFF;

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

export const CYCLE_PER_FRAME = 69905;

export const dmgBootRom = [
    0x31, 0xfe, 0xff, 0xaf, 0x21, 0xff, 0x9f, 0x32, 0xcb, 0x7c, 0x20, 0xfb, 0x21, 0x26, 0xff, 0x0e,
    0x11, 0x3e, 0x80, 0x32, 0xe2, 0x0c, 0x3e, 0xf3, 0xe2, 0x32, 0x3e, 0x77, 0x77, 0x3e, 0xfc, 0xe0,
    0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1a, 0xcd, 0x95, 0x00, 0xcd, 0x96, 0x00, 0x13, 0x7b,
    0xfe, 0x34, 0x20, 0xf3, 0x11, 0xd8, 0x00, 0x06, 0x08, 0x1a, 0x13, 0x22, 0x23, 0x05, 0x20, 0xf9,
    0x3e, 0x19, 0xea, 0x10, 0x99, 0x21, 0x2f, 0x99, 0x0e, 0x0c, 0x3d, 0x28, 0x08, 0x32, 0x0d, 0x20,
    0xf9, 0x2e, 0x0f, 0x18, 0xf3, 0x67, 0x3e, 0x64, 0x57, 0xe0, 0x42, 0x3e, 0x91, 0xe0, 0x40, 0x04,
    0x1e, 0x02, 0x0e, 0x0c, 0xf0, 0x44, 0xfe, 0x90, 0x20, 0xfa, 0x0d, 0x20, 0xf7, 0x1d, 0x20, 0xf2,
    0x0e, 0x13, 0x24, 0x7c, 0x1e, 0x83, 0xfe, 0x62, 0x28, 0x06, 0x1e, 0xc1, 0xfe, 0x64, 0x20, 0x06,
    0x7b, 0xe2, 0x0c, 0x3e, 0x87, 0xe2, 0xf0, 0x42, 0x90, 0xe0, 0x42, 0x15, 0x20, 0xd2, 0x05, 0x20,
    0x4f, 0x16, 0x20, 0x18, 0xcb, 0x4f, 0x06, 0x04, 0xc5, 0xcb, 0x11, 0x17, 0xc1, 0xcb, 0x11, 0x17,
    0x05, 0x20, 0xf5, 0x22, 0x23, 0x22, 0x23, 0xc9, 0xce, 0xed, 0x66, 0x66, 0xcc, 0x0d, 0x00, 0x0b,
    0x03, 0x73, 0x00, 0x83, 0x00, 0x0c, 0x00, 0x0d, 0x00, 0x08, 0x11, 0x1f, 0x88, 0x89, 0x00, 0x0e,
    0xdc, 0xcc, 0x6e, 0xe6, 0xdd, 0xdd, 0xd9, 0x99, 0xbb, 0xbb, 0x67, 0x63, 0x6e, 0x0e, 0xec, 0xcc,
    0xdd, 0xdc, 0x99, 0x9f, 0xbb, 0xb9, 0x33, 0x3e, 0x3c, 0x42, 0xb9, 0xa5, 0xb9, 0xa5, 0x42, 0x3c,
    0x21, 0x04, 0x01, 0x11, 0xa8, 0x00, 0x1a, 0x13, 0xbe, 0x20, 0xfe, 0x23, 0x7d, 0xfe, 0x34, 0x20,
    0xf5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xfb, 0x86, 0x20, 0xfe, 0x3e, 0x01, 0xe0, 0x50
];