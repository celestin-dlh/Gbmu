import { h } from 'preact';
import { formatHexNumber } from '../utils/format';

export default function VideoRegisters({ data }) {
    if (data.length <= 0)
        return null;

    return (
        <div class="registers video_registers">
            <h3 class="registers__header">Video Registers</h3>
            <table class="registers__table">
                <tr>
                    <th></th>
                    <th>Addr</th> 
                    <th>Value</th> 
                </tr>
                <tr>
                    <th>LCDC</th>
                    <td>FF40</td>
                    <td>{formatHexNumber(data[0], 2)}</td>
                </tr>
                <tr>
                    <th>STAT</th>
                    <td>FF41</td>
                    <td>{formatHexNumber(data[1], 2)}</td>
                </tr>
                <tr>
                    <th>SCY</th>
                    <td>FF42</td>
                    <td>{formatHexNumber(data[2], 2)}</td>
                </tr>
                <tr>
                    <th>SCX</th>
                    <td>FF43</td>
                    <td>{formatHexNumber(data[3], 2)}</td>
                </tr>
                <tr>
                    <th>LY</th>
                    <td>FF44</td>
                    <td>{formatHexNumber(data[4], 2)}</td>
                </tr>
                <tr>
                    <th>LYC</th>
                    <td>FF45</td>
                    <td>{formatHexNumber(data[5], 2)}</td>
                </tr>
                <tr>
                    <th>DMA</th>
                    <td>FF46</td>
                    <td>{formatHexNumber(data[6], 2)}</td>
                </tr>
                <tr>
                    <th>BGP</th>
                    <td>FF47</td>
                    <td>{formatHexNumber(data[7], 2)}</td>
                </tr>
                <tr>
                    <th>OBP0</th>
                    <td>FF48</td>
                    <td>{formatHexNumber(data[8], 2)}</td>
                </tr>
                <tr>
                    <th>OBP1</th>
                    <td>FF49</td>
                    <td>{formatHexNumber(data[9], 1)}</td>
                </tr>
                <tr>
                    <th>WY</th>
                    <td>FF4A</td>
                    <td>{formatHexNumber(data[10], 1)}</td>
                </tr>
                <tr>
                    <th>WX</th>
                    <td>FF4B</td>
                    <td>{formatHexNumber(data[11], 1)}</td>
                </tr>
                <tr>
                    <th>BCPS</th>
                    <td>FF68</td>
                    <td>{formatHexNumber(data[12], 1)}</td>
                </tr>
                <tr>
                    <th>BCPD</th>
                    <td>FF69</td>
                    <td>{formatHexNumber(data[13], 1)}</td>
                </tr>
                <tr>
                    <th>OCPS</th>
                    <td>FF6A</td>
                    <td>{formatHexNumber(data[14], 1)}</td>
                </tr>
                <tr>
                    <th>OCPD</th>
                    <td>FF6B</td>
                    <td>{formatHexNumber(data[15], 1)}</td>
                </tr>
            </table>
        </div>
    )
}