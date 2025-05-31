import React, { useState } from 'react';
import Button from '../../atoms/Button/Button'
import './HistorySection.css';

const HistorySection = ({ searchResult = [], setCenter }) => {
    const [currentService, setCurrentService] = useState(0)

  return (
    <div className="history-section">
      <h3 className="section-title">History</h3>
      <table className="history-content">
        <thead>
            <tr>
            <th>Service Name</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {searchResult != [] && searchResult.map((service, idx) => (
            <tr key={idx} className={`search-result-container ${(currentService == idx) && "tr-highlight"}`}>
                <td>{service["amenityName"]}</td>
                <td>
                    <button onClick={() => {
                        setCurrentService(idx)
                        setCenter({ lat: service["amenityLat"], lng: service["amenityLon"] })
                    }}>Check Location</button>
                </td>
            </tr>
        ))}
            </tbody>
      </table>
    </div>
  );
};

export default HistorySection;