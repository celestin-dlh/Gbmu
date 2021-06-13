const wasm = require('../indexTest');
console.log(wasm);

// let gameBoyCpu;

// beforeAll(async () => {
//     const gameBoyCpuPtr = wasm.getGameBoyCpu();
//     gameBoyCpu = wasm.GameBoyCpu.wrap(gameBoyCpuPtr);
// });

describe('GameBoyCpu Class', () => {

    test("test", () => {
        const opcode = wasm.fetchOpcode();
        const cycleExecuted = wasm.runOpcode(opcode);
        expect(cycleExecuted).toBe(1)
    })
});
