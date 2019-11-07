import React from "react";
import { getJWT } from "../helpers/jwt";
import axios from "axios";
import Swal from "sweetalert2";

class CreateModal extends React.Component {
  state = {
    jobTitle: "",
    description: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createJob = e => {
    e.preventDefault();
    const jwt = getJWT();

    let data = {
      jobTitle: this.state.jobTitle,
      description: this.state.description
    };
    if (jwt) {
      axios
        .post(`http://localhost:5000/api/v1/job/create-job/`, data, {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("new job: ", res.data);
          Swal.fire({
            icon: "success",
            title: "Created successfull",
            text: res.data.message
          });
          this.setState({ title: "", description: "" });
        })
        .catch(error => {
          console.log("Error: ", error.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops... Something went wrong",
            text: error.response.data.message
          });
          this.setState({ title: "", description: "" });
        });
    } else {
      console.log("no token found");
    }
  };

  render() {
    return (
      <div>
        <form
          style={{ width: "100%", marginLeft: "100px" }}
          onSubmit={this.createJob}
        >
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              className="form-control"
              name="jobTitle"
              value={this.state.jobTitle}
              onChange={this.onChange}
              placeholder="Enter job title"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              placeholder="Enter job description"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.createJob}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateModal;
