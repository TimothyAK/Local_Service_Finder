import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MapDisplay from '../../organism/MapDisplay/MapDisplay';
import Icon from '../../atoms/Icon/Icon';
import './ServicePage.css';

const serviceIcons = {
  'F&B': 'restaurant',
  'Finance': 'account_balance',
  'Shopping': 'shopping_cart',
  'Healthcare': 'local_hospital',
  'Entertainment': 'movie'
};

const ServicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceType = location.state?.serviceType || '';

  return (
    <div className="service-page">
      <div className="service-layout">
        <div className="map-container">
          <MapDisplay serviceType={serviceType} />
        </div>

        <div className="service-info-panel">
          <div className="service-icon-wrapper">
            <i className="material-icons service-icon">
              {serviceIcons[serviceType] || 'place'}
            </i>
          </div>
          <h1 className="service-title">{serviceType}</h1>
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

export default ServicePage;