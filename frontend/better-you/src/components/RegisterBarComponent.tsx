import React, { Component } from "react";
import "../assets/scss/RegisterBarStyle.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RegisterBarComponent extends Component {
  render() {
    return (
      <div className="register-bar-container">
        <div className="register-bar-components">
          <div className="register-bar-header">
            <h1>Start organise your life</h1>
          </div>
          <div className="register-bar-button">
            <Link to="/register">
              <Button
                  size="large"
                  color="primary"
              >Join now</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
