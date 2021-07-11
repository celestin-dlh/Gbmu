import * as Comlink from 'comlink';
import loadWasmModule from '../../../core/index';

const gameboyWorker = {
    exports: null,
    romBuffer: null,
    canvasContext: null,
    playing: false,

    async loadWasm(cb) {
        const { exports } = await loadWasmModule();
        this.exports = exports;
        await cb("Init wasm in webWorker ended")
    },

    async loadRom(romBuffer, cb) {
        this.romBuffer = romBuffer;
        this.exports.loadRom(romBuffer);
        await cb("Rom loaded succesfully");
    },

    createImageData(videoMemory) {
        const buffer = new Uint8ClampedArray(65536 * 4);
        let index = 0;
        videoMemory.forEach((elem) => {
          if (elem === 0) {
            buffer[index] = 0;
            buffer[index + 1] = 0;
            buffer[index + 2] = 0;
          } else {
            buffer[index] = 255;
            buffer[index + 1] = 255;
            buffer[index + 2] = 255;
          }
          buffer[index + 3] = 255;
          index += 4;
        });
       
        const imageData = new ImageData(buffer, 256, 256);
        return imageData;
    },

    async step(stepNumber, cb) {
        this.exports.step(stepNumber);
        const debugValues = await this.getDebugValue();
        await cb(debugValues);
    },

    async reset(cb) {
        this.exports.reset();
        const debugValues = await this.getDebugValue();
        await cb(debugValues);
    },

    async getMemory(memoryAddress = 0, cb) {
        if (cb)
            await cb(this.exports.getMemory(memoryAddress));
        else
            return this.exports.getMemory(memoryAddress);
    },

    async getDebugValue(memoryAddress = 0) {
        const memory = await this.getMemory(memoryAddress);
        return ({
            memory: memory,
            disassembler: this.exports.getDisassembler(),
            cpuRegisters: this.exports.getCpuRegisters()
        })
    }
};
  
Comlink.expose(gameboyWorker);