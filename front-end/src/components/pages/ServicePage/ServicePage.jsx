import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import MapDisplay from '../../organism/MapDisplay/MapDisplay';
import './ServicePage.css';

const ServicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceType = location.state?.serviceType || '';

  return (
    <div className="service-page">
      <div className="service-layout">
          <MapDisplay serviceType={serviceType} />
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