import { h, Fragment } from 'preact';

const nextOperations = [ [ 0xFFFF, 0xCB, 2 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ];

const hexToInstructionName = (instruction) => {
    const opcode = instruction[1];

    switch (opcode) {
        case 0x0: return 'NOP'
        case 0x1: return 'LD BC, nn'
        case 0x2: return 'LD (BC), a'
        case 0x3: return 'INC BC'
        case 0x4: return 'INC B'
        case 0x5: return 'DEC B'
        case 0x6: return 'LD B, n'
        case 0x7: return 'RLCA'
        case 0x8: return 'LD (nn), SP'
        case 0x9: return 'ADD HL, BC'
        case 0xA: return 'LD A, (BC)'
        case 0xB: return 'DEC BC'
        case 0xC: return 'INC C'
        case 0xD: return 'DEC C'
        case 0xE: return 'LD C, n'
        case 0xF: return 'RRCA'

        case 0x10: return "STOP"
        case 0x11: return "LD DE, nn"
        case 0x12: return "LD (DE), A"
        case 0x13: return "INC DE"
        case 0x14: return "INC D"
        case 0x15: return "DEC D"
        case 0x16: return "LD D, n"
        case 0x17: return "RLA"
        case 0x18: return "JR n"
        case 0x19: return "ADD HL, DE"
        case 0x1A: return "LD A, (DE)"
        case 0x1B: return "DEC DE"
        case 0x1C: return "INC E"
        case 0x1D: return "DEC E"
        case 0x1E: return "LD E, n"
        case 0x1F: return "RRA"

        case 0x20: return "JR NZ, n"
        case 0x21: return "LD HL, nn"
        case 0x22: return "LD (HL+),A"
        case 0x23: return "INC HL"
        case 0x24: return "INC H"
        case 0x25: return "DEC H"
        case 0x26: return "LD H, n"
        case 0x27: return "DAA"
        case 0x28: return "JR Z, n"
        case 0x29: return "ADD HL, HL"
        case 0x2A: return "LD A, (HL+)"
        case 0x2B: return "DEC HL"
        case 0x2C: return "INC L"
        case 0x2D: return "DEC L"
        case 0x2E: return "LD L, n"
        case 0x2F: return "CPL"

        case 0x30: return "JR NC, n"
        case 0x31: return "LD SP, nn"
        case 0x32: return "LD (HL-),A"
        case 0x33: return "INC SP"
        case 0x34: return "INC (HL)"
        case 0x35: return "DEC (HL)"
        case 0x36: return "LD (HL), n"
        case 0x37: return "SCF"
        case 0x38: return "JR C, n"
        case 0x39: return "ADD HL, SP"
        case 0x3A: return "LD A, (HL-)"
        case 0x3B: return "DEC SP"
        case 0x3C: return "INC A"
        case 0x3D: return "DEC A"
        case 0x3E: return "LD A, n"
        case 0x3F: return "CCF"

        case 0x40: return "LD B, B"
        case 0x41: return "LD B, C"
        case 0x42: return "LD B, D"
        case 0x43: return "LD B, E"
        case 0x44: return "LD B, H"
        case 0x45: return "LD B, L"
        case 0x46: return "LD B, (HL)"
        case 0x47: return "LD B, A"
        case 0x48: return "LD C, B"
        case 0x49: return "LD C, C"
        case 0x4A: return "LD C, D"
        case 0x4B: return "LD C, E"
        case 0x4C: return "LD C, H"
        case 0x4D: return "LD C, L"
        case 0x4E: return "LD C, (HL)"
        case 0x4F: return "LD C, A"
        
        case 0x50: return "LD D, B"
        case 0x51: return "LD D, C"
        case 0x52: return "LD D, D"
        case 0x53: return "LD D, E"
        case 0x54: return "LD D, H"
        case 0x55: return "LD D, L"
        case 0x56: return "LD D, (HL)"
        case 0x57: return "LD D, A"
        case 0x58: return "LD E, B"
        case 0x59: return "LD E, C"
        case 0x5A: return "LD E, D"
        case 0x5B: return "LD E, E"
        case 0x5C: return "LD E, H"
        case 0x5D: return "LD E, L"
        case 0x5E: return "LD E, (HL)"
        case 0x5F: return "LD E, A"

        default: return 'TO BE DONE'
    }
}

const formatHexNumber = (number, leadingZero = 4) => {
    const hexNumber = number.toString(16).toUpperCase();
    return hexNumber.padStart(leadingZero, '0');
}

function Disassembler({ data }) {
    return (
        <div class="disassembler">
            <h3 class="disassembler__header">Disassembler</h3>
            <table class="disassembler__table">
                <tr>
                    <th>Address</th>
                    <th>Instruction</th> 
                    <th>Data</th>
                </tr>
                {data.map(instruction => (
                    <tr key={`pc_${instruction[0]}`}>
                        <td>{formatHexNumber(instruction[0])}</td>
                        <td>{hexToInstructionName(instruction)}</td>
                        <td>{instruction.slice(1).map(data => `${formatHexNumber(data, 2)} `)}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
};

export default Disassembler;