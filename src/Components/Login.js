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

import { connect } from "react-redux";
import { studentLogin, companyLogin } from "../store/Actions/authActions";

class Login extends Component {
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
      this.props.studentLogin(data, this.props.history);
    } else {
      console.log("Fill all fields");
    }
  };
  companyFormSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;

    if (email && password) {
      console.log("props: ", this.props);
      let data = {
        email,
        password
      };
      this.props.companyLogin(data, this.props.history);
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
        <h1 className="mb-5">Log in to your account</h1>
        {this.state.message ? (
          <Alert color={this.state.flag ? "success" : "danger"}>
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
              <h4>Student Login</h4>
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
          </TabPane>
          <TabPane tabId="2">
            <Form onSubmit={this.companyFormSubmit}>
              <h4>Company Login</h4>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
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
                  id="pass"
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { studentLogin, companyLogin }
)(Login);
