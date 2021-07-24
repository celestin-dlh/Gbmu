import * as Comlink from 'comlink';
import loadWasmModule from '../../../core/index';
import { createImageData } from '../utils/createImageData';

const gameboyWorker = {
    exports: null,
    romBuffer: null,
    screenContext: null,
    backgroundContext: null,
    tileDataContext: null,
    intervalId: null,

    async loadWasm(cb) {
        const { exports } = await loadWasmModule();
        this.exports = exports;
        await cb("Init wasm in webWorker ended")
    },

    async initCanvas(offscreen) {
        if (offscreen.width === 256 && offscreen.height === 256)
            this.backgroundContext = offscreen.getContext('2d');
        else if (offscreen.width === 256 && offscreen.height === 192)
            this.tileDataContext = offscreen.getContext('2d');
        else if (offscreen.width === 160 && offscreen.height === 144)
            this.screenContext = offscreen.getContext('2d');
    },
    
    async removeCanvasControl(canvasId) {
        if (canvasId === 'background')
            this.backgroundContext = null;
        if (canvasId === 'tileData')
            this.tileDataContext = null;
    },
    
    async loadRom(romBuffer) {
        this.pause();
        this.romBuffer = romBuffer;
        this.exports.loadRom(romBuffer);
    },

    async step(stepNumber) {
        this.pause();
        this.exports.step(stepNumber);
    },

    async play() {
        this.intervalId = setInterval(() => {
            this.exports.runFrame();
            const screen = this.exports.getScreen();
            const imageData = createImageData(screen, 160, 144);
            this.screenContext.putImageData(imageData, 0, 0);

            if (this.backgroundContext) {
                const background = this.exports.getBackground();
                const imageDataBackground = createImageData(background, 256, 256);
                this.backgroundContext.putImageData(imageDataBackground, 0, 0);
            }

            if (this.tileDataContext) {
                const tileData = this.exports.getWholeTileData();
                const imageDataTile = createImageData(tileData, 256, 192);
                this.tileDataContext.putImageData(imageDataTile, 0, 0);
            }
            
        }, 1000 / 60);
    },

    async pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },

    async runFrame() {
        this.pause();
        this.exports.runFrame();
    },

    async runOneSecond() {
        this.pause();
        this.exports.runOneSecond();
    },

    async reset() {
        this.pause();
        if (this.romBuffer && this.romBuffer.length > 0)
            this.exports.loadRom(this.romBuffer);
        else 
            this.exports.reset();
    },

    async getMemory(memoryAddress = 0, cb) {
        if (cb)
            await cb({ 
                memory: this.exports.getMemory(memoryAddress),
                screen: this.exports.getScreen()
            });
        else
            return this.exports.getMemory(memoryAddress);
    },

    async getCpuDebug(cb) {
        await cb({
            disassembler: this.exports.getDisassembler(),
            cpuRegisters: this.exports.getCpuRegisters(),
            screen: this.exports.getScreen()
        })
    },

    async getVideoDebug(cb) {
        await cb({
            background: this.exports.getBackground(),
            videoRegisters: this.exports.getVideoRegisters(),
            tileData: this.exports.getWholeTileData(),
            screen: this.exports.getScreen()
        })
    },

    async getTimersInterruptsDebug(cb) {
        await cb({
            timersRegisters: this.exports.getTimersRegisters(),
            interruptsRegisters: this.exports.getInterruptsRegisters(),
            screen: this.exports.getScreen()
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