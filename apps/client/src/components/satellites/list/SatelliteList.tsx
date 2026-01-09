import type { Satellite } from '../../../types/satellite';

type SatelliteListProps = {
  satellites: Satellite[];
  onSelect?: (satellite: Satellite) => void;
};

export const SatelliteList = (props: SatelliteListProps) => {
  const { satellites, onSelect } = props;
  return (
    <ul className="mt-4 space-y-2">
      {satellites.length === 0 ? (
        <li className="text-primary-foreground text-sm">No satellites added yet.</li>
      ) : (
        satellites.map((satellite) => (
          <li
            key={satellite.id}
            className="shadow-xs hover:bg-accent flex cursor-pointer flex-col rounded-md bg-blue-900 px-3 py-2 transition"
            onClick={() => onSelect && onSelect(satellite)}
          >
            <span className="text-primary-foreground text-base font-semibold">
              {satellite.name}
            </span>
            <span className="text-primary-foreground/80 text-xs">TLE1: {satellite.tle1}</span>
            <span className="text-primary-foreground/80 text-xs">TLE2: {satellite.tle2}</span>
          </li>
        ))
      )}
    </ul>
  );
};
