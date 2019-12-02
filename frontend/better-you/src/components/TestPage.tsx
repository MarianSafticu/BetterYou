import React, { Component } from "react";
import "../assets/scss/StartPageStyle.scss";
import GoalList from "./GoalList";
import HabitList from "./HabitList";

interface TestPageComponentProps {}

interface TestPageComponentState {}

export default class TestPageComponent extends Component<
  TestPageComponentProps,
  TestPageComponentState
> {
  render() {
    return (
      <div>
        <div>
          <HabitList />
        </div>
        <div>
          <GoalList />
        </div>
      </div>
    );
  }
}
