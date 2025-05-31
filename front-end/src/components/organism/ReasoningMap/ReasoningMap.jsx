import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup } from '@vis.gl/react-maplibre';
import { useLocation } from 'react-router-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import './ReasoningMap.css';

const ReasoningMap = ({ currentService }) => {
  const mapRef = useRef(null); 
  const location = useLocation();
  const stateSearchResult = location.state?.searchResult || [];       
  const mapInstanceRef = useRef(null); 
  const [loaded, setLoaded] = useState(false);
  const [places, setPlaces] = useState([])
  const [pendingUpdatedPlaces, setPendingUpdatedPlaces] = useState([])
  const [center, setCenter] = useState({ lat: -6.17545, lng: -106.82702 })

  useEffect(() => {
    let userLoc = null;
    try {
        const userLocJSON = localStorage.getItem('userLoc');
        userLoc = userLocJSON ? JSON.parse(userLocJSON) : null;
        setCenter({ lat: userLoc.latitude, lng: userLoc.longitude })
    } catch {}

    const initialPlaces = stateSearchResult.map((p, i) => ({
      ...p,
      title: p.name,
      index: i, 
    }));
    
    setPlaces(initialPlaces);
  }, []);

  useEffect(() => {
    if (loaded && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [center.lng, center.lat],
        zoom: 14,
        speed: 1.2,
        curve: 1.5,
      });
    }
  }, [loaded])

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
        {center && (
          <Marker longitude={center.lng} latitude={center.lat}>
            <div className="marker-user" title="Your Location" />
          </Marker>
        )}
        {places.map((place, idx) => (
          <Marker
            key={idx}
            longitude={place.lon}
            latitude={place.lat}
            onClick={() => setSelectedPlace({ ...place, index:idx })}
          >
            <div
              className={`marker-service ${(currentService == idx) && 'marker-highlight'}`}
              title={place.title}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default ReasoningMap;