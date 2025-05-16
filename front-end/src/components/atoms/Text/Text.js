import React from "react";
import "./text.css";

function Text(props) {
  return React.createElement("p", { className: "text-component" }, props.text);
}

export default Text;
