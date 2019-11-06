import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { getJWT } from "./helpers/jwt";
import AuthComponent from "./Components/AuthComponent";
import StudentDashboard from "./Components/Dashboard/StudentDashboard";
import CompanyDashboard from "./Components/Dashboard/CompanyDashboard";

class App extends React.Component {
  state = { isLoggedIn: false };

  render() {
    const token = getJWT();
    return (
      <div className="App">
        <Router>
          <Header token={token} />
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/register" exact component={Register} />
            <AuthComponent
              exact
              path="/student-dashboard"
              component={StudentDashboard}
            />
            <AuthComponent
              exact
              path="/company-dashboard"
              component={CompanyDashboard}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
