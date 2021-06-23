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

function MemoryTable({ workerApi}) {
    const [memoryAddress, setMemoryAddress] = useState(0x100);
    const [memoryTable, setMemoryTable] = useState(memoryTablePlaceholder)

    const fetchMemory = async () => {
        await workerApi.fetchMemory(memoryAddress, Comlink.proxy(setMemoryTable))
    }   

    return (
        <div class="memory">
            <div class="memory__header">
                <h3>Memory</h3>
                <input 
                    class="memory__input" 
                    type='text'
                    value={memoryAddress} 
                />
                <button 
                    onClick={fetchMemory}
                >
                    Go fetch memory (temp)
                </button>
            </div>

            <table className="memory__table">
                <tr>
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
                        <th>{(memoryAddress + index * 16).toString(16)}</th>
                        {row.map((byte) => (
                            <td>{byte.toString(16)}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
};

export default MemoryTable;