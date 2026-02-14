'use client';

import dynamic from 'next/dynamic';
import { useMemo, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Dynamic imports to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const MarkerClusterGroup = dynamic(
  () => import('react-leaflet-cluster').then((mod) => mod.default),
  { ssr: false }
);

// Louisville, KY center coordinates
const LOUISVILLE_CENTER: [number, number] = [38.2527, -85.7585];
const DEFAULT_ZOOM = 12;

interface MapListing {
  id: string;
  name: string;
  role: string;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  listings?: MapListing[];
  className?: string;
}

export function MapView({ listings = [], className }: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const center = useMemo(() => {
    if (listings.length === 0) return LOUISVILLE_CENTER;
    const avgLat = listings.reduce((sum, l) => sum + l.latitude, 0) / listings.length;
    const avgLng = listings.reduce((sum, l) => sum + l.longitude, 0) / listings.length;
    return [avgLat, avgLng] as [number, number];
  }, [listings]);

  if (!isMounted) {
    return (
      <div className={`bg-slate-800 flex items-center justify-center ${className || 'h-[500px] lg:h-[calc(100vh-200px)]'}`}>
        <p className="text-slate-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div role="region" aria-label="Interactive map of preservation stakeholders">
      <MapContainer
        center={center}
        zoom={DEFAULT_ZOOM}
        className={className || 'h-[500px] lg:h-[calc(100vh-200px)] w-full rounded-lg'}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={[listing.latitude, listing.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <a
                    href={`/listings/${listing.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {listing.name}
                  </a>
                  <p className="text-slate-600 mt-1">{listing.role}</p>
                  {listing.phone && (
                    <p className="text-slate-500 mt-1">{listing.phone}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
