import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

function Controls({ executeStep, executeFrame }) {

    const [step, setStep] = useState(10);
    const [execSinceStart, setExecSinceStart] = useState(0);

    const handleChange = (ev) => {
        const number = parseInt(ev.target.value);
        setStep(isNaN(number) ? 1 : number);
    }

    const handleStep = (stepNumber) => {
        executeStep(stepNumber);
        setExecSinceStart(execSinceStart + stepNumber);
    }
    
    return (
        <div class="controls">
            <p>Step exec: {execSinceStart}</p>
            <button class="controls__button">Reset</button>
            <button class="controls__button" onClick={() => handleStep(1)}>Step</button>
            <input class="controls__input" placeholder="Step number" value={step} onChange={handleChange} />
            <button class="controls__button" onClick={() => handleStep(step)}>Step {step}</button>
            <button class="controls__button" onClick={executeFrame}>Run one frame</button>
            <button class="controls__button">Run one second</button>
        </div>
    )
};

export default Controls;