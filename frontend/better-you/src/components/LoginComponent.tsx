import React, { Component, FormEvent, Props } from "react";
import "../assets/scss/LoginPageStyle.scss";
import { Button, TextField, Link } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { thisExpression } from "@babel/types";

function getCookie(name : string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    
    if (parts.length == 2) {
        var aux = parts.pop();
        if(aux != null)
            return aux.split(";").shift();
    }
    return "Nu exista acest token";
}

interface IProps {
}

interface IState {
  emailError?: string,
  isEmailError?: boolean,
  passwordError?: string,
  isPasswordError?: boolean
}

export default class LoginComponent extends Component<IProps, IState> {
    constructor(prop : IProps){
        super(prop);
        this.state = {
            emailError: "",
            isEmailError: false,
            passwordError: "",
            isPasswordError: false
        };
    }

    onChangeHandler = (props : TextFieldProps) => {
        let input = (document.getElementById("Email")  as HTMLInputElement).value;
        
        if(input.length !== 0 && input.split('@').length == 2) {
            this.setState({
                emailError: "",
                isEmailError: false
            });
        }
        else {
            this.setState({
                emailError: "This is not a valid email adress",
                isEmailError: true
            });
        }
    }
    handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    }
    handleOnClick = () => {
        let email = (document.getElementById("Email")  as HTMLInputElement).value;
        let password = (document.getElementById("Password")  as HTMLInputElement).value;


        
        if(email.length !== 0 && email.split('@').length == 2) {
            this.setState({
                emailError: "",
                isEmailError: false
            });
        }
        else {
            this.setState({
                emailError: "This is not a valid email adress",
                isEmailError: true
            });
        }
        if(password.length === 0){
            this.setState({
                passwordError: "The password can't be nothing",
                isPasswordError: true
            });
        }
        else{
            this.setState({
                passwordError: "",
                isPasswordError: false
            });
        }



        let token = 123123123;
        alert("S-a introdus emailul:" + email + " si parola:" + password + " with token:" + token);

        const date = new Date();
        // Set it expire in 1 min
        date.setTime(date.getTime() + (1 * 60 * 1000));
        document.cookie = "token="+token+"; expires="+date.toUTCString()+"; path=/";
    }
    render() {
    return (
        <div className="login-background">
            <form className="login-container" action="">
                <h1 className="login-input"> Login </h1>
                
                <TextField
                    id = "Email"
                    onChange={this.onChangeHandler}
                    className="login-input"
                    error={this.state.isEmailError}
                    helperText={this.state.emailError}
                    label="Email:"/>
                <br/>

                <TextField
                    id="Password"
                    className="login-input"
                    type="password"
                    error={this.state.isPasswordError}
                    helperText={this.state.passwordError}
                    label="Password:"/>
                <br/>

                <Button
                    className="login-button"
                    size="large"
                    color="primary"
                    onClick={this.handleOnClick}
                    >Login</Button>
                <div className="login-help">
                    Forgot your password?
                    <br/>
                    <Link href="/">
                        Then this may help you.
                    </Link>
                    <br/>

                    Forgot your email? I'm sorry to hear that.
                    <br/>
                    <Link href="https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg">
                        Here's a puppy to cheer you out.
                    </Link>
                </div>
            </form>
        </div>
        );
    }
 }