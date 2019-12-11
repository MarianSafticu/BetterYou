import React, { Component } from "react";
import "../../assets/scss/start-page/RegisterBarStyle.scss";
import { Button, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RegisterBarComponent extends Component {
  render() {
    return (
      <div className="register-bar-container">
        <Divider />
        <div>
          <div>
            <h1>Start organizing your life</h1>
          </div>
          <Link to="/register" className="register-link">
            <Button className="register-button">Join now</Button>
          </Link>
        </div>
      </div>
    );
  }
}
