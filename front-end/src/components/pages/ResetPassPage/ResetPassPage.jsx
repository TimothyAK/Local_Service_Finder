import React from 'react';
import ResetPassForm from '../../organism/ResetPassForm/ResetPassForm.jsx';
import './ResetPassPage.css';
import wave from '../../../assets/wave.svg';
import { motion } from 'framer-motion';

const ResetPassPage = () => {
  return (
    <motion.div
      className="resetpass-page"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
    >
      <ResetPassForm />
      <img src={wave} alt="background wave" className="wave" />
    </motion.div>
  );
};

export default ResetPassPage;
