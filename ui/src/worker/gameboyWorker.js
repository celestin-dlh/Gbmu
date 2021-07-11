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

    async getMemory(memoryAddress = 0) {
        let memoryTable;
        if (memoryAddress >= 0xFF70) 
            memoryTable = this.exports.getMemory(0xFF70);
        else if (memoryAddress <= 0)
            memoryTable = this.exports.getMemory(0);
        else
            memoryTable = this.exports.getMemory(memoryAddress);
        return memoryTable;
    },

    getDisassembler() {
        return this.exports.getDisassembler();
    },
    
    getRegisters() {
        return this.exports.getRegisters();
    },

    getOtherRegister() {
        return this.exports.getOtherRegister();
    },

    getVideoRegisters() {
        return this.exports.getVideoRegisters();
    },

    getBackground() {
        const backgroundBuffer = this.exports.getBackground();
        const imageData = this.createImageData(backgroundBuffer);
        console.log(imageData);
        return imageData;
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
        const debug = this.getDebug();

        cb({
            debug,
        });
    },

    async runFrame() {
        this.exports.runFrame();
    },

    async runOneSecond() {
        this.exports.runOneSecond();
    },

    // async reset() {
    //     this.exports.reset();
    //     if (this.romBuffer && this.romBuffer.length > 0)
    //         this.exports.loadRom(this.romBuffer);
    // },

    async reset(cb) {
        await cb({
            debug: {
                disassembler: 'lot of thhings'
            },
            canvas: [1,2,1,31,4,1]
        });
    },

    async getDebug(memoryAddress, cb) {
        const memory = await this.getMemory(memoryAddress);
        const disassembler = this.getDisassembler();
        const registers = this.getRegisters();
        const otherRegisters = this.getOtherRegister();
        const videoRegisters = this.getVideoRegisters();

        await cb({
            memory,
            disassembler,
            registers,
            otherRegisters,
            videoRegisters
        })
    }
};
  
Comlink.expose(gameboyWorker);