import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Title from "../../atoms/Title/Title.js";
import SearchBar from "../../molecules/SearchBar/SearchBar.jsx";
import CategoryList from "../../organism/CategoryList/CategoryList.jsx";
import ProfileDropdown from "../../organism/ProfileDropDown/ProfileDropDown.jsx";
import WarningDialog from "../../molecules/WarningDialog/WarningDialog.jsx";
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import "./homepage.css"; 
import { UserContext } from '../../../context/UserContext.jsx';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [showPassDialog, setShowPassDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeletePasswordDialog, setShowDeletePasswordDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(UserContext)

  useEffect(() => {
    if(JSON.stringify(userDetails) == JSON.stringify({})) navigate("/login")
  }, [])

  const handleConfirmSignOut = () =>{
    setUserDetails({})
    setShowSignOutDialog(false)
    navigate('/login')
  }

  const handleCancelSignOut = () =>{
    setShowSignOutDialog(false)
  }

  const handleConfirmResetPass = () =>{
    setShowPassDialog(false)
    localStorage.setItem("requestId", userDetails.email)
    navigate('/reset-pass')
  }

  const handleCancelResetPass = () =>{
    setShowPassDialog(false)
  }

  const handleConfirmDelete = () =>{
    setShowDeleteDialog(false)
    setShowDeletePasswordDialog(true)
  }

  const handleCancelDelete = () => {
  setShowDeleteDialog(false);
};

  const handlePasswordSubmit = () => {
    setShowDeletePasswordDialog(false);
    setDeletePassword("");
  };

  const handleCancelPasswordDialog = () => {
    setShowDeletePasswordDialog(false);
    setDeletePassword("");
  };
  
  const userData = {
    name: userDetails.username,
    onSignOut: () => setShowSignOutDialog(true),
    onChangePassword: () => setShowPassDialog(true),
    onDeleteAccount: () => setShowDeleteDialog(true)
  };

  const handleSearchEnter = () => {
    if (searchQuery.trim()) {
      navigate('/map', { 
        state: { 
          searchQuery: searchQuery 
        } 
      });
    }
  };

  return (
    <div className="homepage">
      <div className="homepage-header">
        <ProfileDropdown {...userData} />
      </div>

      <div className="homepage-content">
        <Title text="Fervice Sinder" />
        <SearchBar 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onEnter={handleSearchEnter} 
        />
        <CategoryList />
      </div>

      {showSignOutDialog && (
        <WarningDialog
          message="Are you sure you want to sign out?"
          subMessage="You will need to log in again to access your account."
          onConfirm={handleConfirmSignOut}
          onCancel={handleCancelSignOut}
          confirmText="Sign Out"
        />
      )}

      {showDeleteDialog && (
        <WarningDialog
          message="Are you sure you want to delete your account?"
          subMessage="Changes can't be undone"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Delete"
        />
      )}

      {showPassDialog && (
        <WarningDialog
          message="Are you sure you want to change password?"
          subMessage="You will need to log in again to access your account."
          onConfirm={handleConfirmResetPass}
          onCancel={handleCancelResetPass}
          confirmText="Confirm"
        />
      )}

      {showDeletePasswordDialog && (
        <WarningDialog
          message="Enter your password to confirm deletion"
          onConfirm={handlePasswordSubmit}
          onCancel={handleCancelPasswordDialog}
          confirmText="Delete Account"
        >
          <InputGroup
            id="delete-password"
            type="password"
            placeholder="Enter your password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className="confirm-password-input"
          />
        </WarningDialog>
      )}

    </div>
  );
};

export default Homepage;