import { h } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import * as Comlink from 'comlink';

function makeWorkerApiAndCleanup() {
    const worker = new Worker(new URL("../worker/gameboyWorker.js", import.meta.url));
    const workerApi = Comlink.wrap(worker);
    
    const cleanup = () => {
        workerApi[releaseProxy]();
        worker.terminate();
    };
    
    const workerApiAndCleanup = { workerApi, cleanup };
    return workerApiAndCleanup;
}

export default function useWorker() {
    const workerApiAndCleanup = useMemo(() => makeWorkerApiAndCleanup(), []);

    useEffect(() => {
        const { cleanup } = workerApiAndCleanup;

        return () => {
            cleanup();
        };
    }, [workerApiAndCleanup]);
    return workerApiAndCleanup;
}