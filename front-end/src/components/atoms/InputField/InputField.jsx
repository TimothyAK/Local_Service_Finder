import React from 'react';
import './InputField.css'; 

const InputField = ({ id, type = "text", placeholder, className = "", ...rest }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`rounded-input ${className}`}
      {...rest}
    />
  );
};

export default InputField;