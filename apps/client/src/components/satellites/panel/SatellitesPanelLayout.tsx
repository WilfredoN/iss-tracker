import type { ReactNode } from 'react';

export const SatellitesPanelLayout = ({ children }: { children: ReactNode }) => (
  <section className="flex h-full w-full max-w-md flex-col rounded-md border-4 border-blue-400 bg-blue-900 p-4">
    {children}
  </section>
);
