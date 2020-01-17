import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import StartPageComponent from "../components/start-page/StartPageComponent";
import LoginRegisterTabComponent from "../components/auth-page/LoginRegisterTabComponent";
import AppsPageComponent from "../components/apps-page/AppsPageComponent";
import AboutPageComponent from "../components/about-page/AboutPageComponent";
import ShowMessageComponent from "../components/messages/ShowMessageComponent";
import TestPageComponent from "../components/test-pages/TestPage";
import RecoverAccountComponent from "../components/settings/RecoverAccountComponent";
import DashboardComponent from "../components/dashboard-page/DashboardComponent";
import LoggedOutRoute from "./custom/LoggedOutRoute";
import { MyProfileComponent } from "../components/myprofile-page/MyProfileComponent";
import TestDefault from "../components/test-pages/TestDefault";
import FriendPageComponent from "../components/myprofile-page/lists/friend/FriendPageComponent";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={StartPageComponent} />
        <Route exact path="/apps" component={AppsPageComponent} />
        <Route exact path="/about" component={AboutPageComponent} />
        <LoggedOutRoute
          exact
          path="/recover-account"
          component={<RecoverAccountComponent/>}
        />
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
        <LoggedOutRoute
          exact
          path="/confirm-account-message"
          component={<ShowMessageComponent type="confirm-account" />}
        />
        <LoggedOutRoute
          exact
          path="/recover-account-message"
          component={<ShowMessageComponent type="recover-account" />}
        />
        <Route exact path="/profile" component ={MyProfileComponent}/>
        <Route exact path="/dashboard" component={DashboardComponent} />
        <Route exact path="/test" component={TestPageComponent} />
        <Route exact path="/test-default" component={TestDefault} />
        <Route exact path="/u/:username" component={FriendPageComponent} />
      </Switch>
    );
  }
}