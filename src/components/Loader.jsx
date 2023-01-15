import React from "react";
import "../App.css";
import logo from "../assets/images/logoInverted.png";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loading-spinner">
        <img className="loading-logo" src={logo} />
      </div>
    </div>
  );
};

export default Loader;
