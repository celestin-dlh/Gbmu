import { Fragment, h } from 'preact';
import { formatHexNumber } from '../../utils/format';
import './timersInterrupts.css';

function TimersRegisters({ registers }) {
    if (!registers || registers.length <= 0) 
        return;
    return (
        <table class="timersRegisters">
            <tr>
                <th></th>
                <th>Address</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>DIV</td>
                <td>FF04</td>
                <td>{formatHexNumber(registers[0], 2)}</td>
            </tr>
            <tr>
                <td>TIVA</td>
                <td>FF05</td>
                <td>{formatHexNumber(registers[1], 2)}</td>
            </tr>
            <tr>
                <td>TMA</td>
                <td>FF06</td>
                <td>{formatHexNumber(registers[2], 2)}</td>
            </tr>
            <tr>
                <td>TAC</td>
                <td>FF07</td>
                <td>{registers[3].toString(2).padStart(3, '0')}</td>
            </tr>
        </table>
    )
}

function InterruptsRegisters({ registers }) {
    if (!registers || registers.length <= 0) 
        return;
    return (
        <table class="timersRegisters">
            <tr>
                <th></th>
                <th>Address</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>IME</td>
                <td></td>
                <td>{registers[0]}</td>
            </tr>
            <tr>
                <td>IE</td>
                <td>FFFF</td>
                <td>{registers[1].toString(2).padStart(5, '0')}</td>
            </tr>
            <tr>
                <td>IF</td>
                <td>FF0F</td>
                <td>{registers[2].toString(2).padStart(5, '0')}</td>
            </tr>
        </table>
    )
}

export default function TimersInterrupts({ timersRegisters, interruptsRegisters }) {
    return (
        <Fragment>
            <TimersRegisters registers={timersRegisters} />
            <InterruptsRegisters registers={interruptsRegisters} />
        </Fragment>
    )
}

