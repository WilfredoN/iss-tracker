import { Viewer } from 'resium';
import './App.css';
import { SatellitesPanel } from './components/satellites/panel/SatellitesPanel';

const App = () => (
  <div className="flex h-full w-full flex-row gap-2 bg-[var(--background)] p-2">
    <SatellitesPanel />
    <div className="flex-1 border-2 border-[var(--foreground)] bg-[var(--panel-bg)] p-1 shadow-[var(--glow)]">
      <Viewer
        baseLayerPicker={false}
        sceneModePicker={false}
        homeButton={false}
        timeline={false}
        fullscreenButton={false}
      />
    </div>
  </div>
);

export default App;
