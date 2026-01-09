import { Viewer } from 'resium';
import './App.css';
import { SatellitesPanel } from './components/satellites/panel/SatellitesPanel';

function App() {
  return (
    <div className="h-full w-full bg-blue-950 p-2">
      <div className="flex h-full flex-row justify-between">
        <SatellitesPanel />
        <div className="h-fit w-full max-w-5xl rounded-md border-4 border-blue-400 bg-blue-900 p-4">
          <Viewer
            baseLayerPicker={false}
            sceneModePicker={false}
            homeButton={false}
            timeline={false}
            fullscreenButton={false}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
