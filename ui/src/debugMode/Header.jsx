import { h } from 'preact';
import {useEffect} from 'preact/hooks';
import { useUiState } from '../utils/UiContext';
import './header.css';

function Header({ workerApi }) {
    const { uiState, setUiState, changeMode, changeTheme } = useUiState();

    const handleLoadRom = (ev) => {
        const fileReader = new FileReader();
        const { files } = ev.target;
        if (files[0]) {
            fileReader.readAsArrayBuffer(files[0])

            fileReader.onload = (ev) => {
                if (ev.target && ev.target.result) {
                    const result = ev.target.result;
                    const buffer = new Uint8Array(result);
                    loadRom(buffer);

                    // to force rerender of the app when reload a new rom
                    const state = {...uiState}
                    setUiState({ ...state, romLoaded: true })
                }
            };
        }
    }

    const { theme } = uiState;

    return (
        <header class="header">
            <button 
                class="header__button"
                // onClick={handleLoadRom}
            >
                Load Rom
            </button>
            <button
                onClick={changeMode}
                class="header__button"
            >
                Classic Mode
            </button>
            <button
                class="header__button"
                onClick={changeTheme}
            >
                {theme === 'light' ? "Dark" : "Light"} Mode
            </button>
        </header>
    )
}

export default Header;