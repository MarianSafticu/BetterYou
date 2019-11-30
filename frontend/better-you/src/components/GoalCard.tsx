import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../assets/scss/GoalListStyle.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

interface IProps {
  goal: {
    title: string;
    description: string;
    currentProgress: number;
    progressToReach: number;
  };
}

interface IState {
  goal: {
    title: string;
    description: string;
    currentProgress: number;
  };
  input_progress: number;
}

class GoalCard extends React.Component<IProps, IState> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      goal: {
        title: prop.goal.title,
        description: prop.goal.description,
        currentProgress: prop.goal.currentProgress
      },
      input_progress: 1
    };
  }

  render() {
    return (
      <Card className="card-container">
        <div className="category" />

        <CardActionArea className="title_container">
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
              defaultValue="1"
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
              <AddIcon
                onClick={e => {
                  this.handleClick();
                }}
              />
            </Fab>
          </Tooltip>
        </div>
      </Card>
    );
  }

  handleClick() {
    this.setState(state => {
      if (
        state.goal.currentProgress + state.input_progress <=
        this.props.goal.progressToReach
      ) {
        return {
          goal: {
            title: this.props.goal.title,
            description: this.props.goal.description,
            currentProgress: state.goal.currentProgress + state.input_progress
          },
          input_progress: this.state.input_progress
        };
      } else {
        return {
          goal: {
            title: this.props.goal.title,
            description: this.props.goal.description,
            currentProgress: this.props.goal.progressToReach
          },
          input_progress: this.state.input_progress
        };
      }
    });
  }
}

export default GoalCard;
