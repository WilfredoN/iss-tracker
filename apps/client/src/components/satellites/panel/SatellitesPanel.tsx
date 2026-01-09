import { useState, useMemo } from 'react';
import {
  SatellitesPanelLayout,
  SatellitesPanelHeader,
  SatellitesPanelLoading,
  SatellitesPanelError,
} from '.';

import { SatelliteList } from '../list/SatelliteList';

import { useSatellites } from '../hooks/useSatellites';
import { AddSatelliteDialog } from '../dialogs/AddSatelliteDialog';

export const SatellitesPanel = () => {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const { satellites, isLoading, error, addSatellite } = useSatellites();

  const filteredSatellites = useMemo(() => {
    return satellites.filter((satellite) =>
      satellite.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [satellites, search]);

  return (
    <SatellitesPanelLayout>
      <SatellitesPanelHeader
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setAddOpen(true)}
      />
      {isLoading ? (
        <SatellitesPanelLoading />
      ) : error ? (
        <SatellitesPanelError />
      ) : (
        <SatelliteList satellites={filteredSatellites} />
      )}
      <AddSatelliteDialog open={addOpen} onOpenChange={setAddOpen} onAdd={addSatellite} />
    </SatellitesPanelLayout>
  );
};
