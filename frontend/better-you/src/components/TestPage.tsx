import React, { Component } from "react";
import "../assets/scss/StartPageStyle.scss";
import GoalList from "./GoalList";
import { Button } from "@material-ui/core";
import GeneralGoalViewPopupComponent from "./GeneralGoalViewPopupComponent";
import { Goal } from "../models/Goal";
import NewsfeedList from "./NewsfeedList";
import HabitList from "./HabitList";
import MenuProfilePicture from "./MenuProfilePicture";
interface TestPageComponentProps {}

interface TestPageComponentState {
  showGoal: boolean[]
}


export default class TestPageComponent extends Component<
  TestPageComponentProps,
  TestPageComponentState
  > {
  constructor(props: TestPageComponentProps) {
    super(props);
    this.state = {
      showGoal: []
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

  render() {
    return (
      <div>
        <div>
          <Button onClick={() => { this.handleShowGoal(0); }}>
            test add
          </Button>
          <GeneralGoalViewPopupComponent selfDistructFunction={this.handleCloseGoal} open={this.state.showGoal[0]} />
        </div>
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
