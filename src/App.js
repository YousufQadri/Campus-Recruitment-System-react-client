import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./screens/Home";
import AuthComponent from "./Components/AuthComponent";
import Protected from "./Components/Protected";

class App extends React.Component {
  state = {};
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
            <AuthComponent>
              <Route path="/protected" exact component={Protected} />
            </AuthComponent>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
