import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as Comlink from 'comlink';
import Canvas from './component/Canvas';
import Disassembler from './component/Disassembler';
import MemoryTable from './component/MemoryTable';

function DebugMode({ workerApi }) {

    useEffect(() => {
        (async () => {

        })();
    }, []);

    return (
        <main class="debug">
            {/* <Canvas /> */}
            <div class="controls">
                <button class="controls__button">Reset</button>
                <button class="controls__button">Step</button>
                <button class="controls__button">Run one frame</button>
                <button class="controls__button">Run one second</button>
            </div>

            <Disassembler />
            <table class="registers">
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
            
            </table>
            <MemoryTable workerApi={workerApi} />
        </main>
    )
};

export default DebugMode;