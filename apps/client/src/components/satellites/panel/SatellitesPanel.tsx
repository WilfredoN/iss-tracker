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
import { ISS_PLACEHOLDER } from '../../../services/mocks/placeholderSatellite';

export const SatellitesPanel = () => {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const { satellites, isLoading, isFetching, error, addSatellite, refetch } = useSatellites(search);

  const handleAddClick = () => setAddOpen(true);

  return (
    <SatellitesPanelLayout>
      <SatellitesPanelHeader
        search={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick}
      />
      {isLoading || isFetching ? (
        <SatelliteList panel={<SatellitesPanelLoading />} satellites={[ISS_PLACEHOLDER]} />
      ) : error ? (
        <SatelliteList
          panel={<SatellitesPanelError onRetry={refetch} />}
          satellites={[ISS_PLACEHOLDER]}
        />
      ) : (
        <SatelliteList satellites={satellites ?? []} />
      )}
      <AddSatelliteDialog open={addOpen} onOpenChange={setAddOpen} onAdd={addSatellite} />
    </SatellitesPanelLayout>
  );
};
