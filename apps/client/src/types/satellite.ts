export interface TLE {
  tle1: string;
  tle2: string;
}

export interface AddSatelliteData extends TLE {
  name: string;
}

export interface Satellite extends AddSatelliteData {
  id: string;
}

export interface SatelliteApi extends Satellite {
  added_at?: string;
}
