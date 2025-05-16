import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputGroup from '../../molecules/InputGroup/InputGroup';
import NextButton from '../../molecules/NextButton/NextButton';
import './ForgotPassForm.css';

const ForgotPassForm = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Sending reset link...");
    navigate('/login');
  };

  return (
    <form className="forgot-pass-form" onSubmit={handleReset}>
      <h2 className="form-title">Forgot Your Password?</h2>

      <InputGroup
        id="email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <NextButton type="submit">Send Reset Link</NextButton>
    </form>
  );
};

export default ForgotPassForm;