import { writeByte } from './readWriteOperations';
import { Cpu, getBC, getDE, getHL, setBC, setDE, setHL, setCarryFlag, setHalfCarryFlag, setNegativeFlag, setZeroFlag } from './cpuState';
import { getLowNibble } from './helpers';

export function loadToRegister(register: string, byte: u8): void {
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
        new Error("loadToRegister: unknown register specified");
}

export function loadToPairRegister(registerPair: string, word: u16): void {
    if (registerPair === "BC")
        setBC(word);
    else if (registerPair === "DE")
        setDE(word);
    else if (registerPair === "HL")
        setHL(word);
    else
        new Error("loadToPairRegister: unknown register pair specified");
}


export function loadToMemoryAddress(address: u16, byte: u8): void {
    writeByte(address, byte);
}


export function incrementRegisterPair(registerPair: string): void {
    if (registerPair === "BC") {
        let value = getBC();
        value = ((value + 1) & 0xFFFF); 
        setBC(value)
        // syncCycle(4)
    }
    else if (registerPair === "DE") {
        let value = getDE();
        value = ((value + 1) & 0xFFFF); 
        setDE(value)
        // syncCycle(4) 
    }
    else if (registerPair === "HL") {
        let value = getHL();
        value = ((value + 1) & 0xFFFF); 
        setHL(value)
        // syncCycle(4) 
    }
    else {
        new Error("incrementRegisterPair: unknown register pair specified");
        return;
    }
}

export function decrementRegisterPair(registerPair: string): void {
    if (registerPair === "BC") {
        let value = getBC();
        value = ((value - 1) & 0xFFFF); 
        setBC(value);
    }
    else if (registerPair === "DE") {
        let value = getDE();
        value = ((value - 1) & 0xFFFF); 
        setDE(value);
    }
    else if (registerPair === "HL") {
        let value = getHL();
        value = ((value - 1) & 0xFFFF); 
        setHL(value);
    }
    else {
        new Error("decrementRegisterPair: unknown register pair specified");
        return;
    }
    // syncCycle(4) 
}

export function incrementRegister(register: string): void {
    if (register === "B") {
        const value = ((Cpu.B + 1) & 0xFF); 
        const halfCarry = ((getLowNibble(Cpu.B) + 1) & 0x10) > 0 ? 1 : 0;
        setZeroFlag(value > 0 ? 1 : 0);
        setHalfCarryFlag(halfCarry);
        setNegativeFlag(0);
        Cpu.B = value;
    }
    else if (register === "C") {
        const value = ((Cpu.C + 1) & 0xFF); 
        const halfCarry = ((getLowNibble(Cpu.C) + 1) & 0x10) > 0 ? 1 : 0;
        setZeroFlag(value > 0 ? 1 : 0);
        setHalfCarryFlag(halfCarry);
        setNegativeFlag(0);
        Cpu.C = value;
    }
    else if (register === "D") {
        const value = ((Cpu.D + 1) & 0xFF); 
        const halfCarry = ((getLowNibble(Cpu.D) + 1) & 0x10) > 0 ? 1 : 0;
        setZeroFlag(value > 0 ? 1 : 0);
        setHalfCarryFlag(halfCarry);
        setNegativeFlag(0);
        Cpu.D = value;
    }
    else if (register === "E") {
        const value = ((Cpu.E + 1) & 0xFF); 
        const halfCarry = ((getLowNibble(Cpu.E) + 1) & 0x10) > 0 ? 1 : 0;
        setZeroFlag(value > 0 ? 1 : 0);
        setHalfCarryFlag(halfCarry);
        setNegativeFlag(0);
        Cpu.E = value;
    }
    else if (register === "H") {
        const value = ((Cpu.H + 1) & 0xFF); 
        const halfCarry = ((getLowNibble(Cpu.H) + 1) & 0x10) > 0 ? 1 : 0;
        setZeroFlag(value > 0 ? 1 : 0);
        setHalfCarryFlag(halfCarry);
        setNegativeFlag(0);
        Cpu.H = value;
    }
    else if (register === "L") {
        const value = ((Cpu.L + 1) & 0xFF); 
        const halfCarry = ((getLowNibble(Cpu.L) + 1) & 0x10) > 0 ? 1 : 0;
        setZeroFlag(value > 0 ? 1 : 0);
        setHalfCarryFlag(halfCarry);
        setNegativeFlag(0);
        Cpu.L = value;
    }
    else if (register === "A") {
        const value = ((Cpu.A + 1) & 0xFF); 
        const halfCarry = ((getLowNibble(Cpu.A) + 1) & 0x10) > 0 ? 1 : 0;
        setZeroFlag(value > 0 ? 1 : 0);
        setHalfCarryFlag(halfCarry);
        setNegativeFlag(0);
        Cpu.A = value;
    }
    else {
        new Error("incrementRegister: unknown register specified");
        return;
    }
}