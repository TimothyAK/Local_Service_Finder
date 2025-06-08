import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Title from "../../atoms/Title/Title.js";
import SearchBar from "../../molecules/SearchBar/SearchBar.jsx";
import CategoryList from "../../organism/CategoryList/CategoryList.jsx";
import ProfileDropdown from "../../organism/ProfileDropDown/ProfileDropDown.jsx";
import WarningDialog from "../../molecules/WarningDialog/WarningDialog.jsx";
import ClickForMap from '../../molecules/ClickForMap/ClickForMap.jsx';
import MapSelectDialog from '../../molecules/MapSelectDialog/MapSelectDialog.jsx';
import { deleteAccountAPI } from '../../../api/userAPI.js';
import Loader from '../../atoms/Loader/Loader.jsx';
import "./homepage.css"; 
import { searchAPI } from '../../../api/searchAPI.js';
import { getUserAmenityHistory } from '../../../api/userAmenityAPI.js';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [showPassDialog, setShowPassDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);

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

    if(!localStorage.getItem("userLoc") && localStorage.getItem("allowGetLocation") == undefined) setShowLocationDialog(true)
    else if(localStorage.getItem("allowGetLocation") === "true") getLocation()
    
  }, [])

  const openHistory = async () => {
    const userHistory = await getUserAmenityHistory(localStorage.getItem("userJWT"))
    navigate("/history", {
        state: {
            userHistory: userHistory["data"]["data"]
        }
    })
  };

  const handleOpenMapDialog = () => {
  setShowMapDialog(true);
  };

  const handleCancelMapDialog = () => {
    setShowMapDialog(false);
  };

  const handleConfirmMapDialog = (location) => {
    localStorage.setItem("userLoc", JSON.stringify(location));
    setShowMapDialog(false);
  };

  const handleConfirmSignOut = () =>{
    localStorage.removeItem("userJWT")
    localStorage.removeItem('userLoc')
    localStorage.removeItem('allowGetLocation')
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
    onDeleteAccount: () => setShowDeleteDialog(true),
    onHistory: openHistory
  };

  const handleSearchEnter = async () => {
    if (searchQuery.trim()) {
      const userLoc = JSON.parse(localStorage.getItem("userLoc"))
      setIsLoading(true)
      try{
        const searchResult = await searchAPI(searchQuery, userLoc["latitude"], userLoc["longitude"], localStorage.getItem("userJWT"))
        setIsLoading(false)
        navigate('/map', { 
            state: { 
                searchQuery: searchQuery,
                searchResult: searchResult["data"]["data"]
            } 
        });
      } catch (err) {
        setIsLoading(false)
      }
    }
  };

  const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
        const userLoc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        
        localStorage.setItem("userLoc", JSON.stringify(userLoc))
        localStorage.setItem("allowGetLocation", true)
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
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
          isLoading={isLoading && !showDeleteDialog} 
        />
        <CategoryList onCategoryClick={() => setIsLoading(true)} />
      </div>
      
    <ClickForMap onClick={handleOpenMapDialog} />

      {showMapDialog && (
      <MapSelectDialog
          onConfirm={handleConfirmMapDialog}
          onCancel={handleCancelMapDialog}
        />
      )}
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
          confirmText={isLoading ? <Loader isLoading={showDeleteDialog && isLoading}></Loader> : "Delete"}
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

      {showLocationDialog && (
        <WarningDialog
          message="Please enable your location service"
          subMessage="Allowing location access helps us provide better suggestions."
          onConfirm={() => {
            setShowLocationDialog(false);
            getLocation();

          }}
          onCancel={() => {
            setShowLocationDialog(false)
            localStorage.setItem("allowGetLocation", false)

          }}
          confirmText="Enable"
          confirmClassName="enable-btn"
        />
      )}

      {isLoading && !showDeleteDialog && (
        <div className="fullscreen-loader">
          <Loader isLoading={isLoading} />
          <p className="loader-message">Please wait while your service is being searched...</p>
        </div>
      )}

    </div>
  );
};

export default Homepage;