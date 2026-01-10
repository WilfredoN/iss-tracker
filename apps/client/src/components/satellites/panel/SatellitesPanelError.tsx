type SatellitesPanelErrorProps = { message?: string };

export const SatellitesPanelError = ({ message }: SatellitesPanelErrorProps) => (
  <div className="animate-pulse border-2 border-[var(--destructive)] p-2 text-sm uppercase tracking-wider text-[var(--destructive)]">
    &gt; ERROR: {message || 'SATELLITE DATA UNAVAILABLE'}
  </div>
);
