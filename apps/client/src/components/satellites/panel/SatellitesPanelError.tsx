type SatellitesPanelErrorProps = { message?: string };

export const SatellitesPanelError = ({ message }: SatellitesPanelErrorProps) => (
  <div className="text-destructive text-primary-foreground mt-4 text-sm">
    {message || 'Error loading satellites'}
  </div>
);
