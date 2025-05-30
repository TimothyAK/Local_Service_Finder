import React from 'react';
import ResetPassForm from '../../organism/ResetPassForm/ResetPassForm.jsx';
import './ResetPassPage.css';
import wave from '../../../assets/wave.svg';
import PageTransition from '../../atoms/PageTransition/PageTransition.jsx';

const ResetPassPage = () => {
  return (
    <PageTransition type="slide">
      <div className="resetpass-page">
        <ResetPassForm />
        <img src={wave} alt="background wave" className="wave" />
      </div>
    </PageTransition>
  );
};

export default ResetPassPage;
