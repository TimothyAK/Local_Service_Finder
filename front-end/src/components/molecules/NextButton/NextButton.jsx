import React from 'react';
import './NextButton.css';

const NextButton = ({ children, onClick, type = "button" }) => {
  return (
    <button className="next-button" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default NextButton;
