import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Header from './Header';
import Controls from './Controls';
import Cpu from './tabPanel/Cpu';
import 'react-tabs/style/react-tabs.css';
import './index.css';

function DebugMode({ workerApi }) {

    const [state, setState] = useState({
        disassembler: [],
        cpuRegister: [],
        memory: [],
        videoRegister: [],
        background: [],
    })

    console.log('render')


    return (
        <div class="app">
            <Header />
            <main class="main">
                <Controls workerApi={workerApi} setState={setState} />
                <Tabs className="main__debug">
                    <TabList>
                        <Tab>CPU</Tab>
                        <Tab>Memory</Tab>
                        <Tab>Graphics</Tab>
                        <Tab>Timers / Interrupts</Tab>
                    </TabList>

                    <TabPanel>
                        <Cpu />
                    </TabPanel>
                </Tabs>
            </main>
        </div>
    )
};

export default DebugMode;