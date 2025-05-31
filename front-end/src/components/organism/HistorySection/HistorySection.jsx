import React, { useState } from 'react';
import Button from '../../atoms/Button/Button'
import './HistorySection.css';

const HistorySection = ({ userHistory = [], setCenter }) => {
    const [currentService, setCurrentService] = useState(0)

  return (
    <div className="history-section">
      <h3 className="history-section-title">History</h3>
      <table className="history-content">
        <thead>
            <tr>
                <th>Service Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {userHistory != [] && userHistory.map((service, idx) => (
            service["isVisitted"] &&
            <tr key={idx} className={`user-history-container ${(currentService == idx) && "tr-highlight"}`}>
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