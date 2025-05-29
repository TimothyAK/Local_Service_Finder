import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import MapDisplay from '../../organism/MapDisplay/MapDisplay';
import './ServicePage.css';

const ServicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchResult = location.state?.searchResult || [];

  useEffect(() => {
    console.log(searchResult)
  }, [])

  return (
    <div className="service-page">
      <div className="service-layout">
          <MapDisplay  />
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

export default ServicePage;