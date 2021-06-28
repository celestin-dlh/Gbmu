// import wasmBuild from './build/optimized.wasm';
import wasmBuild from './build/untouched.wasm';
import * as AsBind from 'as-bind';

const wasm = fetch(wasmBuild);
const imports = { /* imports go here */ };

const loadWasmModule = async () => {
    const asBindInstance = await AsBind.instantiate(wasm);
    return asBindInstance;
};

export default loadWasmModule;