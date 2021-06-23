const wasm = require('../indexTest');
const fs = require('fs');

beforeAll(() => {
    const rom = fs.readFileSync(__dirname + "/../roms/individuals_cpu/08-misc instrs.gb");
    wasm.loadRom(rom);
})


describe('GameBoy Load Rom', () => {
    test("null", () => {
        const result = wasm.getMemory(0x0100);
        console.log(result)
        expect(1).toBe(1)
    })
});
