import { h } from 'preact';
import { useUiState } from '../utils/UiContext';
import * as Comlink from 'comlink';
import './header.css';

function Header({ workerApi, setState }) {
    const { uiState, changeMode, changeTheme } = useUiState();

    const handleLoadRom = (ev) => {
        const fileReader = new FileReader();
        const { files } = ev.target;
        if (files[0]) {
            fileReader.readAsArrayBuffer(files[0])

            fileReader.onload = (ev) => {
                if (ev.target && ev.target.result) {
                    const result = ev.target.result;
                    const buffer = new Uint8Array(result);
                    workerApi.loadRom(buffer);
                    workerApi.getDebugValue(0, Comlink.proxy(setState));
                }
            };
        }
    }

    return (
        <header class="header">
            <label class="header__button" htmlFor="load_rom">
                Load Rom
                <input id="load_rom" type="file" style={{ display: 'none' }} onChange={handleLoadRom} />
            </label>
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
                {uiState.theme === 'light' ? "Dark Mode" : "Light Mode"}
            </button>
        </header>
    )
}

export default Header;