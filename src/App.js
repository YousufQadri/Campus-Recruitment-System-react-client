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
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";

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
            <AuthComponent
              exact
              path="/admin-dashboard"
              component={AdminDashboard}
            />
            <Route path="/admin" exact component={AdminLogin}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
