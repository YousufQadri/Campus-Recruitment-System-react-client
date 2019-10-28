import React, { Component } from "react";
import { getJWT } from "../helpers/jwt";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class AuthComponent extends Component {
  state = {};

  //   componentDidMount() {
  //     const jwt = getJWT();
  //     if (!jwt) {
  //       this.props.history.push("/login");
  //     }
  //   }
  render() {
    let { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return localStorage.getItem("jwt") ? (
            <Component {...props} />
          ) : (
            <Redirect exact to={{ pathname: "/" }} />
          );
        }}
      />
    );
  }
}

export default withRouter(AuthComponent);
