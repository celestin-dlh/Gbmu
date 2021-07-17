import { h } from 'preact';
import { useEffect, useState, useReducer, useRef } from 'preact/hooks';
import { createImageData } from '../utils/createImageData';
import './controls.css';

function Controls({ reset, step, runFrame, runOneSecond, screen }) {
    const canvasRef = useRef();
    const canvasContextRef = useRef();
    const [stepNumber, dispatch] = useReducer(reducer, 10);
    const [stepRunned, setStepRunned] = useState(0);

    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            canvasContextRef.current = canvasRef.current.getContext('2d');
        }
    }, []);

    useEffect(() => {
        if (canvasContextRef && canvasContextRef.current && screen) {
            const imageData = createImageData(screen, 160, 144);
            canvasContextRef.current.putImageData(imageData, 0, 0);
        }
    }, [screen]);

    function reducer(state, action) {
        switch (action.type) {
            case 'increment': {
                return state + 1;
            }
            case 'decrement': {
                if (state <= 1) return 1;
                return state - 1;
            }
            case 'set':
                return action.newStepNumber;
            default:
                throw new Error();
        }
    }

    const handleChange = (ev) => {
        const stepNumber = parseInt(ev.target.value);
        dispatch({ type: 'set', newStepNumber: isNaN(stepNumber) ? 1 : stepNumber });
    }

    const handleStep = (stepNumber) => {
        step(stepNumber);
        setStepRunned(current => current + stepNumber);
    }

    const handleReset = () => {
        reset();
        setStepRunned(0);
    }

    return (
        <div class="controls__container">
            <canvas 
                class="controls__canvas"
                ref={canvasRef} 
                width={160} 
                height={144}
            />
            <h3 className="controls__step-number">Step: {stepRunned}</h3>
            <button onClick={() => handleReset()} class="controls__button">Reset</button>
            <button onClick={() => handleStep(1)} class="controls__button">Step</button>
            <button onClick={() => handleStep(stepNumber)} class="controls__button">Step {stepNumber}</button>
            <div class="step">
                <input type="text" value={stepNumber} onChange={handleChange} class="step__input" />
                <button onClick={() => dispatch({ type: 'decrement' })} class="controls__button step__button">-</button>
                <button onClick={() => dispatch({ type: 'increment' })} class="controls__button step__button">+</button>
            </div>
            <button onClick={() => runFrame()} class="controls__button">Run a Frame</button>
            <button onClick={() => runOneSecond()} class="controls__button">Run one second</button>
        </div>
    )
}

export default Controls;