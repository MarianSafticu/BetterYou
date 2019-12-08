import React, { Component, ChangeEvent } from "react";
import { TextField, Button } from "@material-ui/core";
import "../../assets/scss/start-page/StartPageStyle.scss";
import "../../assets/scss/settings/ResetPasswordStyle.scss";
import { ResetPasswordMessages } from "../../messages/ResetPasswordMessages";
import { Link } from "react-router-dom";

interface IProps {
  user?: Function;
}

interface IState {
  password1: string;
  password2: string;
  isRestriction: boolean;
  password1Error: string;
  password2Error: string;
}

export default class ResetPasswordComponent extends Component<IProps, IState> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      password1: "",
      password2: "",
      isRestriction: false,
      password1Error: "",
      password2Error: ""
    };
  }

  render() {
    return (
      <div className="main-div">
        <div className="second-div">
          <form className="form-module" action="">
            <div>Please enter your password twice:</div>
            <br />
            <br />
            <div className="login-input-container">
              <TextField
                error={this.state.password1Error ? true : false}
                className="recover-input-password"
                onChange={this.onChangePassword1.bind(this)}
                helperText={this.state.password1Error}
                type="password"
                label="Password:"
              />
              <br />
              <br />
              <TextField
                error={this.state.password2Error ? true : false}
                className="recover-input-password"
                onChange={this.onChangePassword2.bind(this)}
                helperText={this.state.password2Error}
                type="password"
                label="Password:"
              />
              <br />
              <br />
            </div>
            <div className="login-button-container">
              <Button
                className="login-button"
                onClick={this.handleOnClick.bind(this)}
              >
                {!this.state.isRestriction && <div>Check</div>}
                {this.state.isRestriction && (
                  <Link to="/" className="link">
                    Save
                  </Link>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onChangePassword1(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      password1: event.target.value,
      password2: this.state.password2,
      isRestriction: this.state.isRestriction,
      password1Error: this.state.password1Error,
      password2Error: this.state.password2Error
    });
  }

  onChangePassword2(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      password1: this.state.password1,
      password2: event.target.value,
      isRestriction: this.state.isRestriction,
      password1Error: this.state.password1Error,
      password2Error: this.state.password2Error
    });
  }

  handleOnClick = () => {
    if (this.validateForm()) {
      this.setState({
        isRestriction: true
      });
    }
  };

  validateForm(): boolean {
    let isValid = true;

    if (!this.isValidFirstPassword()) {
      isValid = false;
    }
    if (!this.isValidSecondPassword()) {
      isValid = false;
    }
    if (!this.isSamePassword()) {
      isValid = false;
    }

    return isValid;
  }

  isValidFirstPassword(): boolean {
    let isValid = true;
    let errors = ResetPasswordMessages;

    if (this.state.password1.length === 0) {
      isValid = false;
      this.setState({
        password1Error: errors.INVALID_PASSWORD
      });
    } else if (
      !this.state.password1.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )
    ) {
      isValid = false;
      this.setState({
        password1Error: errors.INVALID_PASSWORD
      });
    } else {
      this.setState({
        password1Error: errors.EMPTY_STRING
      });
    }

    return isValid;
  }

  isValidSecondPassword(): boolean {
    let isValid = true;
    let errors = ResetPasswordMessages;

    if (this.state.password2.length === 0) {
      isValid = false;
      this.setState({
        password2Error: errors.INVALID_PASSWORD
      });
    } else if (
      !this.state.password1.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )
    ) {
      isValid = false;
      this.setState({
        password2Error: errors.INVALID_PASSWORD
      });
    } else {
      this.setState({
        password2Error: errors.EMPTY_STRING
      });
    }

    return isValid;
  }

  isSamePassword(): boolean {
    let isValid = true;
    let errors = ResetPasswordMessages;

    if (this.state.password1 !== this.state.password2) {
      isValid = false;
      this.setState({
        password1Error: errors.NOT_SAME_PASSWORD_ERROR,
        password2Error: errors.NOT_SAME_PASSWORD_ERROR
      });
    }

    return isValid;
  }
}
