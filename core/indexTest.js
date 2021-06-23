const fs = require("fs");
// const { instantiateSync } = require("@assemblyscript/loader/umd");
const AsBind = require('as-bind/dist/as-bind.cjs');
const imports = { /* imports go here */ };

const wasmModule = AsBind.instantiateSync(
    fs.readFileSync(__dirname + "/build/untouched.wasm"),
    imports
);
module.exports = wasmModule.exports;