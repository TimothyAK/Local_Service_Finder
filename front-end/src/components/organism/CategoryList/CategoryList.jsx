import React from "react";
import CategoryItem from "../../molecules/CategoryItem/CategoryItem";
import { nearbySearchAPI } from "../../../api/amenityAPI";
import "./CategoryList.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: "restaurant", label: "F&B", to: "/service", serviceType: "FNB" },
  { icon: "account_balance", label: "Finance", to: "/service", serviceType: "FINANCE" },
  { icon: "shopping_cart", label: "Shopping", to: "/service", serviceType: "SHOPPING" },
  { icon: "local_hospital", label: "Healthcare", to: "/service", serviceType: "HEALTHCARE" },
  { icon: "movie", label: "Entertainment", to: "/service", serviceType: "ENTERTAINMENT" }
];

// () => 

function CategoryList() {
    const navigate = useNavigate()
  return (
    <div className="CategoryList">
      {categories.map((category, index) => (
        <CategoryItem 
          key={index} 
          icon={category.icon} 
          label={category.label} 
          onClick={async () => {
            const userLoc = JSON.parse(localStorage.getItem("userLoc"))
            const searchResult = await nearbySearchAPI(category.serviceType, userLoc["latitude"], userLoc["longitude"], localStorage.getItem("userJWT"))
            navigate(category.to, { 
                state: {
                    searchResult: searchResult["data"]["data"]
                }
            })
          }}
        />
      ))}
    </div>
  );
}

export default CategoryList;