import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../store/Actions/authActions";

const Header = props => {
  const logUserOut = () => {
    // localStorage.removeItem("jwt");
    // console.log(props);
    props.logout();

    props.history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <h1 className="navbar-brand">Campus Recruitment System</h1>
        <form className="nav navbar-nav navbar-right form-inline my-2 my-lg-0">
          {!props.auth.isAuthenticated ||
          props.auth.isAuthenticated === null ? (
            <div>
              <Link
                to="/register"
                className="btn btn-outline-success my-2 my-sm-0 mr-3"
              >
                {" "}
                Sign Up
              </Link>
              <Link to="/" className="btn btn-outline-success my-2 my-sm-0">
                {" "}
                Log In
              </Link>
            </div>
          ) : (
            <Link
              to="/"
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={() => logUserOut()}
            >
              {" "}
              Log out
            </Link>
          )}
        </form>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Header));
