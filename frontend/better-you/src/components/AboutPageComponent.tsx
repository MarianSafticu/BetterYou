import React, { Component } from "react";
import AppBarComponent from "./AppBarComponent";
import "../assets/scss/AboutPageStyle.scss";
import { Breakpoint } from "react-socks";
import AppBarMobileComponent from "./AppBarMobileComponent";

export default class AboutPageComponent extends Component {
  render() {
    return (
      <div className="about-page-container">
        <Breakpoint large up>
          <AppBarComponent />
        </Breakpoint>
        <Breakpoint medium down>
          <AppBarMobileComponent />
        </Breakpoint>
        <div className="page-content">It's all about us</div>
      </div>
    );
  }
}
