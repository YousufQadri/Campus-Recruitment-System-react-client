import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Header = props => {
  const logUserOut = () => {
    localStorage.removeItem("jwt");
    // console.log(props);

    props.history.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <h1 className="navbar-brand">Campus Recruitment System</h1>
        <form className="nav navbar-nav navbar-right form-inline my-2 my-lg-0">
          {!props.token ? (
            <div>
              <Link
                to="/register"
                className="btn btn-outline-success my-2 my-sm-0 mr-2"
              >
                {" "}
                Sign Up
              </Link>
              <Link
                to="/login"
                className="btn btn-outline-success my-2 my-sm-0"
              >
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

export default withRouter(Header);
