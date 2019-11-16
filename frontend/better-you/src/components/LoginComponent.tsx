import React, { Component, ChangeEvent } from "react";
import "../assets/scss/LoginPageStyle.scss";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import AppState from "../redux/store/store";
import { User } from "../models/User";
import { setCurrentUser } from "../redux/actions/actions";

interface IProps {
  loginUser: Function;
}

interface IState {
  user: User;
  emailError?: string;
  isEmailError?: boolean;
  passwordError?: string;
  isPasswordError?: boolean;
}

class LoginComponent extends Component<IProps, IState> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      user: {
        username: "",
        profileName: "",
        birthDate: new Date(),
        email: "",
        isVerified: false,
        password: "",
        token: ""
      },
      emailError: "",
      isEmailError: false,
      passwordError: "",
      isPasswordError: false
    };
  }

  onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: this.state.user.username,
        profileName: this.state.user.profileName,
        birthDate: this.state.user.birthDate,
        email: event.target.value,
        isVerified: this.state.user.isVerified,
        password: this.state.user.password,
        token: this.state.user.token
      }
    });
  }

  onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: this.state.user.username,
        profileName: this.state.user.profileName,
        birthDate: this.state.user.birthDate,
        email: this.state.user.email,
        isVerified: this.state.user.isVerified,
        password: event.target.value,
        token: this.state.user.token
      }
    });
  }

  handleOnClick = () => {
    this.props.loginUser(this.state.user);
  };

  render() {
    return (
      <div className="login-background">
        <form className="login-container" action="">
          <div className="login-input-container">
            <TextField
              className="login-input"
              onChange={this.onChangeEmail.bind(this)}
              error={this.state.isEmailError}
              helperText={this.state.emailError}
              label="Email:"
            />
            <br />

            <TextField
              className="login-input"
              onChange={this.onChangePassword.bind(this)}
              type="password"
              error={this.state.isPasswordError}
              helperText={this.state.passwordError}
              label="Password:"
            />
            <br />
          </div>

          <div className="login-button-container">
            <Button
              className="login-button"
              onClick={this.handleOnClick.bind(this)}
            >
              Login
            </Button>
          </div>

          <div className="help-links">
            <p>I've forgot my password.</p>
            <p>I don't have an account.</p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (user: User) => dispatch(setCurrentUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);