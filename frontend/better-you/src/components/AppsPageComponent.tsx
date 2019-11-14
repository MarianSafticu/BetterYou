import React, { Component } from "react";
import AppBarComponent from "./AppBarComponent";
import "../assets/scss/AppsPageStyle.scss";
import { Breakpoint } from "react-socks";
import AppBarMobileComponent from "./AppBarMobileComponent";

export default class AppsPageComponent extends Component {
  render() {
    return (
      <div className="apps-page-container">
        <Breakpoint large up>
          <AppBarComponent />
        </Breakpoint>
        <Breakpoint medium down>
          <AppBarMobileComponent />
        </Breakpoint>
        <div className="page-content">N-avem nimic momentan.</div>
      </div>
    );
  }
}
