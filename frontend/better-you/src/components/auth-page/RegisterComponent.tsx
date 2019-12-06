import React, { Component, ChangeEvent } from "react";
import { Button, TextField } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { UserRegisterDTO } from "../../models/UserRegisterDTO";
import { RegisterException } from "../../exceptions/RegisterException";
import Service from "../../services/Service";

interface IProps {
  // loading: boolean;
  // error: string;
  // registeredUser: UserRegisterDTO | undefined;
  registerUser?: Function;
}

interface IState {
  user: UserRegisterDTO;
  error: RegisterException;
  willRedirect: boolean;
}

export default class RegisterComponent extends Component<IProps, IState> {
  service: Service;

  constructor(prop: IProps) {
    super(prop);
    this.service = Service.getInstance();
    this.state = {
      user: {
        username: "",
        profileName: "",
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

  // componentDidUpdate() {
  //   if (this.props.registeredUser) {
  //     if (this.service.validateRegisteredUser(this.props.registeredUser)) {
  //       if (this.props.cookies) {
  //         this.setState({
  //           willRedirect: true
  //         });
  //       }
  //     }
  //   }
  // }

  render() {
    return (
      <div className="login-background">
        <ToastContainer />
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

  onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: {
        username: event.target.value,
        profileName: this.state.user.profileName,
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
        profileName: event.target.value,
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
        profileName: this.state.user.profileName,
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
        profileName: this.state.user.profileName,
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
        profileName: this.state.user.profileName,
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
      // this.props.registerUser(this.state.user);
    }
  }
}
