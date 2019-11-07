import React, { Component } from "react";
import { getJWT } from "../../helpers/jwt";
import axios from "axios";
import JobsView from "../Display/JobsView";
import CompanyProfileView from "../Display/CompanyProfileView";
import StudentsView from "../Display/StudentsView";
import JobApplicantView from "../Display/JobAppicantView";
import CreateModal from "../CreateModal";

import { connect } from "react-redux";
import { loadUserCompany } from "../../store/Actions/authActions";

class CompanyDashboard extends Component {
  state = {
    students: [],
    companyJobs: [],
    applicants: [],
    profile: [],
    selectedMenu: "Profile",
    isLoading: false
  };

  componentDidMount() {
    this.props.loadUserCompany(this.props.history);

    const jwt = getJWT();
    if (jwt) {
      this.setState({ isLoading: true });
      // Fetch companies API
      axios
        .get("http://localhost:5000/api/v1/company/get-profile/", {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("Company: ", res.data.company[0]);
          this.setState({ profile: res.data.company[0] });
        })
        .catch(error => console.log("Error: ", error.response.data));
      this.fetchData();
      this.setState({ isLoading: false });
    }
  }

  fetchData = () => {
    const jwt = getJWT();
    if (jwt) {
      axios
        .get("http://localhost:5000/api/v1/company/get-data/", {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("Companies: ", res.data);
          this.setState({
            students: res.data.allStudents,
            companyJobs: res.data.companyJobs,
            applicants: res.data.applicants
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
        <h1 className="mt-5 font-weight-bold">Company Dashboard</h1>
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
                  onClick={() => this.setState({ selectedMenu: "Profile" })}
                >
                  Company Profile
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "Students" });
                  }}
                  // this.setState({ selectedMenu: "Companies" })
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
                    this.setState({ selectedMenu: "Jobs" });
                  }}
                >
                  Current Jobs
                  <span className="badge badge-primary badge-pill">
                    {this.state.companyJobs.length}
                  </span>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "Applicants" });
                  }}
                >
                  Applicants
                  <span className="badge badge-primary badge-pill">
                    {this.state.applicants.length}
                  </span>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "CreateJob" });
                  }}
                >
                  Create Job Post
                </li>
              </ul>
            </div>
            {/* Loader or content */}
            {/* {!this.state.companies || !this.state.jobs ? (
              <div>Loading...</div>
            ) : ( */}
            <div className="col-sm-12 col-md-9">
              <div className="row">
                {this.state.selectedMenu === "Profile" && (
                  <CompanyProfileView profile={this.state.profile} />
                )}
                {this.state.selectedMenu === "Students" &&
                  this.state.students.map(student => (
                    <StudentsView key={student._id} student={student} />
                  ))}
                {this.state.selectedMenu === "Jobs" &&
                  this.state.companyJobs.map(job => (
                    <JobsView key={job._id} job={job} applyModal={false} />
                  ))}
                {this.state.selectedMenu === "Applicants" &&
                  (this.state.applicants.length === 1 ? (
                    <JobApplicantView
                      key={this.state.applicants._id}
                      applicant={this.state.applicants[0]}
                      applyModal={false}
                    />
                  ) : (
                    this.state.applicants.map(applicant => (
                      <JobApplicantView
                        key={applicant._id}
                        applicant={applicant}
                      />
                    ))
                  ))}
                {this.state.selectedMenu === "CreateJob" && (
                  <CreateModal profile={this.state.profile} />
                )}
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
  { loadUserCompany }
)(CompanyDashboard);
