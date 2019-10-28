import React, { Component } from "react";
import axios from "axios";
import Alert from "./Alert";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: "",
    flag: false
  };

  componentDidUpdate() {
    setTimeout(() => this.setState({ message: "" }), 7000);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;

    if (email && password) {
      axios
        .post("http://localhost:5000/api/v1/user/login", {
          email,
          password,
          type: "Student"
        })
        .then(res => {
          console.log(res.data);
          localStorage.setItem("jwt", res.data.token);
          this.props.history.push("/protected");
          // this.setState({ message: res.data.message, flag: true });

          // localStorage.setItem("token", res.data.token);
          // console.log(res.data);
        })
        .catch(error => {
          // this.setState({ message: error.response.data.message, flag: false });
          console.log(error.response.data.message);
        });
    } else {
      console.log("Fill all fields");
    }
  };

  render() {
    return (
      <div>
        <h1>Log in to your account</h1>
        {this.state.message ? (
          <Alert
            message={this.state.message}
            color={this.state.flag ? "green" : "red"}
          />
        ) : null}
        <form onSubmit={this.formSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={this.onChange}
            name="email"
            value={this.state.email}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={this.onChange}
            name="password"
            value={this.state.password}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
