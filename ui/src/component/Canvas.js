import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

export default function Canvas({ workerApi }) {
    const canvasRef = useRef();
    const contextRef = useRef();
    const getBackground = async () => {
        const data = await workerApi.getBackground();
        if (contextRef && contextRef.current) {
            contextRef.current.putImageData(data, 0, 0);
        }
    }

    useEffect(() => {
        if (canvasRef && canvasRef.current)
            contextRef.current = canvasRef.current.getContext('2d');
    }, []);
    
    return (
        <div
            class="canvas_container"
        >
            <canvas
                ref={canvasRef}
                height={256}
                width={256}
            />
            <button onClick={() => getBackground()}>getBackground</button>
        </div>
    )
}