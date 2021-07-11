import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import useWorker from './hooks/useWorker';
import { useUiState } from './utils/UiContext';
import * as Comlink from 'comlink';
import DebugMode from './debugMode';
import ClassicMode from './classicMode';

function App() {
  const { workerApi } = useWorker();
  const { uiState, setUiState } = useUiState();

  useEffect(() => {
    (async () => {
      if (workerApi) {
        await workerApi.loadWasm(Comlink.proxy(console.log));
        setUiState(uiState => ({ ...uiState, wasmLoaded: true }));
      }
    })();
  }, []);

  if (uiState.wasmLoaded === false) {
    return <div>
      Loading ...
    </div>
  }

  if (uiState.mode === 'debug')
    return <DebugMode workerApi={workerApi} />
  else  
    return <ClassicMode />
};

export default App;