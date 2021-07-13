import { h } from 'preact';
import { formatHexNumber } from '../../utils/format';
import './memory.css';

const regexp = /[0-9A-Fa-f]{1,4}/g;

export default function Memory({ memory, memoryAddress, setMemoryAddress }) {
    if (!memory || memory.length <= 0)
        return;

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const { value } = ev.target[0];
        const result = [...value.matchAll(regexp)];
        if (result.length > 0) {
            const hexString = result[0][0].padStart(4, '0');
            if (parseInt(hexString, 16) >= 0xFF70)
                setMemoryAddress(0xFF70);
            else if (parseInt(hexString, 16) <= 0)
                setMemoryAddress(0);
            else {
                const roundedNum = hexString.slice(0, 3) + '0';
                setMemoryAddress(parseInt(roundedNum, 16));
            }
        }
        else setMemoryAddress(0);
    }

    return (
        <div class="memory">
            <form  
                class="memory__form"
                onSubmit={handleSubmit}
            >
                <input 
                    class="memory__input" 
                    type='text'
                    value={formatHexNumber(memoryAddress)} 
                    maxLength={4}
                />
            </form>
            <table class="memory__table">
                <tr class="memory__table__header">
                    <th>Addr</th>
                    <th>x0</th> 
                    <th>x1</th> 
                    <th>x2</th> 
                    <th>x3</th> 
                    <th>x4</th> 
                    <th>x5</th> 
                    <th>x6</th> 
                    <th>x7</th> 
                    <th>x8</th> 
                    <th>x9</th> 
                    <th>xA</th> 
                    <th>xB</th> 
                    <th>xC</th> 
                    <th>xD</th> 
                    <th>xE</th> 
                    <th>xF</th> 
                </tr>
                {memory.map((row, index) => (
                    <tr key={`memory_table_row${index}`}>
                        <th>{formatHexNumber(memoryAddress + index * 16)}:</th>
                        {row.map((byte) => (
                            <td>{formatHexNumber(byte, 2)}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
};