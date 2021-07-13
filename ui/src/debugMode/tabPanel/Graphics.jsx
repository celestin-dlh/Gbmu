import { h, Fragment } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { formatHexNumber } from '../../utils/format';
import { createImageData } from '../../utils/createImageData';
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
                <td>{formatHexNumber(registers[0], 2)}</td>
            </tr>
            <tr>
                <td>STAT</td>
                <td>FF41</td>
                <td>{formatHexNumber(registers[1], 2)}</td>
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

export default function Graphics({ videoRegisters, background, tileData }) {
    const backgroundRef = useRef();
    const backgroundContextRef = useRef();
    const tileDataRef = useRef();
    const tileDataContextRef = useRef();
    
    useEffect(() => {
        if (backgroundRef && backgroundRef.current) {
            backgroundContextRef.current = backgroundRef.current.getContext('2d');
        }
        if (tileDataRef && tileDataRef.current) {
            tileDataContextRef.current = tileDataRef.current.getContext('2d');
        }
    }, []);

    useEffect(() => {
        if (backgroundContextRef && backgroundContextRef.current && background) {
            const imageData = createImageData(background, 256, 256);
            backgroundContextRef.current.putImageData(imageData, 0, 0);
        }
        if (tileDataContextRef && tileDataContextRef.current && tileData) {
            const imageData = createImageData(tileData, 256, 192);
            tileDataContextRef.current.putImageData(imageData, 0, 0);
        }
    }, [background, tileData]);

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

