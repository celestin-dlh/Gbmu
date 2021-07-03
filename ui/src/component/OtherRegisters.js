import { h } from 'preact';
import { formatHexNumber } from '../utils/format';

export default function OtherRegisters({ data }) {
    if (data.length <= 0)
        return null;

    return (
        <div class="registers other_registers">
            <h3 class="registers__header">Other Registers</h3>
            <table class="registers__table">
                <tr>
                    <th></th>
                    <th>Addr</th> 
                    <th>Value</th> 
                </tr>
                <tr>
                    <th>P1</th>
                    <td>FF00</td>
                    <td>{formatHexNumber(data[0], 2)}</td>
                </tr>
                <tr>
                    <th>SB</th>
                    <td>FF01</td>
                    <td>{formatHexNumber(data[1], 2)}</td>
                </tr>
                <tr>
                    <th>SC</th>
                    <td>FF02</td>
                    <td>{formatHexNumber(data[2], 2)}</td>
                </tr>
                <tr>
                    <th>DIV</th>
                    <td>FF04</td>
                    <td>{formatHexNumber(data[3], 2)}</td>
                </tr>
                <tr>
                    <th>TIMA</th>
                    <td>FF05</td>
                    <td>{formatHexNumber(data[4], 2)}</td>
                </tr>
                <tr>
                    <th>TMA</th>
                    <td>FF06</td>
                    <td>{formatHexNumber(data[5], 2)}</td>
                </tr>
                <tr>
                    <th>TAC</th>
                    <td>FF07</td>
                    <td>{formatHexNumber(data[6], 2)}</td>
                </tr>
                <tr>
                    <th>IF</th>
                    <td>FF0F</td>
                    <td>{formatHexNumber(data[7], 2)}</td>
                </tr>
                <tr>
                    <th>IE</th>
                    <td>FFFF</td>
                    <td>{formatHexNumber(data[8], 2)}</td>
                </tr>
                <tr>
                    <th>IME</th>
                    <td></td>
                    <td>{formatHexNumber(data[9], 1)}</td>
                </tr>
            </table>
        </div>
    )
}