import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Title from "../../atoms/Title/Title.js";
import SearchBar from "../../molecules/SearchBar/SearchBar.jsx";
import CategoryList from "../../organism/CategoryList/CategoryList.jsx";
import ProfileDropdown from "../../organism/ProfileDropDown/ProfileDropDown.jsx";
import WarningDialog from "../../molecules/WarningDialog/WarningDialog.jsx";
import ClickForMap from '../../molecules/ClickForMap/ClickForMap.jsx';
import { deleteAccountAPI } from '../../../api/userAPI.js';
import Loader from '../../atoms/Loader/Loader.jsx';
import "./homepage.css"; 

const Homepage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [showPassDialog, setShowPassDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("userJWT")) navigate("/login")
    try { 
        const decodedToken = jwtDecode(localStorage.getItem("userJWT"))
        setUserDetails(decodedToken)
        const currentTime = Date.now() / 1000
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

  const handleConfirmDelete = async () =>{
    try {
        setIsLoading(true)
        await deleteAccountAPI(localStorage.getItem("userJWT"))
        setIsLoading(false)
        setShowDeleteDialog(false);
        navigate("/login")
    } catch (err) {
        // Display error message. Bisa dipake buat show error di form.
        setIsLoading(false)
        console.log(err.response.data.message)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
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
          confirmText={isLoading ? <Loader isLoading={isLoading}></Loader> : "Delete"}
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

    </div>
  );
};

export default Homepage;