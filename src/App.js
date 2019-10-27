import React from "react";
import "./App.css";
import Header from "./Components/Header";

class App extends React.Component {
  state = {};
  componentDidMount() {
    fetch("http://localhost:5000/api/v1/student/get-students/")
      .then(res => res.json())
      .then(data => console.log(data));
  }
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">Working</header>
      </div>
    );
  }
}

export default App;
