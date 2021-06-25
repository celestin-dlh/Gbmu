import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as Comlink from 'comlink';
import Disassembler from './component/Disassembler';
import Memory from './component/Memory';
import Registers from './component/Registers';

function DebugMode({ workerApi, uiState }) {
    const [debugState, setDebugState] = useState({
        memory: [],
        disassembler: [],
        registers: []
    })
    const [memoryAddress, setMemoryAddress] = useState(0);

    useEffect(() => {
        workerApi.getDebug(memoryAddress, Comlink.proxy(setDebugState));
    }, [memoryAddress, uiState])

    const handleStep = () => {
        workerApi.step();
        workerApi.getDebug(memoryAddress, Comlink.proxy(setDebugState));
    }

    return (
        <main class="debug">
            <div class="controls">
                <button class="controls__button">Reset</button>
                <button class="controls__button" onClick={handleStep}>Step</button>
                <button class="controls__button">Run one frame</button>
                <button class="controls__button">Run one second</button>
            </div>

            <Disassembler data={debugState.disassembler} />

            <Memory 
                data={[...debugState.memory]} 
                setMemoryAddress={setMemoryAddress} 
                memoryAddress={memoryAddress} 
            />

            <Registers data={debugState.registers} />
        </main>
    )
};

export default DebugMode;