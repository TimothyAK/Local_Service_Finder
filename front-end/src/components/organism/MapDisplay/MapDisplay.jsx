import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup } from '@vis.gl/react-maplibre';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const stateSearchResult = location.state?.searchResult || [];       
  const mapInstanceRef = useRef(null); 
  const [loaded, setLoaded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState({});

  let userLoc = null;
  try {
    const userLocJSON = localStorage.getItem('userLoc');
    userLoc = userLocJSON ? JSON.parse(userLocJSON) : null;
  } catch {
    userLoc = null;
  }

  const places = locations?.length ? locations : stateSearchResult.map((p, i) => ({
  ...p,
  title: p.title || p.name || `Place ${i + 1}`,
}));

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

  useEffect(() => {
  const stored = localStorage.getItem('visitedPlaces');
  if (stored) {
    setVisitedPlaces(JSON.parse(stored));
  }
}, []);

  const toggleVisited = (index) => {
    setVisitedPlaces((prev) => {
      const updated = { ...prev, [index]: !prev[index] };
      localStorage.setItem('visitedPlaces', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="map-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
            zoom: 14,
            speed: 1.2,
            curve: 1.5,
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
          <Marker
            key={idx}
            longitude={place.lon}
            latitude={place.lat}
            onClick={() => setSelectedPlace({ ...place })}
          >
            <div
              className={`marker-service ${
                place["isVisitted"] ? 'marker-visited' : ''
              }`}
              title={place.title}
            />
          </Marker>
        ))}

        {selectedPlace && (
          <Popup
            longitude={selectedPlace.lon}
            latitude={selectedPlace.lat}
            onClose={() => setSelectedPlace(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div>
              <h3 className='popup-title'>{selectedPlace.name}</h3>
              <button onClick={() => toggleVisited(selectedPlace.index)} className='visit-btn'>
                {visitedPlaces[selectedPlace.index] ? 'Visited' : 'Mark as Visited'}
              </button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapDisplay;