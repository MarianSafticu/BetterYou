import React, { Component } from "react";
import "../../assets/scss/start-page/StartPageStyle.scss";
import DefaultGoals from "../profile-menu/DefaultGoals";

interface TestPageComponentProps {}

interface TestPageComponentState {
  showGoal: boolean[]
}


export default class TestPageComponent extends Component<
  TestPageComponentProps,
  TestPageComponentState
  > {

  render() {
    return (
      <div>
          <DefaultGoals/>
      </div>
    );
  }
}
