import React, { Component } from "react";
import { getJWT } from "../../helpers/jwt";
import axios from "axios";
import CompaniesView from "../Display/CompaniesView";
import JobsView from "../Display/JobsView";
import ProfileView from "../Display/ProfileView";

class StudentDashboard extends Component {
  state = {
    companies: [],
    jobs: [],
    appliedJobs: [],
    profile: [],
    selectedMenu: "Profile",
    isLoading: false
  };

  componentDidMount() {
    const jwt = getJWT();
    if (jwt) {
      this.setState({ isLoading: true });
      // Fetch companies API
      axios
        .get("http://localhost:5000/api/v1/student/get-profile/", {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("Student: ", res.data.student[0]);
          this.setState({ profile: res.data.student[0] });
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
        .get("http://localhost:5000/api/v1/student/get-data/", {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("Companies: ", res.data);
          this.setState({
            companies: res.data.companies,
            jobs: res.data.allJobs,
            appliedJobs: res.data.appliedJobs
          });
        })
        .catch(error => console.log("Error: ", error.response.data));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // if(this.state.selectedMenu === "")
    // const jwt = getJWT();
    // console.log("State: ", this.state.profile);
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <React.Fragment>
        <h1>Dashboard</h1>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <ul className="list-group">
                {/* Options Menu */}
                <h3 className="text-center">Menu</h3>
                <li
                  className="list-group-item d-flex justify-content-between list-group-item-action active`"
                  onClick={() => this.setState({ selectedMenu: "Profile" })}
                >
                  Profile
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "Companies" });
                  }}
                  // this.setState({ selectedMenu: "Companies" })
                >
                  Companies
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
                  Current Jobs
                  <span className="badge badge-primary badge-pill">
                    {this.state.jobs.length}
                  </span>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ selectedMenu: "AppliedJobs" });
                  }}
                >
                  Applied Jobs
                  <span className="badge badge-primary badge-pill">
                    {this.state.appliedJobs.length}
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
                {this.state.selectedMenu === "Profile" && (
                  <ProfileView profile={this.state.profile} />
                )}
                {this.state.selectedMenu === "Companies" &&
                  this.state.companies.map(company => (
                    <CompaniesView key={company._id} company={company} />
                  ))}
                {this.state.selectedMenu === "Jobs" &&
                  this.state.jobs.map(job => (
                    <JobsView key={job._id} job={job} />
                  ))}
                {this.state.selectedMenu === "AppliedJobs" &&
                  (this.state.appliedJobs.length === 1 ? (
                    <JobsView
                      key={this.state.appliedJobs._id}
                      job={this.state.appliedJobs}
                    />
                  ) : (
                    this.state.appliedJobs.map(apjob => (
                      <JobsView key={apjob._id} job={apjob} />
                    ))
                  ))}
              </div>

              {/* {this.state.selectedMenu === "Profile" ? (
                  
                ) : (
                  
                  this.state.jobs.map(job => (
                    <JobsView
                      key={job._id}
                      title={job.title}
                      desc={job.description}
                      // website={job.website}
                    />
                  ))
                )} */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentDashboard;
