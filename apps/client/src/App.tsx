import './App.css';
import type { Satellite } from './types/satellite';
import { useState } from 'react';
import { SatellitesPanel } from './components/satellites/panel/SatellitesPanel';
import { Globe } from './features/globe/components/Globe';

const App = () => {
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  return (
    <div className="flex h-full w-full flex-row gap-2 bg-[var(--background)] p-2">
      <SatellitesPanel
        selectedSatellite={selectedSatellite}
        onSelectSatellite={setSelectedSatellite}
      />
      <Globe selectedSatellite={selectedSatellite} />
    </div>
  );
};

export default App;
