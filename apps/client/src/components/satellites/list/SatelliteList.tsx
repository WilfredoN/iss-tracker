import type { Satellite } from '../../../types/satellite';
import { NoSatellites } from './NoSatellites';
import { SatelliteListItem } from './SatelliteListItem';
import { useSatellites } from '../hooks/useSatellites';
import { useSatelliteStore } from '../../../store';
import { useShallow } from 'zustand/react/shallow';

type SatelliteListProps = {
  satellites: Satellite[];
  panel?: React.ReactNode;
};

export const SatelliteList = ({ satellites, panel }: SatelliteListProps) => {
  const { clearSelection } = useSatelliteStore(
    useShallow((state) => ({
      clearSelection: state.clearSelection,
    })),
  );

  const resetSelectionOnClick = (e: React.MouseEvent<HTMLUListElement>) => {
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  const { removeSatellite } = useSatellites();
  return (
    <ul className="flex-1 space-y-2 overflow-y-auto" onClick={resetSelectionOnClick}>
      {panel && <li>{panel}</li>}
      {satellites.length === 0 ? (
        <NoSatellites />
      ) : (
        satellites.map((satellite) => (
          <SatelliteListItem key={satellite.id} satellite={satellite} onDelete={removeSatellite} />
        ))
      )}
    </ul>
  );
};
