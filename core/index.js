// import wasmBuild from './build/optimized.wasm';
import wasmBuild from './build/untouched.wasm';
import wasmSourceMap from './build/untouched.wasm.map';
import * as AsBind from 'as-bind';

const wasm = fetch(wasmBuild);
const imports = {

};

const loadWasmModule = async () => {
    console.log(wasmSourceMap);
    const asBindInstance = await AsBind.instantiate(wasm, imports);
    return asBindInstance;
};

export default loadWasmModule;