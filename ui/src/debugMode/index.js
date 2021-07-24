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
import TimersInterrupts from './tabPanel/TimersInterrupts';

function DebugMode({ workerApi }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [memoryAddress, setMemoryAddress] = useState(0);
    const [state, setState] = useState({
        memory: [],
        disassembler: [],
        cpuRegisters: [],
        videoRegisters: [],
        timersRegisters: [],
        interruptsRegisters: [],
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
        else if (tabIndex === 3)
            await workerApi.getTimersInterruptsDebug(Comlink.proxy(handleWorkerReturn));
    }

    useEffect(() => {
        getDebugState(tabIndex);
    }, [tabIndex, memoryAddress]);


    const reset = async () => {
        await workerApi.reset();
        getDebugState(tabIndex);
    }

    const loadRom = async (romBuffer) => {
        await workerApi.loadRom(romBuffer);
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
    
    const transferControlCanvas = async (offscreen) => {
        await workerApi.initCanvas(Comlink.transfer(offscreen, [offscreen]));
    }

    const removeCanvasControl = async (canvasId) => {
        await workerApi.removeCanvasControl(canvasId);
    }

    const runPlayPause = async () => {
        const isPlaying = await workerApi.intervalId ? true : false;
        if (isPlaying) {
            console.log('pause');
            await workerApi.pause();
        } else {
            console.log('play');
            await workerApi.play();
        }
    }

    return (
        <div class="app">
            <Header 
                loadRom={loadRom}
            />
            <main class="main">
                <Controls
                    reset={reset}
                    step={step}
                    runFrame={runFrame}
                    runPlayPause={runPlayPause}
                    transferControlCanvas={transferControlCanvas}
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
                            transferControlCanvas={transferControlCanvas}
                            removeCanvasControl={removeCanvasControl}
                        />
                    </TabPanel>
                    <TabPanel>
                        <TimersInterrupts 
                            timersRegisters={state.timersRegisters}
                            interruptsRegisters={state.interruptsRegisters}
                        />
                    </TabPanel>
                </Tabs>
            </main>
        </div>
    )
};

export default DebugMode;