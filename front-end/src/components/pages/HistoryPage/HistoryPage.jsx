import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import HistoryMap from '../../organism/HistoryMap/HistoryMap';
import HistorySection from '../../organism/HistorySection/HistorySection';
import './HistoryPage.css';

const HistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userHistory = location.state?.userHistory || '';

  useEffect(() => {
  }, [])

  return (
    <div className="map-page">
      <div className="map-layout">
        <div className="map-container">
          <HistoryMap/>
        </div>

        <div className="side-panel">
          <HistorySection searchResult={userHistory} />
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
