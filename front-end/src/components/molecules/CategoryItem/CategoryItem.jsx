import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../atoms/Icon/Icon.jsx";
import Text from "../../atoms/Text/Text";
import "./CategoryItem.css";

function CategoryItem({ icon, label, onClick }) {
  return (
    <div 
      className="CategoryItem" 
      onClick={onClick}
    >
      <Icon icon={icon} />
      <Text text={label} />
    </div>
  );
}

export default CategoryItem;