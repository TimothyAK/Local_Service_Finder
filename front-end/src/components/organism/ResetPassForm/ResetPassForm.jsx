import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import NextButton from '../../molecules/NextButton/NextButton.jsx';
import { resetPasswordAPI } from '../../../api/userAPI.js';
import './ResetPassForm.css';

const ResetPassForm = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const requestId = localStorage.getItem("requestId")
    if(!requestId || requestId == "") navigate("/login")
    setUserEmail(requestId) // RequestId is the same as user email
  }, [])

  const handleReset = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true)
        const resetPasswordResponse = await resetPasswordAPI(userEmail, userPassword, newPassword);
        localStorage.removeItem("requestId");
        setIsLoading(false)
        navigate('/login');
    } catch (err) {
        // Display error message. Bisa dipake buat show error di form.
        setIsLoading(false)
    }
  };

  return (
    <form className="resetpass-form" onSubmit={handleReset}>
      <h2 className="form-title">Reset Your Password</h2>

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
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        required
      />

      <InputGroup
        id="new-password"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <InputGroup
        id="confirm-password"
        type="password"
        placeholder="Confirm new password"
        required
      />

      <NextButton type="submit" isLoading={isLoading}>Reset Password</NextButton>
    </form>
  );
};

export default ResetPassForm;
