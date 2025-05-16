import React from 'react';
import './TextLabel.css';

const TextLabel = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-label">
      {children}
    </label>
  );
};

export default TextLabel;
