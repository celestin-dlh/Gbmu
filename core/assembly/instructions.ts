import { writeByte } from './readWriteOperations';
import { Cpu, getBC, getDE, getHL, setBC, setDE, setHL } from './cpuState';

function loadToRegister(register: string, byte: u8): void {
    if (register === "B")
        Cpu.B = byte;
    else if (register === "C")
        Cpu.C = byte;
    else if (register === "D")
        Cpu.D = byte;
    else if (register === "E")
        Cpu.E = byte;
    else if (register === "H")
        Cpu.H = byte;
    else if (register === "L")
        Cpu.L = byte;
    else if(register === "A")
        Cpu.A = byte;
    else
        new Error("loadToRegister unknown register specified");
}

function loadToPairRegister(registerPair: string, word: u16): void {
    if (registerPair === "BC")
        setBC(word);
    else if (registerPair === "DE")
        setDE(word);
    else if (registerPair === "HL")
        setHL(word);
    else
        new Error("loadToPairRegister unknown register pair specified");
}


function loadToMemoryAddress(address: u16, byte: u8): void {
    writeByte(address, byte);
}

export { loadToRegister, loadToPairRegister, loadToMemoryAddress };