import { h } from 'preact';
import { formatHexNumber } from '../utils/format';

export default function Registers({ data }) {
    if (data.length <= 0)
        return null;

    const flags = (data[6] >> 4).toString(2).padStart(4, '0');

    return (
        <div class="registers">
            <h3 class="registers__header">Registers</h3>
            <table class="registers__table">
                <tr>
                    <th></th>
                    <th>Value</th> 
                </tr>
                <tr>
                    <th>PC</th>
                    <td>{formatHexNumber(data[0])}</td>
                </tr>
                <tr>
                    <th>BC</th>
                    <td>{formatHexNumber(data[1])}</td>
                </tr>
                <tr>
                    <th>DE</th>
                    <td>{formatHexNumber(data[2])}</td>
                </tr>
                <tr>
                    <th>HL</th>
                    <td>{formatHexNumber(data[3])}</td>
                </tr>
                <tr>
                    <th>SP</th>
                    <td>{formatHexNumber(data[4])}</td>
                </tr>
                <tr>
                    <th>A</th>
                    <td>{formatHexNumber(data[5], 2)}</td>
                </tr>
                <tr>
                    <th>F</th>
                    <td>{flags}</td>
                </tr>
            </table>
        </div>
    )
}