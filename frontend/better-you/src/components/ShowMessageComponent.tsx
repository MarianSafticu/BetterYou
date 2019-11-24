import React, { Component } from "react";
import "../assets/scss/ShowMessageStyle.scss";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

interface IProps {
    type: string
}

interface IState {
}

export class ShowMessageComponent extends Component<IProps, IState>{
    constructor(prop: IProps){
        super(prop);
    }
    render(){
        let text:string = "";
        switch(this.props.type){
            case "recover-account":{
                text="An email was sent with the instructions for recovering your password."
                break;
                }
            case "confirm-account":{
                text="A confirmation email was send on your email adress"
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
                    {text}
                </div>
            </div>
        );
    }
}