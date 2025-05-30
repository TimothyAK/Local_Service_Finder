import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapDisplay from '../../organism/MapDisplay/MapDisplay';
import HistorySection from '../../organism/HistorySection/HistorySection';
import './HistoryPage.css';

const HistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';
  const searchResult = location.state?.searchResult || '';
  const [locationMarkers, setLocationMarkers] = useState([])

  useEffect(() => {
    setLocationMarkers(searchResult)
  }, [])

  return (
    <div className="map-page">
      <div className="map-layout">
        <div className="map-container">
          <MapDisplay serviceType={searchQuery} locations={locationMarkers}/>
        </div>

        <div className="side-panel">
          <HistorySection searchResult={searchResult} />
        </div>
      </div>

      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Back to Fervice Sinder
      </button>
    </div>

  );
};

export default HistoryPage;
