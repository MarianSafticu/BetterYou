import React, { Component, FormEvent, Props, ChangeEvent } from "react";
import "../assets/scss/LoginPageStyle.scss";
import { Button, TextField, Link } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { connect } from "react-redux";
import AppState from "../redux/store/store";
import { User } from "../models/User";
import { setCurrentUser } from "../redux/actions/actions";

interface IProps {
    loginUser: Function;
}

interface IState {
    user: User,
    emailError?: string,
    isEmailError?: boolean,
    passwordError?: string,
    isPasswordError?: boolean
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
                username:  this.state.user.username,
                profileName: this.state.user.profileName,
                birthDate: this.state.user.birthDate,
                email: event.target.value,
                isVerified: this.state.user.isVerified,
                password: this.state.user.password,
                token: this.state.user.token
            }
        })
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
        })
    }

    handleOnClick = () => {
        this.props.loginUser(this.state.user);
    }

    render() {
        return (
            <div className="login-background">
                <form className="login-container" action="">
                    <TextField
                        id="Email"
                        onChange={this.onChangeEmail.bind(this)}
                        className="login-input"
                        error={this.state.isEmailError}
                        helperText={this.state.emailError}
                        label="Email:" />
                    <br />

                    <TextField
                        id="Password"
                        onChange={this.onChangePassword.bind(this)}
                        className="login-input"
                        type="password"
                        error={this.state.isPasswordError}
                        helperText={this.state.passwordError}
                        label="Password:" />
                    <br />

                    <Button
                        className="login-button"
                        size="large"
                        color="primary"
                        onClick={this.handleOnClick.bind(this)}
                    >Login</Button>
                    <div className="login-help">
                        Forgot your password?
                    <br />
                        <Link href="/">
                            Then this may help you.
                    </Link>
                        <br />

                        Forgot your email? I'm sorry to hear that.
                    <br />
                        <Link href="https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg">
                            Here's a puppy to cheer you up.
                    </Link>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (user: User) => dispatch(setCurrentUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);