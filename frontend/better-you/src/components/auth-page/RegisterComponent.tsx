import React, { Component, ChangeEvent } from "react";
import { Button, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { RegisterException } from "../../exceptions/RegisterException";
import Service from "../../services/Service";
import RegisterRequest from "../../models/requests/RegisterRequest";
import AppState from "../../redux/store/store";
import { connect } from "react-redux";
import { registerUserBegin, unsetCurrentUser } from "../../redux/actions/actions";
import SnackbarComponent from "../messages/SnackbarComponent";

interface IProps {
  loading: boolean;
  error: string;
  registrationEmailSent: boolean;
  registerUser: Function;
  clearRegistrationData: Function;
}

interface IState {
  user: RegisterRequest;
  error: RegisterException;
  willRedirect: boolean;
}

class RegisterComponent extends Component<IProps, IState> {
  service: Service;

  constructor(prop: IProps) {
    super(prop);
    this.service = Service.getInstance();
    this.state = {
      user: {
        username: "",
        profile_name: "",
        email: "",
        password: "",
        birthDate: new Date()
      },
      error: {
        usernameError: "",
        profileNameError: "",
        emailError: "",
        passwordError: "",
        birthDateError: ""
      },
      willRedirect: false
    };
  }

  componentDidUpdate() {
    if (this.props.registrationEmailSent) {
      this.setState({
        willRedirect: true
      });
      this.props.clearRegistrationData();
    }
  }

  render() {
    if (this.state.willRedirect) {
      return <Redirect to="/confirm-account-message" />;
    } else {
      return (
        <div className="login-background">
          {this.props.error ? (
            <SnackbarComponent message={this.props.error} />
          ) : (
            <div />
          )}
          <form className="login-container" action="">
            <div className="login-input-container">
              <TextField
                error={this.state.error.usernameError ? true : false}
                className="login-input"
                onChange={this.onChangeUsername.bind(this)}
                helperText={this.state.error.usernameError}
                label="Username:"
              />
              <br />

              <TextField
                error={this.state.error.profileNameError ? true : false}
                className="login-input"
                onChange={this.onChangeProfileName.bind(this)}
                helperText={this.state.error.profileNameError}
                label="Profile name:"
              />
              <br />

              <TextField
                error={this.state.error.emailError ? true : false}
                className="login-input"
                onChange={this.onChangeEmail.bind(this)}
                helperText={this.state.error.emailError}
                label="Email:"
              />
              <br />

              <TextField
                error={this.state.error.passwordError ? true : false}
                className="login-input"
                onChange={this.onChangePassword.bind(this)}
                type="password"
                helperText={this.state.error.passwordError}
                label="Password:"
              />
              <br />

              <TextField
                error={this.state.error.birthDateError ? true : false}
                className="login-input"
                onChange={this.onChangeBirthdate.bind(this)}
                type="date"
                helperText={this.state.error.birthDateError}
                label="Birthdate:"
                InputLabelProps={{ shrink: true }}
              />
              <br />
            </div>

            <div className="login-button-container">
              <Button
                className="login-button"
                onClick={this.handleOnClick.bind(this)}
              >
                Register
              </Button>
            </div>

            <div className="help-links">
              <Link to="/login" className="help-link-register">
                Already have an account? Sign in right now!
              </Link>
            </div>
          </form>
        </div>
      );
    }
  }

  onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: event.target.value,
        profile_name: this.state.user.profile_name,
        birthDate: this.state.user.birthDate,
        email: this.state.user.email,
        password: this.state.user.password
      }
    });
  }

  onChangeProfileName(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: this.state.user.username,
        profile_name: event.target.value,
        birthDate: this.state.user.birthDate,
        email: this.state.user.email,
        password: this.state.user.password
      }
    });
  }

  onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: this.state.user.username,
        profile_name: this.state.user.profile_name,
        birthDate: this.state.user.birthDate,
        email: event.target.value,
        password: this.state.user.password
      }
    });
  }

  onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: this.state.user.username,
        profile_name: this.state.user.profile_name,
        birthDate: this.state.user.birthDate,
        email: this.state.user.email,
        password: event.target.value
      }
    });
  }

  onChangeBirthdate(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: this.state.user.username,
        profile_name: this.state.user.profile_name,
        birthDate: new Date(event.target.value),
        email: this.state.user.email,
        password: this.state.user.password
      }
    });
  }

  async handleOnClick() {
    let validationResult: RegisterException = this.service.validateRegisterUser(
      this.state.user
    );
    if (this.service.validateValidationResultRegister(validationResult)) {
      this.setState({
        error: validationResult
      });
    } else {
      let { password } = this.state.user;
      let encryptedPassword = this.service.encryptPassword(password);
      this.state.user.password = encryptedPassword;
      this.props.registerUser(this.state.user);
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    error: state.error,
    loading: state.loading,
    registrationEmailSent: state.registrationEmailSent
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerUser: (user: RegisterRequest) => dispatch(registerUserBegin(user)),
    clearRegistrationData: () => dispatch(unsetCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
