import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import ForgotPass from '../../molecules/ForgotPass/ForgotPass.jsx';
import NextButton from '../../molecules/NextButton/NextButton.jsx';
import SignupRedirect from '../../molecules/SignUpLogin/SignUpLogin.jsx';
import { loginAPI } from '../../../api/userAPI.js';
import './LoginForm.css';

const LoginForm = () => {
  const [ userEmail, setUserEmail ] = useState("")
  const [ userPassword, setUserPassword ] = useState("")
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        console.log("Logging in...");
        // Call backend user login API
        const loginResponse = await loginAPI(userEmail, userPassword)
        // Set UserContext userDetails to userDetails from login API if credentials correct'
        localStorage.setItem('userJWT', loginResponse.data.token)
        navigate('/');
    } catch (err) {
        // Display error message. Bisa dipake buat show error di form.
        console.log(err.response.data.message)
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2 className="form-title">Welcome Back!</h2>

      <InputGroup
        id="email"
        type="email"
        placeholder="Enter your email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />

      <InputGroup
        id="password"
        type="password"
        placeholder="Enter your password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        required
      />

      <ForgotPass />

      <NextButton type="submit">Login</NextButton>
      <SignupRedirect />

    </form>
  );
};

export default LoginForm;
