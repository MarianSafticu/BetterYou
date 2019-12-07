import React, { Component, ChangeEvent } from "react";
import "../../assets/scss/auth-page/LoginPageStyle.scss";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import { setCurrentUserBegin } from "../../redux/actions/actions";
import { Link, Redirect } from "react-router-dom";
import Service from "../../services/Service";
import { LoginException } from "../../exceptions/LoginException";
import SnackbarComponent from "../messages/SnackbarComponent";
import UserDTO from "../../models/UserDTO";
import LoginRequest from "../../models/requests/LoginRequest";

interface IProps {
  loading: boolean;
  error: string;
  userInfo: UserDTO | undefined;
  loginUser: Function;
}

interface IState {
  typingUser: LoginRequest;
  error: LoginException;
  willRedirect: boolean;
}

class LoginComponent extends Component<IProps, IState> {
  service: Service;

  constructor(prop: IProps) {
    super(prop);
    this.service = Service.getInstance();
    this.state = {
      typingUser: {
        email: "",
        password: ""
      },
      error: {
        emailError: "",
        passwordError: ""
      },
      willRedirect: false
    };
  }

  onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      typingUser: {
        email: event.target.value,
        password: this.state.typingUser.password
      }
    });
  }

  onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      typingUser: {
        email: this.state.typingUser.email,
        password: event.target.value
      }
    });
  }

  async handleOnClick() {
    let validationResult: LoginException = this.service.validateLoginUser(
      this.state.typingUser
    );
    if (this.service.validateValidationResult(validationResult)) {
      this.setState({
        error: validationResult
      });
    } else {
      let encryptPassword = this.service.encryptPassword(
        this.state.typingUser.password
      );
      this.state.typingUser.password = encryptPassword;
      this.props.loginUser(this.state.typingUser);
    }
  }

  componentDidUpdate() {
    if (this.props.userInfo) {
      if (this.props.userInfo.isAuthenticated) {
        this.setState({
          willRedirect: true
        });
      }
    }
  }

  render() {
    if (this.state.willRedirect) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <div className="login-background">
          {this.props.error ? (
            <SnackbarComponent message={this.props.error} />
          ) : (
            <div></div>
          )}
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
              <Link to="/recover-account" className="help-link-register">
                I forgot my password
              </Link>
              <br />
              <Link to="/register" className="help-link-register">
                I don't have an account
              </Link>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    error: state.error,
    loading: state.loading,
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (user: LoginRequest) => dispatch(setCurrentUserBegin(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
