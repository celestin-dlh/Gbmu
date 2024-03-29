import { h, Fragment } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { formatHexNumber } from '../../utils/format';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './graphics.css';

function VideoRegisters({ registers }) {
    if (!registers || registers.length <= 0) 
        return;
    return (
        <table class="videoRegisters">
            <tr>
                <th></th>
                <th>Address</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>LCDC</td>
                <td>FF40</td>
                <td>{registers[0].toString(2).padStart(8, '0')}</td>
            </tr>
            <tr>
                <td>STAT</td>
                <td>FF41</td>
                <td>{registers[1].toString(2).padStart(8, '0')}</td>
            </tr>
            <tr>
                <td>SCY</td>
                <td>FF42</td>
                <td>{formatHexNumber(registers[2], 2)}</td>
            </tr>
            <tr>
                <td>SCX</td>
                <td>FF43</td>
                <td>{formatHexNumber(registers[3], 2)}</td>
            </tr>
            <tr>
                <td>LY</td>
                <td>FF44</td>
                <td>{formatHexNumber(registers[4], 2)}</td>
            </tr>
            <tr>
                <td>LYC</td>
                <td>FF45</td>
                <td>{formatHexNumber(registers[5], 2)}</td>
            </tr>
            <tr>
                <td>DMA</td>
                <td>FF46</td>
                <td>{formatHexNumber(registers[6], 2)}</td>
            </tr>
            <tr>
                <td>BGP</td>
                <td>FF47</td>
                <td>{formatHexNumber(registers[7], 2)}</td>
            </tr>
            <tr>
                <td>OBP0</td>
                <td>FF48</td>
                <td>{formatHexNumber(registers[8], 2)}</td>
            </tr>
            <tr>
                <td>OBP1</td>
                <td>FF49</td>
                <td>{formatHexNumber(registers[9], 2)}</td>
            </tr>
            <tr>
                <td>WY</td>
                <td>FF4A</td>
                <td>{formatHexNumber(registers[10], 2)}</td>
            </tr>
            <tr>
                <td>WX</td>
                <td>FF4B</td>
                <td>{formatHexNumber(registers[11], 2)}</td>
            </tr>
            <tr>
                <td>BCPS</td>
                <td>FF68</td>
                <td>{formatHexNumber(registers[12], 2)}</td>
            </tr>
            <tr>
                <td>BCPD</td>
                <td>FF69</td>
                <td>{formatHexNumber(registers[13], 2)}</td>
            </tr>
            <tr>
                <td>OCPS</td>
                <td>FF6A</td>
                <td>{formatHexNumber(registers[14], 2)}</td>
            </tr>
            <tr>
                <td>OCPD</td>
                <td>FF6B</td>
                <td>{formatHexNumber(registers[15], 2)}</td>
            </tr>
        </table>
    )
}

export default function Graphics({ videoRegisters, transferControlCanvas, removeCanvasControl }) {
    const backgroundRef = useRef();
    const tileDataRef = useRef();
    
    useEffect(() => {
        if (backgroundRef && backgroundRef.current) {
            const offscreenBackground = backgroundRef.current.transferControlToOffscreen();
            transferControlCanvas(offscreenBackground);
        }
        if (tileDataRef && tileDataRef.current) {
            const offscreenTileData = tileDataRef.current.transferControlToOffscreen();
            transferControlCanvas(offscreenTileData);
        }
        return () => {
            removeCanvasControl('background');
            removeCanvasControl('tileData');
        }
    }, []);

    return (
        <Fragment>
            <VideoRegisters registers={videoRegisters} />
            <Tabs forceRenderTabPanel className="graphics__sub-table">
                <TabList>
                    <Tab>Background</Tab>
                    <Tab>Tile Data</Tab>
                </TabList>

                <TabPanel>
                    <canvas 
                        class="graphics__canvas"
                        ref={backgroundRef}
                        width={256}
                        height={256}
                    />
                </TabPanel>
                <TabPanel>
                    <canvas 
                        class="graphics__canvas"
                        ref={tileDataRef}
                        width={256}
                        height={192}
                    />
                </TabPanel>
            </Tabs>
        </Fragment>
    )
}

