import { useShallow } from 'zustand/react/shallow';
import { useSatelliteStore } from '../../../store';
import type { Satellite } from '../../../types/satellite';

interface SatelliteListItemProps {
  satellite: Satellite;
}

export const SatelliteListItem = ({ satellite }: SatelliteListItemProps) => {
  const { selectedSatellite, selectSatellite } = useSatelliteStore(
    useShallow((state) => ({
      selectedSatellite: state.selectedSatellite,
      selectSatellite: state.selectSatellite,
    })),
  );

  const isSelected = selectedSatellite && satellite.id === selectedSatellite.id;

  return (
    <li
      className={[
        'border-(--foreground) group flex cursor-pointer flex-col border-2 px-3 py-2 transition-all',
        isSelected
          ? 'bg-(--foreground) text-(--background) shadow-(--glow)'
          : 'bg-(--input) hover:bg-(--foreground) hover:text-(--background) hover:shadow-(--glow)',
      ].join(' ')}
      onClick={() => selectSatellite(satellite)}
    >
      <span className="text-base font-bold uppercase tracking-wide">&gt; {satellite.name}</span>
      <span
        className={
          'mt-1 font-mono text-xs opacity-80 ' +
          (isSelected ? 'opacity-100' : 'group-hover:opacity-100')
        }
      >
        TLE1: {satellite.tle1}
      </span>
      <span
        className={
          'font-mono text-xs opacity-80 ' + (isSelected ? 'opacity-100' : 'group-hover:opacity-100')
        }
      >
        TLE2: {satellite.tle2}
      </span>
    </li>
  );
};
