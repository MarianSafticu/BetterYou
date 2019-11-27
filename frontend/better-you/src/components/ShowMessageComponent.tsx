import React, { Component } from "react";
import "../assets/scss/ShowMessageStyle.scss";

interface IProps {
    type: string
}

interface IState {
}

export class ShowMessageComponent extends Component<IProps, IState>{
    render(){
        let text:string = "";
        switch(this.props.type){
            case "recover-account":{
                text="An email was sent with the instructions for recovering your password."
                break;
                }
            case "confirm-account":{
                text="An email has been sent to the specified address. Please check your email and click on the provided link to recover your account."
                break;
            }
            default:{
                text="404 error. No ideea how did you got here"
                break;
            }
        }
        
        return(
            <div className="message-background">
                <div className="message-container">
                    <p className="message-module">
                        {text}
                    </p>
                </div>
            </div>
        );
    }
}