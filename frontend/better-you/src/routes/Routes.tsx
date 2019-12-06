import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { StartPageComponent } from "../components/start-page/StartPageComponent";
import LoginRegisterTabComponent from "../components/auth-page/LoginRegisterTabComponent";
import AppsPageComponent from "../components/apps-page/AppsPageComponent";
import AboutPageComponent from "../components/about-page/AboutPageComponent";
import { ShowMessageComponent } from "../components/messages/ShowMessageComponent";
import TestPageComponent from "../components/test-pages/TestPage";
import RecoverAccountComponent from "../components/settings/RecoverAccountComponent";
import DashboardComponent from "../components/dashboard-page/DashboardComponent";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={StartPageComponent} />
        <Route exact path="/apps" component={AppsPageComponent} />
        <Route exact path="/about" component={AboutPageComponent} />
        <Route exact path="/recover-account" component={RecoverAccountComponent}/>
        <Route exact path="/login" component={() => <LoginRegisterTabComponent isRegister={false}/>}/>
        <Route exact path="/register" component={() => <LoginRegisterTabComponent isRegister={true}/>}/>
        <Route exact path="/confirm-account-message" component={()=> <ShowMessageComponent type="confirm-account"/>}/>
        <Route exact path="/recover-account-message" component={()=> <ShowMessageComponent type="recover-account"/>}/>
        <Route exact path="/dashboard" component={DashboardComponent}/>
        <Route exact path="/test" component={TestPageComponent} />
      </Switch>
    );
  }
}
