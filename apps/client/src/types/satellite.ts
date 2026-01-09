export interface Satellite {
  id: string;
  name: string;
  tle1: string;
  tle2: string;
}

export interface AddSatelliteData {
  name: string;
  tle1: string;
  tle2: string;
}

export interface SatelliteApi {
  id: number;
  name: string;
  tle_1: string;
  tle_2: string;
  added_at?: string;
}
