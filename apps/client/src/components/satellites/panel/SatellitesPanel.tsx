import { useState } from 'react';
import {
  SatellitesPanelLayout,
  SatellitesPanelHeader,
  SatellitesPanelLoading,
  SatellitesPanelError,
} from '.';
import { SatelliteList } from '../list/SatelliteList';
import { useSatellites } from '../hooks/useSatellites';
import { AddSatelliteDialog } from '../dialogs/AddSatelliteDialog';
import { ISS_PLACEHOLDER } from '../../../services/placeholderSatellite';
import type { Satellite } from '../../../types/satellite';

type SatellitesPanelProps = {
  selectedSatellite: Satellite | null;
  onSelectSatellite: (sat: Satellite | null) => void;
};

export const SatellitesPanel = ({ selectedSatellite, onSelectSatellite }: SatellitesPanelProps) => {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const { satellites, isLoading, error, addSatellite } = useSatellites(search);

  const handleAddClick = () => setAddOpen(true);

  return (
    <SatellitesPanelLayout>
      <SatellitesPanelHeader
        search={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick}
      />
      {isLoading ? (
        <SatellitesPanelLoading />
      ) : error ? (
        <>
          <SatellitesPanelError />
          <SatelliteList
            satellites={[ISS_PLACEHOLDER]}
            onSelect={onSelectSatellite}
            selectedSatellite={selectedSatellite}
            onClearSelected={() => onSelectSatellite(null)}
          />
        </>
      ) : (
        <SatelliteList
          satellites={satellites}
          onSelect={onSelectSatellite}
          selectedSatellite={selectedSatellite}
          onClearSelected={() => onSelectSatellite(null)}
        />
      )}
      <AddSatelliteDialog open={addOpen} onOpenChange={setAddOpen} onAdd={addSatellite} />
    </SatellitesPanelLayout>
  );
};
