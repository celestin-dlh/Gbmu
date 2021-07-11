import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

const MIN_WIDTH_FOR_DEBUG = 400;
const UiContext = createContext(null);

export const UiProvider = ({ children }) => {
    const [uiState, setUiState] = useState({
        wasmLoaded: false,
        romLoaded: false,
        mode: 'debug',
    });

    const changeMode = (mode = 'classic') => {
        setUiState(uiState => ({ ...uiState, mode }));
    };

    useEffect(() => {
        const width = window.innerWidth;
        if (width < MIN_WIDTH_FOR_DEBUG)
            changeMode('classic');
    }, []);

    useEffect(() => {
        addEventListener('resize', (ev) => {
            const width = ev.target.innerWidth;
            if (width < MIN_WIDTH_FOR_DEBUG)
                changeMode('classic');
        });
    }, []);

    return (
        <UiContext.Provider value={{ uiState, setUiState, changeMode }}>
            {children}
        </UiContext.Provider>
    )
}

export const useUiState = () => useContext(UiContext);