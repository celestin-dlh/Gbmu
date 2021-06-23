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
        await cb("Rom loaded succesfully");
    },

    async fetchMemory(startAddress, cb) {
        const memoryTable = this.exports.getMemory(startAddress);
        await cb(memoryTable);
    }
};
  
Comlink.expose(gameboyWorker);