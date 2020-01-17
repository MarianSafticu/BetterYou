import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import "../../assets/scss/dashboard-page/GoalListStyle.scss";
import Goal from "../../models/Goal";
import DefaultGoalPopupComponent from "./DefaultGoalViewPopupComponent";

interface IProps {
  goal: Goal
}
interface IState {
  goal: Goal,
  showGoalView: boolean
}

class DefaultGoalCard extends React.Component<IProps, IState> {

  constructor(prop: IProps) {
    super(prop);
    this.state = {
      goal: this.props.goal,
      showGoalView: false
    };
  }


  handleOpenGoal = () => {
    this.setState({
      goal: this.state.goal,
      showGoalView: true
    });
  };

  handleCloseGoal = () => {
    this.setState({
      goal: this.state.goal,
      showGoalView: false
    });
  };

  render() {
    return (
      <Card className="card-container">
        <div className="category" />
        <CardActionArea
          className="title_container"
          onClick={this.handleOpenGoal}
        >
          <Typography variant="h5" className="title">
            {this.props.goal.title}
          </Typography>
        </CardActionArea>

        <div className="container">
          <DefaultGoalPopupComponent
            selfDistructFunction={this.handleCloseGoal}
            open={this.state.showGoalView}
            goal={this.state.goal}
          />
        </div>
      </Card>
    );
  }

}

export default DefaultGoalCard;
