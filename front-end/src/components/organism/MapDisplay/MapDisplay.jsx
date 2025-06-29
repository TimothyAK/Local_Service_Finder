import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup } from '@vis.gl/react-maplibre';
import { useLocation } from 'react-router-dom';
import { bulkUpdateAPI } from '../../../api/userAmenityAPI';
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

const MapDisplay = () => {
  const mapRef = useRef(null); 
  const location = useLocation();
  const stateSearchResult = location.state?.searchResult || [];       
  const mapInstanceRef = useRef(null); 
  const [loaded, setLoaded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState({});
  const [places, setPlaces] = useState([])
  const [pendingUpdatedPlaces, setPendingUpdatedPlaces] = useState([])
  const [currentInterval, setCurrentInterval] = useState()
  const [center, setCenter] = useState({ lat: -6.17545, lng: 106.82702 })

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

  useEffect(() => {
    clearInterval(currentInterval)

    const newInterval = setInterval(() => {
        if(pendingUpdatedPlaces.length == 0) return
        bulkUpdateAPI(pendingUpdatedPlaces, localStorage.getItem("userJWT"))
        setPendingUpdatedPlaces([])
    }, 3000)

    setCurrentInterval(newInterval)

  }, [pendingUpdatedPlaces])

  const toggleVisited = (place) => {
    setPlaces(places.map(p => {
        if(p["id"] == place["id"]) {
            return {
                ...place,
                "isVisitted": !place["isVisitted"]
            }
        }
        return p
    }))
    place['isVisitted'] = !place["isVisitted"]
    if(pendingUpdatedPlaces.length == 0) {
        setPendingUpdatedPlaces([place])
    }
    else {
        for(let pendingPlace of pendingUpdatedPlaces) {
            if(pendingPlace["id"] == place["id"]) 
                return setPendingUpdatedPlaces(pendingUpdatedPlaces.filter(pendingPlace => pendingPlace["id"] != place["id"]))
        }
        return setPendingUpdatedPlaces([...pendingUpdatedPlaces, place])
    }
  };

  return (
    <div className="map-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
            zoom:0,
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
              className={`marker-service ${place["isVisitted"] ? 'marker-visited' : ''}`}
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
              <button onClick={() => toggleVisited(selectedPlace)} className='visit-btn'>
                {selectedPlace["isVisitted"] ? 'Visited' : 'Mark as Visited'}
              </button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapDisplay;