import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import "./assets/scss/AppStyle.scss";

export default class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Router>
          <Routes/>
        </Router>
      </div>
    );
  }
}
