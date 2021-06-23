import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import * as Comlink from 'comlink';

const Debug = ({ workerApi }) => {
    const [registers, setRegisters] = useState(null);

    return (
        <div>
            <button
                onClick={async () => {
                await workerApi.step(Comlink.proxy(setRegisters));
            }}
            >Test2</button>
            {registers}
        </div>
    );
}

export default Debug;
