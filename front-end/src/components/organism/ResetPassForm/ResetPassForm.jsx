import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import NextButton from '../../molecules/NextButton/NextButton.jsx';
import './ResetPassForm.css';
import { UserContext } from '../../../context/UseContext.jsx';

const ResetPassForm = () => {
  const { userEmail, setUserEmail } = useContext(UserContext)
  const navigate = useNavigate(); 

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Resetting password...");
    navigate('/login');
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
        id="new-password"
        type="password"
        placeholder="Password"
        required
      />

      <InputGroup
        id="new-password"
        type="password"
        placeholder="Enter new password"
        required
      />

      <InputGroup
        id="confirm-password"
        type="password"
        placeholder="Confirm new password"
        required
      />

      <NextButton type="submit">Reset Password</NextButton>
    </form>
  );
};

export default ResetPassForm;
