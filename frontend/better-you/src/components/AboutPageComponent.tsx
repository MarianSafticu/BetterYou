import React, { Component } from "react";
import AppBarComponent from "./AppBarComponent";
import "../assets/scss/AboutPageStyle.scss";

export default class AboutPageComponent extends Component {
  render() {
    return (
      <div className="about-page-container">
        <AppBarComponent />
        <div className="page-content">It's all about us</div>
      </div>
    );
  }
}
