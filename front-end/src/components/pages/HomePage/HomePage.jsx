import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../atoms/Title/Title.js";
import SearchBar from "../../molecules/SearchBar/SearchBar.jsx";
import CategoryList from "../../organism/CategoryList/CategoryList.jsx";
import ProfileDropdown from "../../organism/ProfileDropDown/ProfileDropDown.jsx";
import "./homepage.css"; 

const Homepage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  
  const userData = {
    name: "Joshua Darren Chandra",
    onSignOut: () => console.log("Signing out..."),
    onChangePassword: () => console.log("Changing password..."),
    onDeleteAccount: () => console.log("Deleting account...")
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
    </div>
  );
};

export default Homepage;