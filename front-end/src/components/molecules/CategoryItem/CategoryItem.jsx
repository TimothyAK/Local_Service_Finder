import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../atoms/Icon/Icon.jsx";
import Text from "../../atoms/Text/Text";
import "./CategoryItem.css";

function CategoryItem({ icon, label, to, state }) {
  const navigate = useNavigate();

  return (
    <div 
      className="CategoryItem" 
      onClick={() => navigate(to, { state })}
    >
      <Icon icon={icon} />
      <Text text={label} />
    </div>
  );
}

export default CategoryItem;