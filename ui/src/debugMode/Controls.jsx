import { h, Fragment } from 'preact';
import { useState, useReducer, useEffect } from 'preact/hooks';
import * as Comlink from 'comlink';
import './controls.css';

function Controls({ workerApi, setState }) {
    const [stepNumber, dispatch] = useReducer(reducer, 10);
    const [stepRunned, setStepRunned] = useState(0);
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

    useEffect(() => {
        reset();
    }, []);

    const handleStepInput = (ev) => {
        const stepNumber = parseInt(ev.target.value);
        dispatch({ type: 'set', newStepNumber: isNaN(stepNumber) ? 1 : stepNumber });
    }

    const handleWorkerReturn = (value) => {
        setState(value);
    }

    const reset = async () => {
        await workerApi.reset(Comlink.proxy(handleWorkerReturn));
        setStepRunned(0);
    }
    const handleStep = async (stepNumber) => {
        await workerApi.step(stepNumber, Comlink.proxy(handleWorkerReturn));
        setStepRunned(current => current + stepNumber);
    }
    const runFrame = async () => await workerApi.runFrame(Comlink.proxy(handleWorkerReturn));
    const runOneSecond = async () => await workerApi.runOneSecond(Comlink.proxy(handleWorkerReturn));

    return (
        <div class="controls__container">
            <canvas 
                class="controls__canvas" 
                width={160} 
                height={144}
            />
            <h3 className="controls__step-number">Step: {stepRunned}</h3>
            <button onClick={() => reset()} class="controls__button">Reset</button>
            <button onClick={() => handleStep(1)} class="controls__button">Step</button>
            <button onClick={() => handleStep(stepNumber)} class="controls__button">Step {stepNumber}</button>
            <div class="step">
                <input class="step__input" type="text" value={stepNumber} onChange={handleStepInput} />
                <button class="controls__button step__button" onClick={() => dispatch({ type: 'decrement' })}>-</button>
                <button class="controls__button step__button" onClick={() => dispatch({ type: 'increment' })}>+</button>
            </div>
            <button onClick={() => runFrame()} class="controls__button">Run a Frame</button>
            <button onClick={() => runOneSecond()} class="controls__button">Run one second</button>
        </div>
    )
}

export default Controls;