import { h } from 'preact';
import '../styles/canvas.css';

export default function Canvas() {
    return (
        <div
            class="canvas_container"
        >
            <canvas
                height={144}
                width={160}
            />
        </div>
    )
}