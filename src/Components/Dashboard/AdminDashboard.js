import React, { Component } from "react";
import { getJWT } from "../../helpers/jwt";
import axios from "axios";
import JobsView from "../Display/JobsView";
import CompanyProfileView from "../Display/CompanyProfileView";
import StudentsView from "../Display/StudentsView";
import CompaniesView from "../Display/CompaniesView";

import { connect } from "react-redux";
import { loadUserAdmin } from "../../store/Actions/authActions";

class AdminDashboard extends Component {
  state = {
    students: [],
    companies: [],
    applicants: [],
    profile: [],
    selectedMenu: "Profile",
    isLoading: false
  };

  componentDidMount() {
    this.props.loadUserAdmin(this.props.history);

    const jwt = getJWT();
    if (jwt) {
      this.setState({ isLoading: true });
      // Fetch companies API
      // axios
      //   .get("http://localhost:5000/api/v1/admin/get-profile/", {
      //     headers: {
      //       "x-auth-token": `${jwt}`
      //     }
      //   })
      //   .then(res => {
      //     console.log("Company: ", res.data.company[0]);
      //     this.setState({ profile: res.data.company[0] });
      //   })
      //   .catch(error => console.log("Error: ", error.response.data));
      this.fetchData();
      this.setState({ isLoading: false });
    }
  }

  fetchData = () => {
    const jwt = getJWT();
    if (jwt) {
      axios
        .get("http://localhost:5000/api/v1/admin/get-data/", {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("Admin data: ", res.data);
          this.setState({
            students: res.data.students,
            companies: res.data.companies,
            jobs: res.data.jobs
          });
        })
        .catch(error => console.log("Error: ", error.response.data));
    }
  };

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <React.Fragment>
        <h1 className="mt-5 font-weight-bold">Admin Dashboard</h1>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <ul className="list-group">
                {/* Options Menu */}
                <h3 className="text-center list-group-item list-group-item-secondary">
                  Menu
                </h3>
                <li
                  className="list-group-item d-flex justify-content-between list-group-item-action active`"
                  onClick={() => this.setState({ selectedMenu: "Summary" })}
                >
                  Summary
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "Students" });
                  }}
                >
                  Students
                  <span className="badge badge-primary badge-pill">
                    {this.state.students.length}
                  </span>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "Companies" });
                  }}
                >
                  Registered Companies
                  <span className="badge badge-primary badge-pill">
                    {this.state.companies.length}
                  </span>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "Jobs" });
                  }}
                >
                  Jobs
                  <span className="badge badge-primary badge-pill">
                    {/* {this.state.jobs.length} */}
                  </span>
                </li>
              </ul>
            </div>
            {/* Loader or content */}
            {/* {!this.state.companies || !this.state.jobs ? (
              <div>Loading...</div>
            ) : ( */}
            <div className="col-sm-12 col-md-9">
              <div className="row">
                {this.state.selectedMenu === "Summary" && (
                  <CompanyProfileView profile={this.state.profile} />
                )}
                {this.state.selectedMenu === "Students" &&
                  this.state.students.map(student => (
                    <StudentsView key={student._id} student={student} />
                  ))}
                {this.state.selectedMenu === "Companies" &&
                  this.state.companies.map(company => (
                    <CompaniesView key={company._id} company={company} />
                  ))}
                {this.state.selectedMenu === "Jobs" &&
                  this.state.jobs.map(job => (
                    <JobsView key={job._id} job={job} applyModal={false} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadUserAdmin }
)(AdminDashboard);
