import React, { Component } from "react";
import { getJWT } from "../helpers/jwt";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class AuthComponent extends Component {
  state = {};
  render() {
    let { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return getJWT() ? (
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
