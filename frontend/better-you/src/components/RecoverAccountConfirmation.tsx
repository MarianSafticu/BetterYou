import React, { Component } from "react";
import "../assets/scss/StartPageStyle.scss";
import "../assets/scss/ConfirmationStyle.scss";

export default class RecoverAccountConfirmation extends Component{
    render() {
        return (
            <div className="start-page-container">
                <div className="confirmation-container">
                    An email has been sent to the specified address. 
                    Please check your email and click on the provided link to recover your account.
                </div>
            </div>
        );
    }
}
