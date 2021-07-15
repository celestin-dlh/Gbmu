import { Fragment, h } from 'preact';
import { formatHexNumber } from '../../utils/format';
import { opcodeName } from '../../utils/opcodeName';
import './cpu.css';

function Disassembler({ data }) {
    return (
        <table class="disassembler">
            <tr>
                <th class="disassembler__header--small">Address</th>
                <th>Instruction</th> 
                <th class="disassembler__header--small">Data</th>
            </tr>
            {data.map(instruction => (
                <tr key={`pc_${instruction[0]}`}>
                    <td>{formatHexNumber(instruction[0])}</td>
                    <td>{opcodeName(instruction)}</td>
                    <td>{instruction.slice(1).map(data => `${formatHexNumber(data, 2)} `)}</td>
                </tr>
            ))}
        </table>
    )
};

function CpuRegisters({ registers }) {
    if (!registers || registers.length <= 0) 
        return;
    return (
        <table class="cpuRegisters">
            <tr>
                <th></th>
                <th>Value</th>
            </tr>
            <tr>
                <td>PC</td>
                <td>{formatHexNumber(registers[0], 4)}</td>
            </tr>
            <tr>
                <td>BC</td>
                <td>{formatHexNumber(registers[1], 4)}</td>
            </tr>
            <tr>
                <td>DE</td>
                <td>{formatHexNumber(registers[2], 4)}</td>
            </tr>
            <tr>
                <td>HL</td>
                <td>{formatHexNumber(registers[3], 4)}</td>
            </tr>
            <tr>
                <td>SP</td>
                <td>{formatHexNumber(registers[4], 4)}</td>
            </tr>
            <tr>
                <td>A</td>
                <td>{formatHexNumber(registers[5], 2)}</td>
            </tr>
            <tr>
                <td>F</td>
                <td>{formatHexNumber(registers[6], 2)}</td>
            </tr>
        </table>
    )
}

export default function Cpu({ disassembler, cpuRegisters }) {

    return (
        <Fragment>
            <Disassembler data={disassembler} />
            <CpuRegisters registers={cpuRegisters} />
        </Fragment>
    )
}

