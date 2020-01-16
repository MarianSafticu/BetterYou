import React, { Component } from "react";
import "../../assets/scss/start-page/StartPageStyle.scss";
import { Button } from "@material-ui/core";
import NewsfeedList from "../dashboard-page/lists/newsfeed/NewsfeedList";
import FriendsList from "../dashboard-page/lists/friends/FriendsList";
import GoalList from "../dashboard-page/lists/goals/GoalList";
import HabitList from "../dashboard-page/lists/habits/HabitList";
import MenuProfilePicture from "../dashboard-page/MenuProfilePicture";
import GeneralGoalViewPopupComponent from "../dashboard-page/lists/goals/GeneralGoalViewPopupComponent";
import Goal from "../../models/Goal";
import { goalCategorys } from "../../models/GoalCategorys";
import GeneralHabitViewPopupComponent from "../dashboard-page/lists/habits/GeneralHabitViewPopupComponent";

interface TestPageComponentProps {}

interface TestPageComponentState {
  showGoal: boolean[]
  showHabit: boolean[]
}

var defaultGoal: Goal ={
  id: 10,
  category: goalCategorys[2],
  currentProgress: 1,
  description: "descriere default",
  endDate: new Date(),
  progressToReach: 100,
  startDate: new Date(),
  title: "title default",
  isPublic: true
}

export default class TestPageComponent extends Component<
  TestPageComponentProps,
  TestPageComponentState
  > {
  constructor(props: TestPageComponentProps) {
    super(props);
    this.state = {
      showGoal: [],
      showHabit: []
    }
  }

  handleShowGoal = (index: number) => {
    const aux = this.state.showGoal.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    aux[index] = true;
    this.setState({
      showGoal: aux
    });
  }
  handleCloseGoal = () => {
    const aux = this.state.showGoal.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    this.setState({
      showGoal: aux
    });
  }

  handleShowHabit = (index: number) => {
    const aux = this.state.showHabit.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    aux[index] = true;
    this.setState({
      showHabit: aux
    });
  }
  handleCloseHabit = () => {
    const aux = this.state.showHabit.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    this.setState({
      showHabit: aux
    });
  }

  render() {
    return (
      <div>
        <div>
          <Button onClick={() => { this.handleShowGoal(0); }}>
            test add
          </Button>
          <GeneralGoalViewPopupComponent selfDistructFunction={this.handleCloseGoal} open={this.state.showGoal[0]} />
        </div>
        <div>
          <Button onClick={() => { this.handleShowGoal(1); }}>
            test default
          </Button>
          <GeneralGoalViewPopupComponent goal={defaultGoal} isDefaultGoal={true} selfDistructFunction={this.handleCloseGoal} open={this.state.showGoal[1]} />
        </div>
        <div>
          <Button onClick={() => { this.handleShowHabit(0); }}>
            Test add habit
          </Button>
          <GeneralHabitViewPopupComponent selfDistructFunction={this.handleCloseHabit} open={this.state.showHabit[0]} />
        </div>
          <FriendsList />
          <NewsfeedList />
        <GoalList />
        <div>
          <HabitList />
        </div>
        <div>
          <GoalList />
        </div>

        <MenuProfilePicture image={"https://scontent.fclj2-1.fna.fbcdn.net/v/t1.0-9/p960x960/65599347_2311883428903442_7016303985434820608_o.jpg?_nc_cat=104&_nc_ohc=9QKSRuuC0JIAQmAZfqU_L5Q2YSH2OvRoeW2h4wjL3neS-TF16WVPQQTOg&_nc_ht=scontent.fclj2-1.fna&oh=25407343b7baa23c5f5edf00b274d1fc&oe=5E42CD00"}/>
      </div>
    );
  }
}
