import React, { Component, ChangeEvent } from 'react'
import { User } from "../models/User";
import { Button, TextField } from "@material-ui/core";
<<<<<<< HEAD
=======
// import DatePicker from 'react-date-picker';
>>>>>>> 3ecb508ee893b5e2aa020102102bbe01dbac568d

interface IProps {
    registerUser?: Function;
}

interface IState {
    user: User;
    usernameError?: string;
    profileNameError?: string;
    emailError?: string,
    passwordError?: string,
    birthDateError?: string,
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
            profileNameError: "",
            emailError: "",
            passwordError: "",
            birthDateError: "",
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
                            helperText={this.state.usernameError}
                            label="Username:"
                        />
                        <br />

                        <TextField
                            className="login-input"
                            onChange={this.onChangeProfileName.bind(this)}
                            helperText={this.state.profileNameError}
                            label="Profile name:"
                        />
                        <br />

                        <TextField
                            className="login-input"
                            onChange={this.onChangeEmail.bind(this)}
                            helperText={this.state.emailError}
                            label="Email:"
                        />
                        <br />

                        <TextField
                            className="login-input"
                            onChange={this.onChangePassword.bind(this)}
                            type="password"
                            helperText={this.state.passwordError}
                            label="Password:"
                        />
                        <br />

                        <TextField
                            className="login-input"
                            onChange={this.onChangeBirthdate.bind(this)}
                            type="date"
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