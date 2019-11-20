import React, { Component, ChangeEvent } from 'react'
import { User } from "../models/User";
import { Button, TextField } from "@material-ui/core";
import {RegisterErrorMessages, RegisterToastMessages} from "../messages/RegisterMessages";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { red } from '@material-ui/core/colors';

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
    }

    render(){
        return (
            <div className="login-background">
                <ToastContainer />
                <form className="login-container" action="">
                    <div className="login-input-container">

                        <TextField
                            error={this.state.usernameError ? true : false}
                            className="login-input"
                            onChange={this.onChangeUsername.bind(this)}
                            helperText={this.state.usernameError}
                            label="Username:"
                        />
                        <br />

                        <TextField
                            error={this.state.profileNameError ? true : false}
                            className="login-input"
                            onChange={this.onChangeProfileName.bind(this)}
                            helperText={this.state.profileNameError}
                            label="Profile name:"
                        />
                        <br />

                        <TextField
                            error={this.state.emailError ? true : false}
                            className="login-input"
                            onChange={this.onChangeEmail.bind(this)}
                            helperText={this.state.emailError}
                            label="Email:"
                        />
                        <br />

                        <TextField
                            error={this.state.passwordError ? true : false}
                            className="login-input"
                            onChange={this.onChangePassword.bind(this)}
                            type="password"
                            helperText={this.state.passwordError}
                            label="Password:"
                        />
                        <br />

                        <TextField
                            error={this.state.birthDateError ? true : false}
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
                            className="login-button"
                            onClick={this.handleOnClick.bind(this)}>
                            Register
                        </Button>
                    </div>

                    <div className="help-links">
                        <p>Already have an account?</p>
                        <Link to="/login" className="link">Sign in </Link>right now!
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

    
    handleOnClick = () => {
        if (this.validateForm()) {
            //form-ul e valid
        }
    };

    validateForm(): boolean {
        let isValid = true;

        if (!this.validateUsername()){
            isValid = false;
        }
        if (!this.validateProfilename()) {
            isValid = false;
        }
        if (!this.validateEmail()) {
            isValid = false;
        }
        if (!this.validatePassword()) {
            isValid = false;
        }
        if (!this.validateBirthdate()) {
            isValid = false;
        }

        return isValid;
    }

    validateUsername(): boolean{
        let isValid = true;
        let errors = RegisterErrorMessages;

        if (this.state.user.username === ""){
            isValid = false;
            this.setState({
                user: this.state.user,
                usernameError: errors.USERNAME_EMPTY_STRING
            });
        } 
        else if (!this.state.user.username.match(/(^[a-zA-Z]+$)|(^[a-zA-Z]+[0-9]+$)/)) {
            isValid = false;
            this.setState({
                user: this.state.user,
                usernameError: errors.OTHER_SYMBOLS
            });
        }
        else {
            this.setState({
                user: this.state.user,
                usernameError: errors.EMPTY_STRING
            })
        }
        return isValid;
    }

    validateProfilename(): boolean {
        let isValid = true;
        let errors = RegisterErrorMessages;

        if (this.state.user.profileName === ""){
            isValid = false;
            this.setState({
                user: this.state.user,
                profileNameError: errors.PROFILENAME_EMPTY_STRING
            });
        } 
        else if (!this.state.user.profileName.match(/(^[a-zA-Z]+$)|(^[a-zA-Z]+[0-9]+$)/)) {
            isValid = false;
            this.setState({
                user: this.state.user,
                profileNameError: errors.OTHER_SYMBOLS
            });
        }
        else {
            this.setState({
                user: this.state.user,
                profileNameError: errors.EMPTY_STRING
            })
        }
        return isValid;
    }

    validateEmail(): boolean {
        let isValid = true;
        let errors = RegisterErrorMessages;

        if (this.state.user.email === ""){
            isValid = false;
            this.setState({
                user: this.state.user,
                emailError: errors.EMAIL_EMPTY_STRING
            });
        } 
        else if (!this.state.user.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
            isValid = false;
            this.setState({
                user: this.state.user,
                emailError: errors.EMAIL_INVALID
            });
        }
        else {
            this.setState({
                user: this.state.user,
                emailError: errors.EMPTY_STRING
            })
        }
        return isValid;
    }

    validatePassword(): boolean {
        let isValid = true;
        let errors = RegisterErrorMessages;

        if (this.state.user.password === ""){
            isValid = false;
            this.setState({
                user: this.state.user,
                passwordError: errors.PASSWORD_EMPTY_STRING
            });
        } 
        else if (!this.state.user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)) {
            isValid = false;
            this.setState({
                user: this.state.user,
                passwordError: errors.PASSWORD_INVALID
            });
        }
        else {
            this.setState({
                user: this.state.user,
                passwordError: errors.EMPTY_STRING
            })
        }
        return isValid;
    }

    validateBirthdate(): boolean{
        let isValid = true;
        let errors = RegisterErrorMessages;

        let now = new Date();
        now.setDate(now.getDate() - 1);
        let yesterday = now.getDate();

        if (this.state.user.birthDate.toString() === ""){
            isValid = false;
            this.setState({
                user: this.state.user,
                birthDateError: errors.BIRTHDATE_EMPTY_STRING
            });
        } 
        else if (this.state.user.birthDate.getDate() > yesterday) {
            isValid = false;
            this.setState({
                user: this.state.user,
                birthDateError: errors.BIRTHDATE_INVALID
            });
        }
        else {
            this.setState({
                user: this.state.user,
                birthDateError: errors.EMPTY_STRING
            })
        }
        return isValid;
    }

}