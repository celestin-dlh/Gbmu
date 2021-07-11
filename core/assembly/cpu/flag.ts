import { Cpu } from '.';
import { getBitValue, setBitValue } from '../helpers/bitOperations';

export function setZeroFlag(value: bool): void {
    Cpu.F = Cpu.F & 0b1111_0000;
    if (value)
        Cpu.F = setBitValue(Cpu.F, 7, 1);
    else
        Cpu.F = setBitValue(Cpu.F, 7, 0);
}
  
export function setNegativeFlag(value: bool): void {
    Cpu.F = Cpu.F & 0b1111_0000;
    if (value) 
        Cpu.F = setBitValue(Cpu.F, 6, 1);
    else
        Cpu.F = setBitValue(Cpu.F, 6, 0);
}
  
export function setHalfCarryFlag(value: bool): void {
    Cpu.F = Cpu.F & 0b1111_0000;
    if (value)
        Cpu.F = setBitValue(Cpu.F, 5, 1);
    else
        Cpu.F = setBitValue(Cpu.F, 5, 0);
}

export function setCarryFlag(value: bool): void {
    Cpu.F = Cpu.F & 0b1111_0000;
    if (value) 
        Cpu.F = setBitValue(Cpu.F, 4, 1);
    else
        Cpu.F = setBitValue(Cpu.F, 4, 0);
}

export function getZeroFlag(): bool {
    return getBitValue(Cpu.F, 7);
}

export function getNegativeFlag(): bool {
    return getBitValue(Cpu.F, 6);
}

export function getHalfCarryFlag(): bool {
    return getBitValue(Cpu.F, 5);
}

export function getCarryFlag(): bool {
    return getBitValue(Cpu.F, 4);
}