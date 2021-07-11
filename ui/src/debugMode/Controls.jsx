import { h, Fragment } from 'preact';
import { useRef, useReducer } from 'preact/hooks';
import * as Comlink from 'comlink';
import './controls.css';

function Controls({ workerApi, setState }) {

    const [stepNumber, dispatch] = useReducer(reducer, 10);
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

    const handleStep = (ev) => {
        const stepNumber = parseInt(ev.target.value);
        dispatch({ type: 'set', newStepNumber: isNaN(stepNumber) ? 1 : stepNumber });
    }

    const handleWorkerReturn = (value) => {
        const { debug, error } = value;
        if (error)
            return console.error(error);
        setState(debug);
    }

    const reset = async () => await workerApi.reset(Comlink.proxy(handleWorkerReturn));
    const step = async (stepNumber) => await workerApi.step(Comlink.proxy(handleWorkerReturn));
    const runFrame = async () => await workerApi.runFrame(Comlink.proxy(handleWorkerReturn));
    const runOneSecond = async () => await workerApi.runOneSecond(Comlink.proxy(handleWorkerReturn));

    return (
        <div class="controls__container">
            <canvas 
                class="controls__canvas" 
                width={160} 
                height={144}
            />
            <button onClick={() => reset()} class="controls__button">Reset</button>
            <button onClick={() => step(1)} class="controls__button">Step</button>
            <button onClick={() => step(stepNumber)} class="controls__button">Step {stepNumber}</button>
            <div class="step">
                <input class="step__input" type="text" value={stepNumber} onChange={handleStep} />
                <button class="controls__button step__button" onClick={() => dispatch({ type: 'decrement' })}>-</button>
                <button class="controls__button step__button" onClick={() => dispatch({ type: 'increment' })}>+</button>
            </div>
            <button onClick={() => runFrame()} class="controls__button">Run a Frame</button>
            <button onClick={() => runOneSecond()} class="controls__button">Run one second</button>
        </div>
    )
}

export default Controls;