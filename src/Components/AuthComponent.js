import React, { Component } from "react";
import { getJWT } from "../helpers/jwt";
import { withRouter } from "react-router-dom";
import axios from "axios";

class AuthComponent extends Component {
  state = {};

  componentDidMount() {
    const jwt = getJWT();
    if (!jwt) {
      this.props.history.push("/login");
    }

    axios
      .get("http://localhost:5000/api/v1/company/get-companies/", {
        headers: {
          "x-auth-token": `${jwt}`
        }
      })
      .then(res => console.log(res.data))
      .catch(error => console.log("Error: ", error.response.data));
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthComponent);
