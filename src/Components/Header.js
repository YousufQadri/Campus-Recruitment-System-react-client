import React, { Component } from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <h1 className="navbar-brand">Campus Recruitment System</h1>
        <form className="nav navbar-nav navbar-right form-inline my-2 my-lg-0">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Sign Up
          </button>

          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
