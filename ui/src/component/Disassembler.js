import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const nextOperations = [ [ 0xFFF, 0, 2 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ];

const numberToHexString = (number, leadingZero = 4) => {
    const hexNumber = number.toString(16).toUpperCase();
    return hexNumber.padStart(leadingZero, '0');
}

function Disassembler() {
    return (
        <table class="disassembler">
            <tr>
                <th>Address</th>
                <th>Instruction</th> 
                <th>Data</th>
            </tr>
            {nextOperations.map(instruction => (
                <tr key={`pc_${instruction[0]}`}>
                    <td>{numberToHexString(instruction[0])}</td>
                    <td>NOP</td>
                    <td>{instruction.slice(1).map(data => `${numberToHexString(data, 2)} `)}</td>
                </tr>
            ))}
        </table>
    )
};

export default Disassembler;