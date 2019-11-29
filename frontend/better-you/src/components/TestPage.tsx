import React, { Component } from "react";
import "../assets/scss/StartPageStyle.scss";
import GoalCard from "./GoalCard";
import GoalList from "./GoalList";
import { Button } from "@material-ui/core";
import GeneralGoalViewPopupComponent from "./GeneralGoalViewPopupComponent";
import { Goal } from "../models/Goal";

interface TestPageComponentProps { }

interface TestPageComponentState {
  showGoal: boolean[]
}

export default class TestPageComponent extends Component<
  TestPageComponentProps,
  TestPageComponentState
  > {
    constructor(props: TestPageComponentProps){
      super(props);
      this.state={
        showGoal:[]
      }
    }

  handleShowGoal = (index:number) => {
    const aux = this.state.showGoal.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++){
      aux[i] = false;
    }
    aux[index] = true;
    this.setState({
      showGoal: aux
    });
  }
  handleCloseGoal = (index:number) => {
    const aux = this.state.showGoal.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++){
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
          <Button onClick={()=>{this.handleShowGoal(0)}}>
            test add
          </Button>
          <GeneralGoalViewPopupComponent selfDistructFunction={()=>{this.handleCloseGoal(0)}} open={this.state.showGoal[0]}/>
        </div>
        <GoalList />
      </div>
    );
  }
}
