import React from 'react';
import './Button.css';

function Button({ onClick, children }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
      <span>&#8250;</span> 
    </button>
  );
}

export default Button;
