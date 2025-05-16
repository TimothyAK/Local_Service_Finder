import React from 'react';
import TextLabel from "../../atoms/TextLabel/TextLabel.jsx";
import InputField from "../../atoms/InputField/InputField.jsx";
import "./InputGroup.css"

const InputGroup = ({ label, id, ...rest }) => {
  return (
    <div className="input-group">
      {label && <TextLabel htmlFor={id}>{label}</TextLabel>}
      <InputField id={id} {...rest} /> 
    </div>
  );
};

export default InputGroup;
