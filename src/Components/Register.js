import React, { Component } from "react";
import axios from "axios";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";

import Swal from "sweetalert2";

class Register extends Component {
  state = {
    studentName: "",
    companyName: "",
    email: "",
    password: "",
    description: "",
    contactNo: undefined,
    website: "",
    qualification: "",
    cgpa: undefined,
    message: "",
    flag: false,
    activeTab: 1
  };

  // componentDidUpdate() {
  //   setTimeout(() => this.setState({ message: "" }), 10000);
  // }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggle = tab => {
    if (this.state.activeTab !== tab)
      this.setState({
        activeTab: tab,
        studentName: "",
        companyName: "",
        email: "",
        password: "",
        description: "",
        contactNo: undefined,
        website: "",
        qualification: "",
        cgpa: undefined
      });
  };

  studentFormSubmit = e => {
    e.preventDefault();
    let { studentName, email, password, qualification, cgpa } = this.state;

    if (studentName && email && password && qualification && cgpa) {
      axios
        .post("http://localhost:5000/api/v1/student/register", {
          studentName,
          email,
          password,
          qualification,
          cgpa
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            message: res.data.message,
            flag: true,
            studentName: "",
            email: "",
            password: "",
            qualification: "",
            cgpa: undefined
          });
          Swal.fire({
            icon: "success",
            title: "Registered successfully!",
            text: res.data.message
          });
          this.props.history.push("/");
        })
        .catch(error => {
          this.setState({ message: error.response.data.message, flag: false });
          console.log("Error: ", error.response.data.message);
        });
    } else {
      console.log("Fill all fields");
    }
  };
  companyFormSubmit = e => {
    e.preventDefault();
    let {
      companyName,
      email,
      password,
      description,
      contactNo,
      website
    } = this.state;

    if (
      companyName &&
      email &&
      password &&
      description &&
      contactNo &&
      website
    ) {
      axios
        .post("http://localhost:5000/api/v1/company/register", {
          companyName,
          email,
          password,
          description,
          contactNo,
          website
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            message: res.data.message,
            flag: true,
            companyName: "",
            email: "",
            password: "",
            description: "",
            contactNo: undefined,
            website: ""
          });
          Swal.fire({
            icon: "success",
            title: "Registered successfully!",
            text: res.data.message
          });
          this.props.history.push("/");
        })
        .catch(error => {
          this.setState({ message: error.response.data.message, flag: false });
          console.log("Error: ", error.response.data.message);
        });
    } else {
      console.log("Fill all fields");
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-5">Registration Form</h1>
        {this.state.message ? (
          <Alert
            className="mb-4"
            color={this.state.flag ? "success" : "danger"}
          >
            {this.state.message}
          </Alert>
        ) : null}
        <Nav tabs fill className="mb-3">
          <NavItem>
            <NavLink
              onClick={() => {
                this.toggle("1");
              }}
            >
              Student
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                this.toggle("2");
              }}
            >
              Company
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Form onSubmit={e => this.studentFormSubmit(e)}>
              <h4>Student Registration</h4>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="studentName"
                  placeholder="Enter your full name"
                  value={this.state.studentName}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Qualification</Label>
                <Input
                  type="text"
                  name="qualification"
                  placeholder="Enter your qualification"
                  value={this.state.qualification}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>CGPA</Label>
                <Input
                  type="number"
                  name="cgpa"
                  placeholder="Enter your cgpa"
                  value={this.state.cgpa}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                block
                onClick={this.studentFormSubmit}
              >
                Submit
              </Button>
            </Form>
          </TabPane>
          <TabPane tabId="2">
            <Form onSubmit={this.companyFormSubmit}>
              <h4>Company Registration</h4>
              <FormGroup>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Enter Company name"
                  value={this.state.companyName}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter Company description"
                  value={this.state.description}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Contact Number</Label>
                <Input
                  type="number"
                  name="contactNo"
                  placeholder="Enter Contact no."
                  value={this.state.contactNo}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="website"
                  placeholder="Enter Website URL  "
                  value={this.state.website}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                block
                onClick={this.companyFormSubmit}
              >
                Submit
              </Button>
            </Form>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Register;
