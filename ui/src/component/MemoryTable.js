import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as Comlink from 'comlink';

const memoryTablePlaceholder = [
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
    new Array(16).fill(0),
]

const regexp = /[0-9A-Fa-f]{1,4}/g;

function MemoryTable({ workerApi}) {
    const [memoryAddress, setMemoryAddress] = useState({ value: '0000' });
    const [memoryTable, setMemoryTable] = useState(memoryTablePlaceholder)

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const { value } = ev.target[0];
        const result = [...value.matchAll(regexp)];
        if (result.length > 0) {
            const hexString = result[0][0].padStart(4, '0').toUpperCase();
            if (parseInt(hexString, 16) >= 0xFF70)
                setMemoryAddress({ value: 'FF70' });
            else if (parseInt(hexString, 16) <= 0)
                setMemoryAddress({ value: '0000' });
            else {
                setMemoryAddress({ value: hexString.slice(0, 3) + '0' });
            }
        }
        else
            setMemoryAddress({ value: 0 });
    }

    useEffect(() => {
        const fetchMemory = async (addr) => {
            await workerApi.fetchMemory(addr, Comlink.proxy(setMemoryTable));
        }   
        fetchMemory(parseInt(memoryAddress.value, 16));
    }, [memoryAddress])

    return (
        <div class="memory">
            <div class="memory__header">
                <h3>Memory</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        class="memory__input" 
                        type='text'
                        value={memoryAddress.value} 
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
                {memoryTable.map((row, index) => (
                    <tr>
                        <th>{(parseInt(memoryAddress.value, 16) + index * 16).toString(16).padStart(4, '0').toUpperCase()}:</th>
                        {row.map((byte) => (
                            <td>{byte.toString(16).padStart(2, '0')}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
};

export default MemoryTable;