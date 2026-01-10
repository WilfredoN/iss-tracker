import type { Satellite } from '../../../types/satellite';
import { NoSatellites } from './NoSatellites';

type SatelliteListProps = {
  satellites: Satellite[];
  onSelect?: (satellite: Satellite) => void;
};

export const SatelliteList = ({ satellites, onSelect }: SatelliteListProps) => (
  <ul className="flex-1 space-y-2 overflow-y-auto pr-1">
    {satellites.length === 0 ? (
      <NoSatellites />
    ) : (
      satellites.map((satellite) => (
        <li
          key={satellite.id}
          className="group flex cursor-pointer flex-col border-2 border-[var(--foreground)] bg-[var(--input)] px-3 py-2 transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:shadow-[var(--glow)]"
          onClick={() => onSelect?.(satellite)}
        >
          <span className="text-base font-bold uppercase tracking-wide">&gt; {satellite.name}</span>
          <span className="mt-1 font-mono text-xs opacity-80 group-hover:opacity-100">
            TLE1: {satellite.tle1}
          </span>
          <span className="font-mono text-xs opacity-80 group-hover:opacity-100">
            TLE2: {satellite.tle2}
          </span>
        </li>
      ))
    )}
  </ul>
);
