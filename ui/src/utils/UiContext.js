import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

const MIN_WIDTH_FOR_DEBUG = 600;
const UiContext = createContext(null);

export const UiProvider = ({ children }) => {
    const [uiState, setUiState] = useState({
        wasmLoaded: false,
        romLoaded: false,
        mode: 'debug',
        theme: 'light',
    });

    const changeMode = (mode = 'classic') => {
        setUiState(uiState => ({ ...uiState, mode }));
    };

    const changeTheme = () => {
        const newTheme = uiState.theme === 'light' ? 'dark' : 'light';
        setUiState(uiState => ({ ...uiState, theme: newTheme }));
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme);
            setUiState(uiState => ({ ...uiState, theme: storedTheme }));
        }
    }, []);

    useEffect(() => {
        const width = window.innerWidth;
        if (width < MIN_WIDTH_FOR_DEBUG)
            changeMode('classic');

        addEventListener('resize', (ev) => {
            const width = ev.target.innerWidth;
            if (width < MIN_WIDTH_FOR_DEBUG)
                changeMode('classic');
        });
    }, []);

    return (
        <UiContext.Provider value={{ uiState, setUiState, changeMode, changeTheme }}>
            {children}
        </UiContext.Provider>
    )
}

export const useUiState = () => useContext(UiContext);