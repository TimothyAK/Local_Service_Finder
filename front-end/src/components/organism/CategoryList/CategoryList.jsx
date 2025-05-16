import React from "react";
import CategoryItem from "../../molecules/CategoryItem/CategoryItem";
import "./CategoryList.css";

const categories = [
  { icon: "restaurant", label: "F&B", to: "/service", serviceType: "F&B" },
  { icon: "account_balance", label: "Finance", to: "/service", serviceType: "Finance" },
  { icon: "shopping_cart", label: "Shopping", to: "/service", serviceType: "Shopping" },
  { icon: "local_hospital", label: "Healthcare", to: "/service", serviceType: "Healthcare" },
  { icon: "movie", label: "Entertainment", to: "/service", serviceType: "Entertainment" }
];

function CategoryList() {
  return (
    <div className="CategoryList">
      {categories.map((category, index) => (
        <CategoryItem 
          key={index} 
          icon={category.icon} 
          label={category.label} 
          to={category.to}
          state={{ serviceType: category.serviceType }}
        />
      ))}
    </div>
  );
}

export default CategoryList;