import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MapDisplay.css';

// Udah gk dipake
// const markerData = {
//   'F&B': [{ lat: 37.7749, lng: -122.4194, title: 'San Francisco - F&B Spot' }],
//   'Finance': [{ lat: 40.7128, lng: -74.0060, title: 'Wall Street - Finance Center' }],
//   'Shopping': [{ lat: 37.7842, lng: -122.4074, title: 'Union Square - Shopping' }],
//   'Healthcare': [{ lat: 37.7694, lng: -122.4064, title: 'UCSF Medical Center' }],
//   'Entertainment': [{ lat: 37.7694, lng: -122.4862, title: 'Golden Gate Park' }],
// };

const MapDisplay = ({ locations }) => {
  const mapRef = useRef(null);           
  const mapInstanceRef = useRef(null); 
  const [loaded, setLoaded] = useState(false);

  let userLoc = null;
  try {
    const userLocJSON = localStorage.getItem('userLoc');
    userLoc = userLocJSON ? JSON.parse(userLocJSON) : null;
  } catch {
    userLoc = null;
  }

  const places = locations || [];
  const center = userLoc
    ? { lat: userLoc.latitude, lng: userLoc.longitude }
    : (places[0] || { lat: 37.7749, lng: -122.4194 });

  useEffect(() => {
    if (loaded && userLoc && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [userLoc.longitude, userLoc.latitude],
        zoom: 14,
        speed: 1.2,
        curve: 1.5,
      });
    }
  }, [loaded, userLoc]);

  return (
    <div className="map-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom: 12,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        style={{ width: '100%', height: '100%' }}
        onLoad={({ target }) => {
          mapInstanceRef.current = target;
          setLoaded(true);
        }}
      >
        {userLoc && (
          <Marker longitude={userLoc.longitude} latitude={userLoc.latitude}>
            <div className="marker-user" title="Your Location" />
          </Marker>
        )}
        {places.map((place, idx) => (
          <Marker key={idx} longitude={place.lon} latitude={place.lat}>
            <div className="marker-service" title={place.title} />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapDisplay;
