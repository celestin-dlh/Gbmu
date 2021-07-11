import { h } from 'preact';
import { formatHexNumber } from '../../utils/format';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


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
                        <td>{hexToInstructionName(instruction)}</td>
                        <td>{instruction.slice(1).map(data => `${formatHexNumber(data, 2)} `)}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
};

export default function Cpu({ text }) {
    return (
        <div>
            {/* <Disassembler /> */}
        </div>
    )
}

