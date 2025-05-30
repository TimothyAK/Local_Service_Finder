import React from 'react';
import PopupItem from '../../atoms/PopupItem/PopupItem.jsx';
import "./UserPopupMenu.css";

const UserPopupMenu = ({ userName, onSignOut, onChangePassword, onDeleteAccount, onHistory }) => {
  return (
    <div className="user-popup-menu">
      <div className="popup-header">
        <span className="material-icons account-icon">account_circle</span>
        <div className="popup-username">{userName}</div>
      </div>
      <div className="popup-items">
        <PopupItem 
          label="Change Password" 
          onClick={onChangePassword}
        />
        <PopupItem 
          label="Sign Out" 
          onClick={onSignOut}
        />
        <PopupItem 
          label="History" 
          onClick={onHistory}
        />
        <PopupItem 
          label="Delete Account" 
          onClick={onDeleteAccount} 
          isDanger
        />
      </div>
    </div>
  );
};

export default UserPopupMenu;