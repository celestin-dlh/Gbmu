import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as Comlink from 'comlink';
import Disassembler from './component/Disassembler';
import Memory from './component/Memory';
import Registers from './component/Registers';
import Controls from './component/Controls';
import OtherRegisters from './component/OtherRegisters';

function DebugMode({ workerApi, uiState }) {
    const [debugState, setDebugState] = useState({
        memory: [],
        disassembler: [],
        registers: [],
        otherRegisters: []
    })
    const [memoryAddress, setMemoryAddress] = useState(0x100);

    useEffect(() => {
        workerApi.getDebug(memoryAddress, Comlink.proxy(setDebugState));
    }, [memoryAddress, uiState])

    const executeStep = (stepTimes = 1) => {
        workerApi.step(stepTimes);
        workerApi.getDebug(memoryAddress, Comlink.proxy(setDebugState));
    }

    const executeFrame = () => {
        workerApi.runFrame();
        workerApi.getDebug(memoryAddress, Comlink.proxy(setDebugState));
    }

    const reset = () => {
        workerApi.reset();
        workerApi.getDebug(memoryAddress, Comlink.proxy(setDebugState));
    }

    return (
        <main class="debug">

            <Controls executeStep={executeStep} executeFrame={executeFrame} reset={reset} />

            <Disassembler data={debugState.disassembler} />

            <Memory 
                data={[...debugState.memory]} 
                setMemoryAddress={setMemoryAddress} 
                memoryAddress={memoryAddress} 
            />

            <Registers data={debugState.registers} />
            <OtherRegisters data={debugState.otherRegisters} />
        </main>
    )
};

export default DebugMode;