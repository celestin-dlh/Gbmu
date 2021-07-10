import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Header from './Header';
import Cpu from './tabs/Cpu';
import './index.css';
import 'react-tabs/style/react-tabs.css';

const CustomTabPanel = ({ children, myCustomProp, ...otherProps }) => (
    <TabPanel {...otherProps}>
        {children}
    </TabPanel>
)
  
CustomTabPanel.tabsRole = 'TabPanel'

function DebugMode() {
    return (
        <div class="app">
            <Header />
            <main class="main">
                <div class="main__controls">
                    <canvas class="canvas" width={160} height={144} />
                </div>
                <div class="main__debug">
                    <ul>
                        <li class="selected">Cpu</li>
                        <li>Memory</li>
                        <li>Graphics</li>
                    </ul>
                </div>
                {/* <Tabs className="main__debug">
                    <TabList>
                        <Tab>CPU</Tab>
                        <Tab>Memory</Tab>
                        <Tab>Graphics</Tab>
                        <Tab>Timers / Interrupts</Tab>
                    </TabList>

                    <CustomTabPanel>
                        <Cpu />
                    </CustomTabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs> */}
            </main>
        </div>
    )
};

export default DebugMode;