import { h } from 'preact';
import { useState } from 'preact/hooks';
import * as Comlink from 'comlink';
import LoadRomIcon from '@material-ui/icons/GetApp';
import DebugIcon from '@material-ui/icons/BugReport';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ResetIcon from '@material-ui/icons/Replay';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import SaveIcon from '@material-ui/icons/Save';
import LoadIcon from '@material-ui/icons/Publish';

/*
    Load rom
    Debug Mode
    Play / Pause
    Reset
    Sound / Mute
    Save game
    Load game
*/

function Header({ workerApi, uiState, setUiState }) {

    const loadRom = async (romBuffer) => {
        if (romBuffer && romBuffer.length > 0) {
            await workerApi.loadRom(romBuffer, Comlink.proxy(console.log));
        }
    }

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
                }
            };
        }
    }
    const handleDebugMode = () => setUiState({ ...uiState, debugMode: !uiState.debugMode })

    return (
        <header>
            <label class="button loadRom" htmlFor="loadRom">
                <input class="hidden" id="loadRom" type="file" onChange={handleLoadRom} accept=".gb, .gbc" /> 
                <LoadRomIcon/>
            </label>

            <button class="button">
                <PlayArrowIcon/>
            </button>

            <button class="button">
                <ResetIcon/>
            </button>

            <button class="button">
                <VolumeOffIcon/>
            </button>

            <button class="button">
                <SaveIcon/>
            </button>

            <button class="button">
                <LoadIcon/>
            </button>

            <button class="button button--left" onClick={handleDebugMode}>
                <DebugIcon />
            </button>
        </header>
    )
}

export default Header;