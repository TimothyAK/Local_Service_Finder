import React, { useState, useRef, useEffect } from "react";
import Icon from "../../atoms/Icon/Icon";
import UserPopupMenu from "../../molecules/UserPopupMenu/UserPopupMenu";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ name, onSignOut, onChangePassword, onHistory, onDeleteAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <span className="material-icons">account_circle</span>
      </button>
      
      {isOpen && (
        <UserPopupMenu
          userName={name}
          onSignOut={onSignOut}
          onChangePassword={onChangePassword}
          onHistory={onHistory}
          onDeleteAccount={onDeleteAccount}
        />
      )}
    </div>
  );
};

export default ProfileDropdown;