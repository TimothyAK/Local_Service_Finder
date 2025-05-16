import React from 'react';
import './QuerySection.css';
import InputField from '../../atoms/InputField/InputField';

const QuerySection = ({ query, onChange }) => {
  return (
    <div className="query-section">
      <InputField
        placeholder="Query...."
        className="query-input"
        value={query}
        onChange={onChange}
      />
    </div>
  );
};

export default QuerySection;
