import React from 'react';
import { Link } from 'react-router-dom';
import "./Icon.css"

const Icon = ({ to, icon }) => {
  return (
    <Link to={to} className="icon">
      <i className="material-icons">{icon}</i>
    </Link>
  );
};

export default Icon;
