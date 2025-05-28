import React from 'react';
import './NextButton.css';
import Loader from '../../atoms/Loader/Loader';

const NextButton = ({ children, onClick, type = "button", isLoading }) => {
  return (
    <button className="next-button" onClick={onClick} type={type}>
        <Loader isLoading={isLoading} location=''></Loader>
      {!isLoading && children}
    </button>
  );
};

export default NextButton;
