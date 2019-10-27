import React, { Component } from "react";

class SignUp extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    console.log(e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmit = () => {};

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.formSubmit}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={this.onChange}
            name="email"
            value={this.state.email}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={this.onChange}
            name="password"
            value={this.state.password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
