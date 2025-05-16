import React from 'react';
import './PopupItem.css';

const PopupItem = ({ label, onClick, isDanger = false }) => {
  return (
    <button 
      className={`popup-item ${isDanger ? 'danger' : ''}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PopupItem;