import React from "react";
import Title from "../../atoms/Title/Title.js";
import "./FoodPage.css"; 

const FoodPage = () => {
  return React.createElement(
    "div",
    { className: "foodpage" }, 
    React.createElement(Title, { text: "Fervice Sinder" })
  );
};

export default FoodPage;
