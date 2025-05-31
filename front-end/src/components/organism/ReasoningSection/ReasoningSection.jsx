import React, { useEffect } from 'react';
import './ReasoningSection.css';

const ReasoningSection = ({ searchResult = [], currentService, setCurrentService }) => {
    return (
        <div className="reasoning-section">
            <h3 className="reasoning-section-title">Reasoning</h3>
            <div className="reasoning-content">
                {searchResult != [] && searchResult.map((service, idx) => (
                    <div onClick={() => {
                        setCurrentService(idx)
                    }} className={`search-result-container ${(currentService == idx) && "div-highlight"}`}>
                        <p>{service["service_name"]}</p>
                        <p>{service["justification"]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReasoningSection;