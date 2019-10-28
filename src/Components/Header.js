import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <h1 className="navbar-brand">Campus Recruitment System</h1>
        <form className="nav navbar-nav navbar-right form-inline my-2 my-lg-0">
          <Link to="/register" className="btn btn-outline-success my-2 my-sm-0">
            {" "}
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-success my-2 my-sm-0">
            {" "}
            Log In
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Header;
