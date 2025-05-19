import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputGroup from '../../molecules/InputGroup/InputGroup';
import NextButton from '../../molecules/NextButton/NextButton';
import { requestResetAPI } from '../../../api/userAPI';
import './ForgotPassForm.css';

const ForgotPassForm = () => {
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
        console.log("Sending reset link...");
        setIsLoading(true)
        const requestResetResponse = await requestResetAPI(userEmail)
        localStorage.setItem("requestId", userEmail)
        setIsLoading(false)
        navigate('/login');
    } catch (err) {
        // Display error message. Bisa dipake buat show error di form.
        setIsLoading(false)
        console.log(err.response.data.message)
    }
  };

  return (
    <form className="forgot-pass-form" onSubmit={handleReset}>
      <h2 className="form-title">Forgot Your Password?</h2>

      <InputGroup
        id="email"
        type="email"
        placeholder="Enter Your Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />

      <NextButton type="submit" isLoading={isLoading}>Send Reset Link</NextButton>
    </form>
  );
};

export default ForgotPassForm;