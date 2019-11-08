import React, { Component, FormEvent, Props } from "react";
import "../assets/scss/LoginPageStyle.scss";
import { Button, TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";

export default function LoginComponent() /*extends Component*/ {
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

    const [emailError, setEmailError] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const [passwordError, setPasswoedlError] = React.useState('');
    const [isPasswordError, setIsPasswordError] = React.useState(false);
    
    

    const onChangeHandler = (props : TextFieldProps) => {
        let input = (document.getElementById("Email")  as HTMLInputElement).value;
        
        if(input.length !== 0 && input.split('@').length == 2) {
            setEmailError("");
            setIsError(false);
        }
        else {
            setEmailError("This is not a valid email adress");
            setIsError(true);
        }
    }
    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    }
    const handleOnClick = () => {
        let email = (document.getElementById("Email")  as HTMLInputElement).value;
        let password = (document.getElementById("Password")  as HTMLInputElement).value;


        
        if(email.length !== 0 && email.split('@').length == 2) {
            setEmailError("");
            setIsError(false);
        }
        else {
            setEmailError("This is not a valid email adress");
            setIsError(true);
        }
        if(password.length === 0){
            setPasswoedlError("The password can't be nothing")
            setIsPasswordError(true);
        }
        else{
            setPasswoedlError("")
            setIsPasswordError(false);
        }



        let token = 123123123;
        alert("S-a introdus emailul:" + email + " si parola:" + password + " with token:" + token);

        const date = new Date();
        // Set it expire in 1 min
        date.setTime(date.getTime() + (1 * 60 * 1000));
        document.cookie = "token="+token+"; expires="+date.toUTCString()+"; path=/";
    }
    //render() {
    return (
        <div className="login-background">
            <form className="login-container" action="">
                <h1 className="login-input">
                    Login
                    </h1>
                <h3 className="login-input">
                    token : {getCookie("token")}</h3>
                <TextField
                    id = "Email"
                    onChange={onChangeHandler}
                    className="login-input"
                    error={isError}
                    helperText={emailError}
                    label="Email:"/>
                <br/>

                <TextField
                    id="Password"
                    className="login-input"
                    type="password"
                    error={isPasswordError}
                    helperText={passwordError}
                    label="Password:"/>
                <br/>

                <Button
                    className="login-button"
                    size="large"
                    color="primary"
                    onClick={handleOnClick}
                    >Login</Button>
            </form>
        </div>
        );
    //}
 }