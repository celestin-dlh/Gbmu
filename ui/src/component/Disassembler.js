import { h, Fragment } from 'preact';

const nextOperations = [ [ 0xFFFF, 0xCB, 2 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ];

const hexToInstructionName = (instruction) => {
    const opcode = instruction[1];

    switch (opcode) {
        case 0x0:
            return 'NOP'
        default:
            return 'OTHER'
    }
}

const formatHexNumber = (number, leadingZero = 4) => {
    const hexNumber = number.toString(16).toUpperCase();
    return hexNumber.padStart(leadingZero, '0');
}

function Disassembler({ nextInstructions }) {
    return (
        <table class="disassembler">
            <tr>
                <th>Address</th>
                <th>Instruction</th> 
                <th>Data</th>
            </tr>
            {nextInstructions.map(instruction => (
                <tr key={`pc_${instruction[0]}`}>
                    <td>{formatHexNumber(instruction[0])}</td>
                    <td>{hexToInstructionName(instruction)}</td>
                    <td>{instruction.slice(1).map(data => `${formatHexNumber(data, 2)} `)}</td>
                </tr>
            ))}
        </table>
    )
};

export default Disassembler;