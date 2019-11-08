import React, { Component } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

import { connect } from "react-redux";
import { adminLogin } from "../store/Actions/authActions";

class AdminLogin extends Component {
  state = {
    email: "",
    password: "",
    message: "",
    flag: false,
    activeTab: 1
  };

  componentDidUpdate() {
    setTimeout(() => this.setState({ message: "" }), 7000);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  studentFormSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;

    if (email && password) {
      console.log("props: ", this.props);
      let data = {
        email,
        password
      };
      this.props.adminLogin(data, this.props.history);
      this.setState({ email: "", password: "" });
    } else {
      console.log("Fill all fields");
    }
  };

  toggle = tab => {
    if (this.state.activeTab !== tab)
      this.setState({ activeTab: tab, email: "", password: "" });
  };

  render() {
    return (
      <div className="Login">
        <h1 className="mb-5">Admin Portal</h1>
        {this.props.error.status === false ? (
          <Alert color="danger">{this.props.error.msg}</Alert>
        ) : null}
        <Form onSubmit={e => this.studentFormSubmit(e)}>
          <FormGroup>
            <Label for="email">Email</Label>
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
            <Label for="pass">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { adminLogin }
)(AdminLogin);
