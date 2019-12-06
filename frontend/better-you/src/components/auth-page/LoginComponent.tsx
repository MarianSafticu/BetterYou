import React, { Component, ChangeEvent } from "react";
import "../../assets/scss/auth-page/LoginPageStyle.scss";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import { setCurrentUserBegin } from "../../redux/actions/actions";
import { Link, Redirect } from "react-router-dom";
import Service from "../../services/Service";
import { LoginException } from "../../exceptions/LoginException";
import { UserLoginDTO } from "../../models/UserLoginDTO";
import SnackbarComponent from "../messages/SnackbarComponent";
import { withCookies, ReactCookieProps } from "react-cookie";

interface IProps {
  loading: boolean;
  error: string;
  loggedUser: UserLoginDTO | undefined;
  loginUser: Function;
}

interface IState {
  user: UserLoginDTO;
  error: LoginException;
  willRedirect: boolean;
}

class LoginComponent extends Component<IProps & ReactCookieProps, IState> {
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
      },
      willRedirect: false
    };
    console.log("in constructor ", this.props.cookies);
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
    if (this.service.validateValidationResult(validationResult)) {
      this.setState({
        error: validationResult
      });
    } else {
      this.props.loginUser(this.state.user);
    }
  }

  componentDidUpdate() {
    if (this.props.loggedUser) {
      if (this.service.validateLoggedUser(this.props.loggedUser)) {
        if (this.props.cookies) {
          this.props.cookies.set("token", this.props.loggedUser.token, {
            path: "/",
            httpOnly: true
          });
          this.setState({
            willRedirect: true
          });
        }
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
    loggedUser: state.currentUser
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (user: UserLoginDTO) => dispatch(setCurrentUserBegin(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(LoginComponent));
