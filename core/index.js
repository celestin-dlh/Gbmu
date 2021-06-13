const fs = require("fs");
const { instantiateSync } = require("@assemblyscript/loader");
const imports = { /* imports go here */ };
const wasmModule = instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);
module.exports = wasmModule.exports;
