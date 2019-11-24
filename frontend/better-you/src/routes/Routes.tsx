import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { StartPageComponent } from "../components/StartPageComponent";
import LoginRegisterTabComponent from "../components/LoginRegisterTabComponent";
import AppsPageComponent from "../components/AppsPageComponent";
import AboutPageComponent from "../components/AboutPageComponent";
import { ShowMessageComponent } from "../components/ShowMessageComponent";
        
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={StartPageComponent} />
        <Route exact path="/apps" component={AppsPageComponent}/>
        <Route exact path="/about" component={AboutPageComponent}/>
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
        <Route exact path="/confirm-account" component={()=> <ShowMessageComponent type="confirm-account"/>}/>
        <Route exact path="/recover-account" component={()=> <ShowMessageComponent type="recover-account"/>}/>
      </Switch>
    );
  }
}