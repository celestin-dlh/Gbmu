import { h } from 'preact';
import { formatHexNumber } from '../../utils/format';
import { opcodeName } from '../../utils/opcodeName';
import './cpu.css';

function Disassembler({ data }) {
    return (
        <div class="disassembler">
            <h3 class="disassembler__header">Disassembler</h3>
            <table class="disassembler__table">
                <tr>
                    <th class="disassembler__address">Address</th>
                    <th>Instruction</th> 
                    <th>Data</th>
                </tr>
                {data.map(instruction => (
                    <tr key={`pc_${instruction[0]}`}>
                        <td>{formatHexNumber(instruction[0])}</td>
                        <td>{opcodeName(instruction)}</td>
                        <td>{instruction.slice(1).map(data => `${formatHexNumber(data, 2)} `)}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
};

function CpuRegisters({ registers }) {
    if (!registers || registers.length <= 0) 
        return;
    return (
        <div class="cpuRegisters">
            <h3 class="cpuRegisters__header">Registers</h3>
            <table class="cpuRegisters__table">
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
        </div>
    )
}

export default function Cpu({ disassembler, cpuRegisters }) {

    return (
        <div class="cpu__container">
            <Disassembler data={disassembler} />
            <CpuRegisters registers={cpuRegisters} />
        </div>
    )
}

