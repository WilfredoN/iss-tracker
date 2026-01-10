import type { ReactNode } from 'react';

export const SatellitesPanelLayout = ({ children }: { children: ReactNode }) => (
  <section className="flex h-full w-full max-w-md flex-col gap-4 border-2 border-[var(--foreground)] bg-[var(--panel-bg)] p-4 shadow-[var(--glow)]">
    {children}
  </section>
);
