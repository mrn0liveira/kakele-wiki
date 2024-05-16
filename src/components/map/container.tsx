'use client';

//@ts-ignore
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import * as React from 'react';
//@ts-ignore
import type L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';

import type { MapPoint } from '@prisma/client';
import { createPortal } from 'react-dom';

import { Sidebar } from './sidebar';

async function getPoints(tag: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/map?tag=${tag}`, {
    next: { revalidate: 60 * 30 },
  });

  return await res.json();
}

export default function KakeleMap() {
  const [isMounted, setIsMounted] = React.useState(true);

  const [currentPosition, setCurrentPosition] = React.useState<[string, string]>(['0', '0']);

  const [cities, setCities] = React.useState<MapPoint[]>([]);

  const mapRef = React.useRef<L.Map>();

  React.useEffect(() => {
    getPoints('City').then((data) => {
      setCities(data.data);
    });
  }, []);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const MapEvents = () => {
    useMapEvents({
      drag: (e: L.LeafletEvent) => {
        setCurrentPosition([e.target.getCenter().lat.toFixed(2), e.target.getCenter().lng.toFixed(2)]);
      },
    });
    return false;
  };

  const navigateToCoorinates = (coordinates: [number, number]) => {
    mapRef.current?.flyTo(coordinates, 6);

    setCurrentPosition([coordinates[0].toFixed(2), coordinates[1].toFixed(2)]);
  };

  return (
    isMounted && (
      <div className='min-w-screen relative flex h-screen min-h-screen w-screen items-center justify-center'>
        <div className='fixed bottom-12 z-[999] flex h-10 w-fit items-center justify-start rounded-md border-[1px] border-zinc-500/50 bg-zinc-950/80 backdrop-blur-sm lg:bottom-2 lg:left-2 lg:top-8 lg:flex lg:h-fit lg:w-fit lg:flex-row lg:items-start lg:justify-start'>
          <Sidebar cities={cities} mapCoordinates={currentPosition} onClick={navigateToCoorinates} />
        </div>
        <div className='absolute top-2 z-50 flex w-screen items-center justify-center'>
          <div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]] absolute top-2 z-[999] flex items-center justify-center rounded-md bg-zinc-900 p-[1px]'>
            {currentPosition && (
              <span className='px-2 text-xs'>
                {currentPosition[0]}, {currentPosition[1]}
              </span>
            )}
          </div>
        </div>

        <div className='unselectable absolute z-[50]'>+</div>

        <div className='unselectable vignette pointer-events-none z-[50] h-full min-h-full w-full min-w-full' />

        <MapContainer
          //@ts-ignore
          center={[0, 0]}
          maxZoom={6}
          minZoom={2}
          ref={mapRef}
          zoom={3}
        >
          <TileLayer
            //@ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://raw.githubusercontent.com/mrn0liveira/kakele-leaflet-map/main/level-0/{z}/{x}/{y}.png'
            // url="/map_1/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <EnhancedMarker
              icon={
                <div className='flex w-fit flex-row items-center justify-between gap-2 rounded-md bg-red-900 pr-2'>
                  <div className='h-4 w-4 rounded-full bg-red-500' />
                  {city.name}
                </div>
              }
              key={city.id}
              position={[city.latitude, city.longitude]}
            />
          ))}
          <MapEvents />
        </MapContainer>
      </div>
    )
  );
}

const EnhancedMarker = ({
  eventHandlers,
  icon: providedIcon,
  ...otherProps
}: {
  eventHandlers?: any;
  icon?: any;
  [key: string]: any;
}) => {
  const [markerRendered, setMarkerRendered] = React.useState(false);
  const id = `marker-${React.useId()}`;

  const icon = React.useMemo(
    () =>
      L.divIcon({
        html: `<div id="${id}"></div>`,
      }),
    [id]
  );

  return (
    <>
      <Marker
        {...otherProps}
        eventHandlers={{
          ...eventHandlers,
          add: (...args: any) => {
            setMarkerRendered(true);
            if (eventHandlers?.add) eventHandlers.add(...args);
          },
          remove: (...args: any) => {
            setMarkerRendered(false);
            if (eventHandlers?.remove) eventHandlers.remove(...args);
          },
        }}
        // @ts-ignore
        icon={icon}
      />
      {markerRendered &&
        // @ts-ignore
        createPortal(providedIcon, document.getElementById(id))}
    </>
  );
};
