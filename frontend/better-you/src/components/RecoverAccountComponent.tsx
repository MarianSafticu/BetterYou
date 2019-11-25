import React, {Component, ChangeEvent} from 'react';
import "../assets/scss/StartPageStyle.scss";
import "../assets/scss/RecoverAccountStyle.scss";
import { TextField, Button } from "@material-ui/core";
import { RegisterErrorMessages } from "../messages/RegisterMessages";
import { Link } from "react-router-dom";

interface IProps {
    registerUser?: Function;
}

interface IState {
    email: string,
    isRestriction: boolean,
    emailError?: string;
}

export default class RecoverAccountComponent extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            email: "",
            isRestriction: false,
            emailError: ""
        }
    }

    render() {
        return (
            <div className="main-div">
               <div className="second-div">
                    <form className="form-module" action="">
                        <div>
                            Please enter your email address to recover your account:
                        </div>
                        <div className="login-input-container">
                            <TextField
                                error={this.state.emailError ? true : false}
                                className="recover-input-email"
                                onChange={this.onChangeEmail.bind(this)}
                                helperText={this.state.emailError}
                                label="Email:"
                            />
                            <br/><br/>
                        </div>
                            <div className="login-button-container">
                                <Button
                                    className="login-button"
                                    onClick={this.handleOnClick.bind(this)}
                                >
                                    {!this.state.isRestriction && <div>Check</div>}
                                    {this.state.isRestriction && <Link to="/recover-account-message" className="link">Send</Link>}
                                </Button>
                            </div>
                    </form>
                </div>
            </div>
        );
    }

    onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: event.target.value,
            isRestriction: this.state.isRestriction
        });
    }

    handleOnClick = () => {
        if (this.validateForm()) {
            this.setState({
                email: this.state.email,
                isRestriction: true
            });
        }
    };

    validateForm(): boolean {
        let isValid = true;
    
        if (!this.validateEmail()) {
          isValid = false;
        }

        return isValid;
    }

    validateEmail(): boolean {
        let isValid = true;
        let errors = RegisterErrorMessages;
    
        if (this.state.email === "") {
          isValid = false;
          this.setState({
            email: this.state.email,
            isRestriction: this.state.isRestriction,
            emailError: errors.EMAIL_EMPTY_STRING
          });
        } else if (
          !this.state.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
        ) {
          isValid = false;
          this.setState({
            email: this.state.email,
            isRestriction: this.state.isRestriction,
            emailError: errors.EMAIL_INVALID
          });
        } else {
          this.setState({
            email: this.state.email,
            isRestriction: this.state.isRestriction,
            emailError: errors.EMPTY_STRING
          });
        }
        return isValid;
    }
}