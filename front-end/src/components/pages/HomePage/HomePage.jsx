import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Title from "../../atoms/Title/Title.js";
import SearchBar from "../../molecules/SearchBar/SearchBar.jsx";
import CategoryList from "../../organism/CategoryList/CategoryList.jsx";
import ProfileDropdown from "../../organism/ProfileDropDown/ProfileDropDown.jsx";
import WarningDialog from "../../molecules/WarningDialog/WarningDialog.jsx";
import InputGroup from '../../molecules/InputGroup/InputGroup.jsx';
import ClickForMap from '../../molecules/ClickForMap/ClickForMap.jsx';
import "./homepage.css"; 

const Homepage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [showPassDialog, setShowPassDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeletePasswordDialog, setShowDeletePasswordDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [userDetails, setUserDetails] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("userJWT")) navigate("/login")
    try { 
        const decodedToken = jwtDecode(localStorage.getItem("userJWT"))
        setUserDetails(decodedToken)
        console.log(jwtDecode(localStorage.getItem("userJWT")))
        const currentTime = Date.now() / 1000
        console.log(currentTime)
        if(decodedToken.exp < currentTime){
            localStorage.removeItem("userJWT")
            navigate('/login')
        }
    } catch (error) {
        localStorage.removeItem("userJWT")
        navigate("/login")
    }
  }, [])

  const handleConfirmSignOut = () =>{
    localStorage.setItem("userJWT", '')
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
      
    <ClickForMap />

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