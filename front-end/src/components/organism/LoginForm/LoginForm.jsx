import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import ForgotPass from '../../molecules/ForgotPass/ForgotPass.jsx';
import NextButton from '../../molecules/NextButton/NextButton.jsx';
import SignupRedirect from '../../molecules/SignUpLogin/SignUpLogin.jsx';
import './LoginForm.css';
import { UserContext } from '../../../context/UseContext.jsx';

const LoginForm = () => {
  const { userEmail, setUserEmail } = useContext(UserContext)
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
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
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
