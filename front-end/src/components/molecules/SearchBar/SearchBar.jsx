import React from "react";
import InputField from "../../atoms/InputField/InputField";
import "./SearchBar.css"; 
import Loader from "../../atoms/Loader/Loader";

const SearchBar = ({ value, onChange, onEnter, isLoading }) => { 
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
      <Loader isLoading={isLoading} location="search"></Loader>
    </div>
  );
};

export default SearchBar;