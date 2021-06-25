import * as Comlink from 'comlink';
import loadWasmModule from '../../../core/index';

const gameboyWorker = {
    isInit: null,
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

    async step() {
        // run wasm step (not implemented yet)
        console.log('running step in wasm module');
        this.exports.step();
    },

    async getDebug(memoryAddress, cb) {
        const memory = await this.getMemory(memoryAddress);
        const disassembler = this.getDisassembler();
        const registers = this.getRegisters();

        await cb({
            memory,
            disassembler,
            registers
        })
    }
};
  
Comlink.expose(gameboyWorker);