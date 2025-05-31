import React from 'react';
import './ReasoningSection.css';

const ReasoningSection = ({ searchResult = [] }) => {
  return (
    <div className="reasoning-section">
      <h3 className="reasoning-section-title">Reasoning</h3>
      <div className="reasoning-content">
        {searchResult != [] && searchResult.map((service) => (
            <div className="search-result-container">
                <p className="service-name">{service["service_name"]}</p>
                <p className="justification">{service["justification"]}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ReasoningSection;