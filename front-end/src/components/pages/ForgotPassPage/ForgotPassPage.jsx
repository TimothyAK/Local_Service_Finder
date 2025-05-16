import React from 'react';
import ForgotPassForm from '../../organism/ForgotPassForm/ForgotPassForm.jsx';
import './ForgotPassPage.css';
import wave from '../../../assets/wavenobg.svg';
import { motion } from 'framer-motion';

const ForgotPassPage = () => {
  return (
    <motion.div
      className="forgot-password-page"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
    >
      <ForgotPassForm />
      <img src={wave} alt="background wave" className="wave" />
    </motion.div>
  );
};

export default ForgotPassPage;