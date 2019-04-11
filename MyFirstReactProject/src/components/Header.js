import React from "react";
import "../index.css";

const Header = ({ login }) => (
  <div className="navbar navbar-light bg-ligth box-shadow">
    <div className="container d-flex justify-content-center align-item-center">
      <p className="header-text m-3">Welcome {login}</p>
    </div>
  </div>
);

export default Header;
