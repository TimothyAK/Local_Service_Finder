import React from "react";
import InputField from "../../atoms/InputField/InputField";
import "./SearchBar.css"; 

const SearchBar = ({ value, onChange, onEnter }) => { 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEnter?.(); 
    }
  };

  return (
    <div className="search-bar">
      <InputField
        type="text"
        placeholder="Find what you're looking for..."
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;