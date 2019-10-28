import React, { Component } from "react";
import { getJWT } from "../helpers/jwt";
import axios from "axios";
import CompaniesView from "./Display/CompaniesView";

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
          console.log("hey: ", res.data.companies);
          this.setState({ data: res.data.companies });
        })
        .catch(error => console.log("Error: ", error.response.data));
    }
  }

  render() {
    if (!this.state.data) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="container">
          <div className="row">
            {this.state.data.map(company => (
              <CompaniesView
                key={company._id}
                name={company.name}
                desc={company.description}
                website={company.website}
              />
            ))}
          </div>
        </div>
        {/* <button onClick={() => this.getCompanies()}>Get companies</button> */}
      </div>
    );
  }
}

export default Dashboard;
