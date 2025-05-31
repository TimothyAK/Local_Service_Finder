import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import QuerySection from '../../organism/QuerySection/QuerySection';
import ReasoningMap from '../../organism/ReasoningMap/ReasoningMap';
import ReasoningSection from '../../organism/ReasoningSection/ReasoningSection';
import './MapPage.css';

const MapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';
  const searchResult = location.state?.searchResult || '';
  const [currentService, setCurrentService] = useState(0);

  return (
    <div className="map-page">
      <div className="map-layout">
        <div className="map-container">
          <ReasoningMap currentService={currentService} />
        </div>

        <div className="side-panel">
          <QuerySection query={searchQuery} />
          <ReasoningSection searchResult={searchResult} currentService={currentService} setCurrentService={setCurrentService} />
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

export default MapPage;
