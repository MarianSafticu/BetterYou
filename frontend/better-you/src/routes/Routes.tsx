import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { StartPageComponent } from "../components/StartPageComponent";
import LoginRegisterTabComponent from "../components/LoginRegisterTabComponent";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={StartPageComponent} />
        <Route
          exact
          path="/login"
          component={() => <LoginRegisterTabComponent isRegister={false} />}
        />
        <Route
          exact
          path="/register"
          component={() => <LoginRegisterTabComponent isRegister={true} />}
        />
      </Switch>
    );
  }
}
