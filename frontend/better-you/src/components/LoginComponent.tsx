import React, { Component, ChangeEvent } from "react";
import "../assets/scss/LoginPageStyle.scss";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import AppState from "../redux/store/store";
import { setCurrentUserBegin } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import Service from "../services/Service";
import { LoginException } from "../exceptions/LoginException";
import { UserLoginDTO } from "../models/UserLoginDTO";

interface IProps {
  loginUser: Function;
}

interface IState {
  user: UserLoginDTO;
  error: LoginException;
}

class LoginComponent extends Component<IProps, IState> {
  service: Service;

  constructor(prop: IProps) {
    super(prop);
    this.service = Service.getInstance();
    this.state = {
      user: {
        email: "",
        password: "",
        token: ""
      },
      error: {
        emailError: "",
        passwordError: ""
      }
    };
  }

  onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        email: event.target.value,
        password: this.state.user.password,
        token: this.state.user.token
      }
    });
  }

  onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        email: this.state.user.email,
        password: event.target.value,
        token: this.state.user.token
      }
    });
  }

  async handleOnClick() {
    let validationResult: LoginException = this.service.validateLoginUser(
      this.state.user
    );
    if (
      validationResult.emailError.length > 0 ||
      validationResult.passwordError.length > 0
    ) {
      this.setState({
        error: validationResult
      });
    } else {
      // let result = await this.service.loginUser(this.state.user);
      this.props.loginUser(this.state.user);
      // console.log(result);
    }
  }

  render() {
    return (
      <div className="login-background">
        <form className="login-container" action="">
          <div className="login-input-container">
            <TextField
              className="login-input"
              onChange={this.onChangeEmail.bind(this)}
              helperText={this.state.error.emailError}
              error={this.state.error.emailError ? true : false}
              label="Email:"
            />
            <br />

            <TextField
              className="login-input"
              onChange={this.onChangePassword.bind(this)}
              type="password"
              helperText={this.state.error.passwordError}
              error={this.state.error.passwordError ? true : false}
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
            <p>I've forgot my password</p>
            <Link to="/register" className="help-link-register">
              I don't have an account
            </Link>
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
    loginUser: (user: UserLoginDTO) => dispatch(setCurrentUserBegin(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
