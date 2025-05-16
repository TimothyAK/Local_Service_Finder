import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MapDisplay from '../../organism/MapDisplay/MapDisplay';
import QuerySection from '../../organism/QuerySection/QuerySection';
import ReasoningSection from '../../organism/ReasoningSection/ReasoningSection';
import './MapPage.css';

const MapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  return (
    <div className="map-page">
      <div className="map-layout">
        <div className="map-container">
          <MapDisplay location={searchQuery} />
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
