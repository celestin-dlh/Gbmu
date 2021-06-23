import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as Comlink from 'comlink';
import useWorker from './hooks/useWorker';
import DebugMode from './DebugMode';
import ClassicMode from './ClassicMode';
import Header from './component/Header';

function App() {
  const { workerApi } = useWorker();
  const [uiState, setUiState] = useState({
    wasmLoaded: false,
    romLoaded: false,
    debugMode: true,
  });

  useEffect(() => {
    (async () => {
      console.log('Init wasm in webWorker');
      if (workerApi) {
        await workerApi.loadWasm(Comlink.proxy(console.log));
        setUiState({ ...uiState, wasmLoaded: true });
      }
    })();
  }, []);

  if (uiState.wasmLoaded === false) {
    return <div>
      Loading ...
    </div>
  }

  return (
    <div class="app">
      <Header workerApi={workerApi} uiState={uiState} setUiState={setUiState} />
      {uiState.debugMode ? 
        <DebugMode workerApi={workerApi} /> :
        <ClassicMode />
      }
    </div>
  );
};

export default App;