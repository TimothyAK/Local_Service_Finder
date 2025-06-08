import React, { useState } from 'react';
import Button from '../../atoms/Button/Button'
import './HistorySection.css';
import { useEffect } from 'react';

const HistorySection = ({ userHistory = [], setCenter, currentService, setCurrentService }) => {
    useEffect(() => {
        setCurrentService(userHistory[0])
    }, [])
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
                <tr key={idx} className={`user-history-container ${(currentService["amenityid"] == service["amenityid"]) && "tr-highlight"}`}>
                    <td>{service["amenityName"]}</td>
                    <td>
                        <button onClick={() => {
                            setCurrentService(service)
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