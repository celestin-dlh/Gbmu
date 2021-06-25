import { h } from 'preact';

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