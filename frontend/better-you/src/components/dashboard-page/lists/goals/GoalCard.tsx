import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Done from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Goal from "../../../../models/Goal";
import GeneralGoalViewPopupComponent from "../goals/GeneralGoalViewPopupComponent";

interface IProps {
  goal: Goal;
}
interface IState {
  goal: Goal;
  showGoalView: boolean;
  input_progress: number;
}

class GoalCard extends React.Component<IProps, IState> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      goal: this.props.goal,
      showGoalView: false,
      input_progress: 1
    };
  }

  handleOpneGoal = () => {
    this.setState({
      goal: this.state.goal,
      showGoalView: true,
      input_progress: this.state.input_progress
    });
  };

  handleCloseGoal = () => {
    this.setState({
      goal: this.state.goal,
      showGoalView: false,
      input_progress: this.state.input_progress
    });
  };

  render() {
    return (
      <Card className="card-container">
        <div className="category" />
        <CardActionArea
          className="title_container"
          onClick={this.handleOpneGoal}
        >
          <Typography variant="h5" className="title">
            {this.props.goal.title}
          </Typography>

          <Tooltip title="Delete">
            <IconButton aria-label="delete" className="delete_button">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActionArea>

        <div className="container">
          <GoalProgressBar
            currentProgress={this.state.goal.currentProgress}
            progressToReach={this.props.goal.progressToReach}
          />

          <Tooltip
            title="Modify progress with the specified number"
            aria-label="add"
          >
            <TextField
              type="number"
              defaultValue="+1"
              className="input_progress"
              onChange={(text: any) => {
                this.setState({
                  input_progress: Number(text.target.value)
                });
              }}
            />
          </Tooltip>

          <Tooltip title="Modify" aria-label="add">
            <Fab color="inherit" className="add_button_progress">
              <Done
                onClick={e => {
                  this.handleClick();
                }}
              />
            </Fab>
          </Tooltip>
          <GeneralGoalViewPopupComponent
            selfDistructFunction={this.handleCloseGoal}
            open={this.state.showGoalView}
            goal={this.state.goal}
          />
        </div>
      </Card>
    );
  }

  handleClick() {
    this.setState(state => {
      var newGoal = this.state.goal;

      if (state.goal.currentProgress + state.input_progress < 0) {
        newGoal.currentProgress = 0;
        return {
          goal: newGoal,
          input_progress: this.state.input_progress,
          showGoalView: this.state.showGoalView
        };
      }
      if (
        state.goal.currentProgress + state.input_progress <=
        this.props.goal.progressToReach
      ) {
        newGoal.currentProgress =
          state.goal.currentProgress + state.input_progress;
        return {
          goal: newGoal,
          input_progress: this.state.input_progress,
          showGoalView: this.state.showGoalView
        };
      } else {
        return {
          goal: {
            title: this.props.goal.title,
            description: this.props.goal.description,
            currentProgress: this.props.goal.progressToReach,
            category: newGoal.category,
            endDate: newGoal.endDate,
            progressToReach: newGoal.progressToReach,
            startDate: newGoal.startDate
          },
          input_progress: this.state.input_progress,
          showGoalView: this.state.showGoalView
        };
      }
    });
  }
}

export default GoalCard;