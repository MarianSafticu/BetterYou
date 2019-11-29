import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../assets/scss/GoalListStyle.scss";
import { Goal } from "../models/Goal";
import GeneralGoalViewPopupComponent from "./GeneralGoalViewPopupComponent";

interface IProps {
  goal: Goal,
}
interface IState {
  goal: Goal,
  showGoalView: boolean
}

class GoalCard extends React.Component<IProps, IState> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      goal: this.props.goal,
      showGoalView: false
    };
  }

  handleOpneGoal = () => {
    this.setState({
      goal:this.state.goal,
      showGoalView: true
    })
  }

  handleCloseGoal = () => {
    this.setState({
      goal:this.state.goal,
      showGoalView: false
    })
  }

  render() {
    return (
      <Card className="card">
        <div className="category" />
        <CardActionArea onClick={this.handleOpneGoal}>
          <Typography variant="h5" className="title">
            {this.props.goal.title}
            </Typography>
        </CardActionArea>
        <GoalProgressBar
          progress={this.props.goal.currentProgress}
          step={1}
        />
        <GeneralGoalViewPopupComponent
          selfDistructFunction={this.handleCloseGoal}
          open={this.state.showGoalView}
          goal={this.state.goal}/>
      </Card>
    );
  }
}

export default GoalCard;
