import type { AddSatelliteData, Satellite } from '../types/satellite';
import { mapApiToSatellite } from './mappers';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const satelliteService = {
  async getAll(): Promise<Satellite[]> {
    const res = await fetch(`${API_URL}/satellites`);
    if (!res.ok) throw new Error('Failed to fetch satellites');
    const data = await res.json();
    return (data.satellites || []).map(mapApiToSatellite);
  },

  async add(satellite: AddSatelliteData): Promise<Satellite> {
    const res = await fetch(`${API_URL}/satellites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: satellite.name, tle_1: satellite.tle1, tle_2: satellite.tle2 }),
    });
    if (!res.ok) throw new Error('Failed to add satellite');
    await res.json();
    return { id: String(Date.now()), ...satellite };
  },

  async remove(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/satellites/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete satellite');
  },
};
