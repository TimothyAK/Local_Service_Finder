import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import ForgotPass from '../../molecules/ForgotPass/ForgotPass.jsx';
import NextButton from '../../molecules/NextButton/NextButton.jsx';
import SignupRedirect from '../../molecules/SignUpLogin/SignUpLogin.jsx';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in...");
    navigate('/');
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2 className="form-title">Welcome Back!</h2>

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

      <ForgotPass />

      <NextButton type="submit">Login</NextButton>
      <SignupRedirect />

    </form>
  );
};

export default LoginForm;
