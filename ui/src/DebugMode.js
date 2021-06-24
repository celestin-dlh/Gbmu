import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as Comlink from 'comlink';
import Canvas from './component/Canvas';
import Disassembler from './component/Disassembler';
import MemoryTable from './component/MemoryTable';

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
];

const disassembler = [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ];


function DebugMode({ workerApi }) {
    const [debugState, setDebugState] = useState({
        memory: memoryTablePlaceholder,
        disassembler: disassembler
    })

    const [memoryAddress, setMemoryAddress] = useState({ value: '0000' });

    useEffect(() => {
        workerApi.getDebug(parseInt(memoryAddress.value, 16), Comlink.proxy(setDebugState));
    }, [memoryAddress])

    const handleStep = () => {
        workerApi.step();
        workerApi.getDebug(parseInt(memoryAddress.value, 16), Comlink.proxy(setDebugState));
    }

    return (
        <main class="debug">
            <div class="controls">
                <button class="controls__button">Reset</button>
                <button class="controls__button" onClick={handleStep}>Step</button>
                <button class="controls__button">Run one frame</button>
                <button class="controls__button">Run one second</button>
            </div>

            <Disassembler nextInstructions={debugState.disassembler} />
            <MemoryTable memory={[...debugState.memory]} setMemoryAddress={setMemoryAddress} memoryAddress={memoryAddress} />
            {/* <table class="registers">
                <tr>
                    <th></th>
                    <th>Value</th> 
                </tr>
                <tr>
                    <th>PC</th>
                    <td>342</td>
                </tr>
                <tr>
                    <th>AF</th>
                    <td>342</td>
                </tr>
                <tr>
                    <th>BC</th>
                    <td>342</td>
                </tr>
                <tr>
                    <th>DE</th>
                    <td>342</td>
                </tr>
                <tr>
                    <th>HL</th>
                    <td>342</td>
                </tr>
                <tr>
                    <th>SP</th>
                    <td>342</td>
                </tr>
            
            </table> */}
        </main>
    )
};

export default DebugMode;