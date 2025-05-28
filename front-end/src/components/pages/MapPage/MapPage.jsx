import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapDisplay from '../../organism/MapDisplay/MapDisplay';
import QuerySection from '../../organism/QuerySection/QuerySection';
import ReasoningSection from '../../organism/ReasoningSection/ReasoningSection';
import './MapPage.css';

const MapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';
  const searchResult = location.state?.searchResult || '';
  const [locationMarkers, setLocationMarkers] = useState([])

  useEffect(() => {
    const resultMarkers = searchResult.map((location) => {
        return {
            "lat": location["lat"],
            "lng": location['lon']
        }
    })
    setLocationMarkers(resultMarkers)
  }, [])

  return (
    <div className="map-page">
      <div className="map-layout">
        <div className="map-container">
          <MapDisplay serviceType={searchQuery} locations={locationMarkers}/>
        </div>

        <div className="side-panel">
          <QuerySection query={searchQuery} />
          <ReasoningSection />
        </div>
      </div>

      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Back to Service Sinder
      </button>
    </div>

  );
};

export default MapPage;
