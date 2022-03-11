import React from "react";
import "./index.style.css";
const Spinner = (props) => {
  return <div className={"loader " + props.className}></div>;
};

export default Spinner;
