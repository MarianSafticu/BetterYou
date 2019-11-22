import React, { Component } from "react";
import "../assets/scss/StartPageStyle.scss";
import GoalCard from "./GoalCard";
import GoalList from "./GoalList";
import GoalProgressBar from "./GoalProgressBar";

interface TestPageComponentProps {}

interface TestPageComponentState {}

export default class TestPageComponent extends Component<
  TestPageComponentProps,
  TestPageComponentState
> {
  render() {
    return (
      <div>
        <GoalCard />
        <GoalList />
      </div>
    );
  }
}
