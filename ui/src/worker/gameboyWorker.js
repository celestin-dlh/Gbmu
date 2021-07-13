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

    async loadRom(romBuffer) {
        this.romBuffer = romBuffer;
        this.exports.loadRom(romBuffer);
    },

    async step(stepNumber) {
        this.exports.step(stepNumber);
    },

    async runFrame() {
        this.exports.runFrame();
    },

    async runOneSecond() {
        this.exports.runOneSecond();
    },

    async reset() {
        if (this.romBuffer && this.romBuffer.length > 0)
            this.exports.loadRom(this.romBuffer);
        else 
            this.exports.reset();
    },

    async getMemory(memoryAddress = 0, cb) {
        if (cb)
            await cb({ memory: this.exports.getMemory(memoryAddress) });
        else
            return this.exports.getMemory(memoryAddress);
    },

    async getCpuDebug(cb) {
        await cb({
            disassembler: this.exports.getDisassembler(),
            cpuRegisters: this.exports.getCpuRegisters(),
        })
    },

    async getVideoDebug(cb) {
        await cb({
            background: this.exports.getBackground(),
            videoRegisters: this.exports.getVideoRegisters(),
        })
    },

    async getTimersInterruptsDebug(cb) {
        await cb({
            timersRegisters: this.exports.getTimersRegisters(),
            interruptsRegisters: this.exports.getInterruptsRegisters(),
        })
    },

    async getDebugValue(memoryAddress = 0, cb) {
        const memory = await this.getMemory(memoryAddress);
        if (cb) 
            await cb({
                memory: memory,
                disassembler: this.exports.getDisassembler(),
                cpuRegisters: this.exports.getCpuRegisters(),
                background: this.exports.getBackground(),
                videoRegisters: this.exports.getVideoRegisters(),
            });
        else
            return ({
                memory: memory,
                disassembler: this.exports.getDisassembler(),
                cpuRegisters: this.exports.getCpuRegisters(),
                background: this.exports.getBackground(),
                videoRegisters: this.exports.getVideoRegisters(),
            });
    }
};
  
Comlink.expose(gameboyWorker);