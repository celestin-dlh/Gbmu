const fs = require("fs");
const { instantiateSync } = require("@assemblyscript/loader/umd");
const imports = { /* imports go here */ };
const wasmModule = instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);
module.exports = wasmModule.exports;