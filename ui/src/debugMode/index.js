import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Header from './Header';
import Controls from './Controls';
import Cpu from './tabPanel/Cpu';
import Memory from './tabPanel/Memory';
import Graphics from './tabPanel/Graphics';
import * as Comlink from 'comlink';
import 'react-tabs/style/react-tabs.css';
import './index.css';


function DebugMode({ workerApi }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [memoryAddress, setMemoryAddress] = useState(0);
    const [state, setState] = useState({
        memory: [],
        disassembler: [],
        cpuRegisters: [],
        background: [],
        videoRegisters: []
    });

    const handleWorkerReturn = (state) => {
        setState(oldState => ({ ...oldState, ...state }));
    }

    const getDebugState = async (tabIndex) => {
        if (tabIndex === 0)
            await workerApi.getCpuDebug(Comlink.proxy(handleWorkerReturn));
        else if (tabIndex === 1)
            await workerApi.getMemory(memoryAddress, Comlink.proxy(handleWorkerReturn));
        else if (tabIndex === 2)
            await workerApi.getVideoDebug(Comlink.proxy(handleWorkerReturn));
    }

    useEffect(() => {
        getDebugState(tabIndex);
    }, [tabIndex]);

    useEffect(() => {
        getDebugState(1);
    }, [memoryAddress]);


    const reset = async () => {
        await workerApi.reset();
        getDebugState(tabIndex);
    }

    const step = async (stepNumber = 1) => {
        await workerApi.step(stepNumber);
        getDebugState(tabIndex);
    }
    
    const runFrame = async () => {
        await workerApi.runFrame();
        getDebugState(tabIndex);
    }
    
    const runOneSecond = async () => {
        await workerApi.runOneSecond();
        getDebugState(tabIndex);
    }

    return (
        <div class="app">
            <Header 
                workerApi={workerApi} 
                setState={setState} 
            />
            <main class="main">
                <Controls
                    reset={reset}
                    step={step}
                    runOneSecond={runOneSecond}
                    runFrame={runFrame}
                />
               <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className="main__debug">
                    <TabList>
                        <Tab>CPU</Tab>
                        <Tab>Memory</Tab>
                        <Tab>Graphics</Tab>
                        <Tab>Timers / Interrupts</Tab>
                    </TabList>

                    <TabPanel>
                        <Cpu 
                            disassembler={state.disassembler} 
                            cpuRegisters={state.cpuRegisters}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Memory 
                            memory={state.memory} 
                            memoryAddress={memoryAddress}
                            setMemoryAddress={setMemoryAddress}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Graphics 
                            videoRegisters={state.videoRegisters}
                            background={state.background}
                        />
                    </TabPanel>
                </Tabs>
            </main>
        </div>
    )
};

export default DebugMode;