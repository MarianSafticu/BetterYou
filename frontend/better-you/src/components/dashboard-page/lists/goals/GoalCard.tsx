import React from "react";
import Card from "@material-ui/core/Card";
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
import { deleteGoalBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";

interface IProps {
  goal: Goal;
  isReadOnly?: boolean | null;
  markGoalAsComplete?: Function;
  deleteGoal: Function;
}

interface IState {
  goal: Goal;
  showGoalView: boolean;
  inputProgress: number;
}

class GoalCard extends React.Component<IProps, IState> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      goal: this.props.goal,
      showGoalView: false,
      inputProgress: 1,
    };
  }

  isReadOnly = (): boolean => {
    if (this.props.isReadOnly !== null && this.props.isReadOnly !== undefined && this.props.isReadOnly)
      return true;
    return false;
  }

  handleOpenGoal = () => {
    if (this.isReadOnly())
      return
    this.setState({
      goal: this.state.goal,
      showGoalView: true,
      inputProgress: this.state.inputProgress
    });
  };

  handleCloseGoal = () => {
    this.setState({
      goal: this.state.goal,
      showGoalView: false,
      inputProgress: this.state.inputProgress
    });
  };

  render() {
    return (
      <Card className="card-container">
        <div className="category"  style={{backgroundColor: this.state.goal.category.color}}/>
        <div className="title-container">
        <Typography variant="h5" className="title" onClick={this.handleOpenGoal}>
            {this.props.goal.title}
          </Typography>
          {
            !this.isReadOnly()
            &&
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete" 
                className="delete_button"
                onClick={() => this.props.deleteGoal(this.state.goal.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        </div>

        <div className="container">
          <GoalProgressBar
            currentProgress={this.state.goal.currentProgress}
            progressToReach={this.props.goal.progressToReach}
          />
          {
            !this.isReadOnly()
            &&
            <Tooltip
              title="Modify progress with the specified number"
              aria-label="add"
            >
              <TextField
                type="number"
                defaultValue="1"
                className="input_progress"
                onChange={(text: any) => {
                  this.setState({
                    inputProgress: Number(text.target.value)
                  });
                }}
              />
            </Tooltip>
          }
          {
            !this.isReadOnly()
            &&
            <Tooltip title="Modify" aria-label="add">
              <Fab color="inherit" className="add_button_progress">
                <Done onClick={e => { this.handleClick(); }} />
              </Fab>
            </Tooltip>
          }
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
    let goal = this.state.goal;
    goal.currentProgress = goal.currentProgress + this.state.inputProgress;
    if (goal.currentProgress < 0)
      goal.currentProgress = 0;
    else if (goal.currentProgress >= goal.progressToReach)
      goal.currentProgress = goal.progressToReach;
    this.setState({ goal: goal })
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteGoal: (id: number) => dispatch(deleteGoalBegin(id))
  }
}

export default connect(null, mapDispatchToProps)(GoalCard);
