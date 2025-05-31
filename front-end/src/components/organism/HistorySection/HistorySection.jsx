import React, { useEffect } from 'react';
import Button from '../../atoms/Button/Button'
import './HistorySection.css';

const HistorySection = ({ searchResult = [] }) => {

    useEffect(() => {
        console.log(searchResult)
    })

  return (
    <div className="history-section">
      <h3 className="section-title">History</h3>
      <table className="history-content">
        <thead>
            <th>Service Name</th>
            <th>Actions</th>
        </thead>
        {searchResult != [] && searchResult.map((service) => (
            <tbody className="search-result-container">
                <td>{service["amenityName"]}</td>
                <td><button>Visit Location</button></td>
            </tbody>
        ))}
      </table>
    </div>
  );
};

export default HistorySection;