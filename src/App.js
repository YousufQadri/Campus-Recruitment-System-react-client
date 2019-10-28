import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./screens/Home";
import AuthComponent from "./Components/AuthComponent";
import Dashboard from "./Components/Dashboard";

class App extends React.Component {
  state = { isLoggedIn: false };
  // componentDidMount() {
  //   fetch("http://localhost:5000/api/v1/student/get-students/")
  //     .then(res => res.json())
  //     .then(data => console.log(data));
  // }
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <AuthComponent
              exact
              // isLoggedIn={isLoggedIn}
              path="/dashboard"
              component={Dashboard}
            />
            {/* <Route path="/dashboard" exact component={Dashboard} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
