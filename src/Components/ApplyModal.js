import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getJWT } from "../helpers/jwt";
import axios from "axios";
import Swal from "sweetalert2";

class ApplyModal extends React.Component {
  state = {
    modal: false,
    skills: "",
    experience: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  applyForJob = () => {
    const jobId = this.props.job._id;
    const jwt = getJWT();
    console.log(jobId);

    let data = { skills: this.state.skills, experience: this.state.experience };
    if (jwt) {
      axios
        .post(`http://localhost:5000/api/v1/job/apply/${jobId}`, data, {
          headers: {
            "x-auth-token": `${jwt}`
          }
        })
        .then(res => {
          console.log("Application: ", res.data);
          Swal.fire({
            icon: "success",
            title: "Applied successfully",
            text: res.data.message
          });
          this.toggle();
          this.setState({ skills: "", experience: "" });
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops... Something went wrong",
            text: error.response.data.message
          });
          this.toggle();
          this.setState({ skills: "", experience: "" });
          console.log("Error: ", error.response.data);
        });
    } else {
      console.log("no token found");
    }
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    const { jobTitle, description } = this.props.job;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.label}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Job Application</ModalHeader>
          <ModalBody>
            <h4>
              <strong>Job title:</strong> {jobTitle}
            </h4>
            <p>
              <strong>Job Description:</strong> {description}
            </p>
            <form onSubmit={this.applyForJob}>
              <div className="form-group">
                <input
                  type="text"
                  value={this.state.skills}
                  name="skills"
                  onChange={this.onChange}
                  placeholder="Enter your skills"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="experience"
                  value={this.state.experience}
                  onChange={this.onChange}
                  placeholder="Enter experience"
                  className="form-control"
                  required
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.applyForJob()}>
              Apply
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ApplyModal;
