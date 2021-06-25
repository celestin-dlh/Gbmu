import { h } from 'preact';

const regexp = /[0-9A-Fa-f]{1,4}/g;
const numberToHex = (number) => number.toString(16).padStart(4, '0').toUpperCase();

function Memory({ data, setMemoryAddress, memoryAddress }) {
    // Not really clean code but working ...
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
            <div class="memory__header">
                <h3>Memory</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        class="memory__input" 
                        type='text'
                        value={numberToHex(memoryAddress)} 
                        maxLength={4}
                    />
                </form>
            </div>
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
                {data.map((row, index) => (
                    <tr key={`memory_table_row${index}`}>
                        <th>{(memoryAddress + index * 16).toString(16).padStart(4, '0').toUpperCase()}:</th>
                        {row.map((byte) => (
                            <td>{byte.toString(16).padStart(2, '0')}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
};

export default Memory;