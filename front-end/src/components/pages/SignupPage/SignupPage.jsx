import React from 'react';
import SignUpForm from '../../organism/SignupForm/SignupForm.jsx';
import './SignupPage.css';
import wave from '../../../assets/wave.svg';
import PageTransition from '../../atoms/PageTransition/PageTransition.jsx';

const SignUpPage = () => {
  return (
    <PageTransition type="slide"> 
      <div className="signup-page">
        <SignUpForm />
        <img src={wave} alt="background wave" className="wave" />
      </div>
    </PageTransition>
  );
};

export default SignUpPage;