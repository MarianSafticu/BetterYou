import React, { Component } from "react";
import AppBarComponent from "./AppBarComponent";
import "../assets/scss/AppsPageStyle.scss";

export default class AppsPageComponent extends Component {
  render() {
    return (
      <div className="apps-page-container">
        <AppBarComponent />
        <div className="page-content">N-avem nimic momentan.</div>
      </div>
    );
  }
}
