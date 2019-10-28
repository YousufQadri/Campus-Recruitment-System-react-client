import React, { Component } from "react";
import { getJWT } from "../helpers/jwt";
import axios from "axios";

class Dashboard extends Component {
  state = { data: [] };

  componentDidMount() {
    const jwt = getJWT();
    if (jwt) {
      axios
        .get("http://localhost:5000/api/v1/company/get-companies/", {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("hey: ", res.data);
          this.setState({ data: res.data.companies });
        })
        .catch(error => console.log("Error: ", error.response.data));
    }
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {/* <button onClick={() => this.getCompanies()}>Get companies</button> */}
        {this.state.data.map(company => {
          return (
            <li key={company._id}>
              <h1>{company.name}</h1>
              <p>{company.description}</p>
            </li>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
