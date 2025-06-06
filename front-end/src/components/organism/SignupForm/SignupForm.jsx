import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import NextButton from '../../molecules/NextButton/NextButton.jsx';
import { signUpAPI } from '../../../api/userAPI.js';
import './SignupForm.css';

const SignUpForm = () => {
  const [ userName, setUserName] = useState("")
  const [ userEmail, setUserEmail] = useState("")
  const [ userPassword, setUserPassword] = useState("")
    const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate(); 

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        console.log("Signing up...");
        setIsLoading(true)
        const signUpResponse = await signUpAPI(userName, userEmail, userPassword)
        setIsLoading(false)
        navigate('/login');
    } catch (err) {
        // Display error message. Bisa dipake buat show error di form.
        setIsLoading(false)
        console.log(err.response.data.message)
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignUp}>
      <h2 className="form-title">Welcome!</h2>

      <InputGroup
        id="name"
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />

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
        minLength={6}
        required
      />

      <NextButton type="submit" isLoading={isLoading}>Sign Up</NextButton>
    </form>
  );
};

export default SignUpForm;