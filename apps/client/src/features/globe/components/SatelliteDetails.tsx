import * as Cesium from 'cesium';
import { tleToCartesian } from '../helpers/tleToCartesian';
import { useSatelliteStore } from '../../../store';
import { useEffect, useState } from 'react';
import type { TLE } from '../../../types/satellite';

const getCurrentPosition = ({ tle1, tle2 }: TLE) => {
  const now = new Date();
  const cartesian = tleToCartesian(tle1, tle2, now);
  if (!cartesian) return undefined;
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  if (!cartographic) return undefined;
  const lat = Cesium.Math.toDegrees(cartographic.latitude);
  const lon = Cesium.Math.toDegrees(cartographic.longitude);
  const alt = cartographic.height;
  return { lat, lon, alt };
};

const parseTLE = ({ tle1, tle2 }: TLE) => {
  console.table({ tle1, tle2 });
  const eccentricity = tle2 ? parseFloat(`0.${tle2.substring(26, 33)}`) : undefined;
  const perigee = tle2 ? parseFloat(tle2.substring(34, 42)) : undefined;
  const meanAnomaly = tle2 ? parseFloat(tle2.substring(43, 51)) : undefined;
  const meanMotion = tle2 ? parseFloat(tle2.substring(52, 63)) : undefined;
  return { eccentricity, perigee, meanAnomaly, meanMotion };
};

const meanMotionToSpeed = (meanMotion?: number) => {
  if (!meanMotion) return undefined;
  const mu = 398600.4418;
  const period = 86400 / meanMotion;
  const semiMajorAxis = Math.cbrt(mu * Math.pow(period / (2 * Math.PI), 2));
  const speed = Math.sqrt(mu / semiMajorAxis);
  return speed;
};

export const SatelliteDetails = () => {
  const satellite = useSatelliteStore((state) => state.selectedSatellite);
  const [position, setPosition] = useState(() =>
    satellite ? getCurrentPosition({ tle1: satellite.tle1, tle2: satellite.tle2 }) : undefined,
  );

  useEffect(() => {
    if (!satellite) return;
    const interval = setInterval(() => {
      setPosition(getCurrentPosition({ tle1: satellite.tle1, tle2: satellite.tle2 }));
    }, 3000);
    return () => clearInterval(interval);
  }, [satellite]);

  if (!satellite) {
    return (
      <div className="border-(--foreground) bg-(--panel-bg) shadow-(--glow) mt-2 flex h-48 items-center justify-center border-2">
        <span className="font-mono text-lg text-green-400 opacity-80">
          Select a satellite to view details
        </span>
      </div>
    );
  }

  const { eccentricity, perigee, meanAnomaly, meanMotion } = parseTLE({
    tle1: satellite.tle1,
    tle2: satellite.tle2,
  });

  const speed = meanMotionToSpeed(meanMotion);

  return (
    <div className="border-(--foreground) bg-(--panel-bg) shadow-(--glow) mt-2 border-2 p-4 font-mono text-sm text-green-400">
      <div className="mb-2 text-center text-2xl font-bold">{satellite.name}</div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        <div className="min-w-35">
          <span>ID: {satellite.id}</span>
        </div>
        <div className="min-w-35">
          <span>Eccentricity: {eccentricity ?? 'N/A'}</span>
        </div>
        <div className="min-w-35">
          <span>Perigee: {perigee ?? 'N/A'} km</span>
        </div>
        <div className="min-w-35">
          <span>Mean Anomaly: {meanAnomaly ?? 'N/A'}°</span>
        </div>
        <div className="min-w-35">
          <span>Speed: {speed ? speed.toFixed(2) : 'N/A'} km/s</span>
        </div>
        <div className="min-w-35">
          <span>Latitude: {position ? position.lat.toFixed(4) : 'N/A'}°</span>
        </div>
        <div className="min-w-35">
          <span>Longitude: {position ? position.lon.toFixed(4) : 'N/A'}°</span>
        </div>
        <div className="min-w-35">
          <span>Altitude: {position ? position.alt.toFixed(0) : 'N/A'} m</span>
        </div>
      </div>
    </div>
  );
};
