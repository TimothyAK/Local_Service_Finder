import React from 'react';
import LoginForm from '../../organism/LoginForm/LoginForm.jsx';
import wave from '../../../assets/wave.svg';
import './LoginPage.css';
import PageTransition from '../../atoms/PageTransition/PageTransition.jsx';

const LoginPage = () => {
  return (
    <PageTransition type="slide">
      <div className="login-page">
        <LoginForm />
        <img src={wave} alt="background wave" className="wave" />
      </div>
    </PageTransition>
  );
};

export default LoginPage;