import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import "./assets/scss/AppStyle.scss";
import { StylesProvider } from '@material-ui/core/styles';
import LoginComponent from './components/LoginComponent';

export default class App extends Component {
  render() {
    return (
      <div className="main-container">
        <StylesProvider injectFirst>
          <Router>
            <Routes/>
          </Router>
        </StylesProvider>
      </div>
    );
  }
}
