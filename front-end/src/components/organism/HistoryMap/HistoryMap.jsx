import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-maplibre';
import { useLocation } from 'react-router-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import './HistoryMap.css';

// Udah gk dipake
// const markerData = {
//   'F&B': [{ lat: 37.7749, lng: -122.4194, title: 'San Francisco - F&B Spot' }],
//   'Finance': [{ lat: 40.7128, lng: -74.0060, title: 'Wall Street - Finance Center' }],
//   'Shopping': [{ lat: 37.7842, lng: -122.4074, title: 'Union Square - Shopping' }],
//   'Healthcare': [{ lat: 37.7694, lng: -122.4064, title: 'UCSF Medical Center' }],
//   'Entertainment': [{ lat: 37.7694, lng: -122.4862, title: 'Golden Gate Park' }],
// };

const HistoryMap = () => {
  const mapRef = useRef(null); 
  const mapInstanceRef = useRef(null); 
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [center.lng, center.lat],
        zoom: 16,
        speed: 1.2,
        curve: 1.5,
      });
    }
  }, [loaded, center])

  return (
    <div className="map-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
            zoom:0,
            speed:1.2,
            curve:1.5
        }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        style={{ width: '100%', height: '100%' }}
        onLoad={({ target }) => {
          mapInstanceRef.current = target;
          setLoaded(true);
        }}
      >
        {center && (
          <Marker longitude={center.lng} latitude={center.lat}>
            <div className="marker-user" title="Your Location" />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default HistoryMap;   