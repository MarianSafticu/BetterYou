import React, { Component, ChangeEvent } from 'react'
import { User } from "../models/User";
import { Button, TextField } from "@material-ui/core";
// import DatePicker from 'react-date-picker';

interface IProps {
    registerUser?: Function;
}

interface IState {
    user: User;
    usernameError?: string;
    isUsernameError?: boolean;
    profileNameError?: string;
    isProfileNameError?: boolean;
    emailError?: string,
    isEmailError?: boolean,
    passwordError?: string,
    isPasswordError?: boolean,
    birthDateError?: string,
    isBirthDateError?: boolean;
}

export default class RegisterComponent extends Component<IProps, IState> {
    constructor(prop: IProps){
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
            usernameError: "",
            isUsernameError: false,
            profileNameError: "",
            isProfileNameError: false,
            emailError: "",
            isEmailError: false,
            passwordError: "",
            isPasswordError: false,
            birthDateError: "",
            isBirthDateError: false
        };
        console.log(this.state.user);
    }

    render(){
        return (
            <div className="login-background">
                <form className="login-container" action="">
                    <div className="login-input-container">

                        <TextField
                            className="login-input"
                            onChange={this.onChangeUsername.bind(this)}
                            error={this.state.isUsernameError}
                            helperText={this.state.usernameError}
                            label="Username:"
                        />
                        <br />

                        <TextField
                            className="login-input"
                            onChange={this.onChangeProfileName.bind(this)}
                            error={this.state.isProfileNameError}
                            helperText={this.state.profileNameError}
                            label="Profile name:"
                        />
                        <br />

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

                        <TextField
                            className="login-input"
                            onChange={this.onChangeBirthdate.bind(this)}
                            type="date"
                            error={this.state.isBirthDateError}
                            helperText={this.state.birthDateError}
                            label="Birthdate:"
                            InputLabelProps={{shrink: true}}                            
                        />
                        <br />

                    </div>

                    <div className="login-button-container">
                        <Button
                            className="login-button">
                            Register
                        </Button>
                    </div>

                    <div className="help-links">
                        <p>Already have an account? Sign in write now!</p>
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
                isVerified: this.state.user.isVerified,
                password: this.state.user.password,
                token: this.state.user.token
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
                isVerified: this.state.user.isVerified,
                password: this.state.user.password,
                token: this.state.user.token
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

    onChangeBirthdate(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            user: {
                username: this.state.user.username,
                profileName: this.state.user.profileName,
                birthDate: new Date(event.target.value),
                email: this.state.user.email,
                isVerified: this.state.user.isVerified,
                password: this.state.user.password,
                token: this.state.user.token
            }
        });
    }

}