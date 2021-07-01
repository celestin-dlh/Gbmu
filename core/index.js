// import wasmBuild from './build/optimized.wasm';
import wasmBuild from './build/untouched.wasm';
import * as AsBind from 'as-bind';

const wasm = fetch(wasmBuild);
const imports = {
    index: {
        consoleLog: message => {
            console.log(message);
        },
        consoleNum: message => {
            console.log(message);
        },
    },
    readWriteOperations: {
        consoleLog: message => {
            console.log(message);
        },
        consoleNum: message => {
            console.log(message);
        },
    }
};

const loadWasmModule = async () => {
    const asBindInstance = await AsBind.instantiate(wasm, imports);
    return asBindInstance;
};

export default loadWasmModule;