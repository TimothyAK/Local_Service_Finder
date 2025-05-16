import React from 'react';
import SignUpForm from '../../organism/SignUpForm/SignUpForm.jsx';
import './SignupPage.css';
import wave from '../../../assets/wave.svg';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  return (
    <motion.div
      className="login-page"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
    >
      <SignUpForm />
      <img src={wave} alt="background wave" className="wave" />
    </motion.div>
  );
};

export default SignUpPage;