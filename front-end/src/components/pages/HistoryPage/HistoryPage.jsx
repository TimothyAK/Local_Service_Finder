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
  const [currentCenter, setCurrentCenter] = useState({ lat: -6.17545, lng: -106.82702 })

  useEffect(() => {
    if(userHistory.length > 0) {
        setCurrentCenter({ lat: userHistory[0]["amenityLat"], lng: userHistory[0]["amenityLon"] })
    }
  }, [])

  return (
    <div className="map-page">
      <div className="map-layout">
        <div className="map-container">
          <HistoryMap center={currentCenter}/>
        </div>

        <div className="side-panel">
          <HistorySection userHistory={userHistory} setCenter={setCurrentCenter} />
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
