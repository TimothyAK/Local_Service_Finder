import React from 'react';
import './HistorySection.css';

const HistorySection = ({ searchResult = [] }) => {
  return (
    <div className="reasoning-section">
      <h3 className="section-title">History</h3>
      <div className="reasoning-content">
        {searchResult != [] && searchResult.map((service) => (
            <div className="search-result-container">
                <p className="service-name">{service["service_name"]}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;