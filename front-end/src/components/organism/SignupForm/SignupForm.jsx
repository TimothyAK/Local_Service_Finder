import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import NextButton from '../../molecules/NextButton/NextButton.jsx';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate(); 

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up...");
    navigate('/login');
  };

  return (
    <form className="signup-form" onSubmit={handleSignUp}>
      <h2 className="form-title">Welcome!</h2>

      <InputGroup
        id="name"
        type="text"
        placeholder="Enter your name"
        required
      />

      <InputGroup
        id="email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <InputGroup
        id="password"
        type="password"
        placeholder="Enter your password"
        required
      />

      <NextButton type="submit">Sign Up</NextButton>
    </form>
  );
};

export default SignUpForm;