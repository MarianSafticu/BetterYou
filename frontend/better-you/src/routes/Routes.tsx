import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { StartPageComponent } from "../components/StartPageComponent";
import LoginRegisterTabComponent  from "../components/LoginRegisterTabComponent";

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={LoginRegisterTabComponent}/>
            </Switch>
        );
    }
}