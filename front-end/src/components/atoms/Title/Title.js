import React from "react";
import "./Title.css"

function Title(props) {
  return React.createElement(
    "h1",
    {className: "title"},
    props.text
  );
}

export default Title;
