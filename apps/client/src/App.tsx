import './App.css';
import { SatellitesPanel } from './components/satellites/panel/SatellitesPanel';
import { Globe } from './features/globe/components/Globe';

const App = () => {
  return (
    <div className="bg-(--background) flex h-full w-full flex-row gap-2 p-2">
      <SatellitesPanel />
      <Globe />
    </div>
  );
};

export default App;
