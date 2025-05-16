import React from 'react';
import LoginForm from '../../organism/LoginForm/LoginForm.jsx';
import wave from '../../../assets/wave.svg';
import './LoginPage.css';
import { motion } from 'framer-motion';

const LoginPage = () => {
  return (
    <motion.div
      className="login-page"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
    >
      <LoginForm />
      <img src={wave} alt="background wave" className="wave" />
    </motion.div>
  );
};

export default LoginPage;