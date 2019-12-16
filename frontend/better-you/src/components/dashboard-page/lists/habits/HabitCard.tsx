import React from "react";
import DateCheckbox from "./DateCheckbox"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Habit from "../../../../models/Habit";
import GeneralHabitViewPopupComponent from "./GeneralHabitViewPopupComponent";

interface IProps {
  habit: Habit,
}

interface IState {
  habit: Habit,
  showHabitView: boolean
}


class HabitCard extends React.Component<IProps, IState> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      habit: this.props.habit,
      showHabitView: false
    };
  }
  handleOpenHabit = () => {
    this.setState({
      habit: this.props.habit,
      showHabitView: true
    })
  }

  handleCloseHabit = () => {
    this.setState({
      habit: this.props.habit,
      showHabitView: false,
    });
  }
  render() {
    return (
      <Card className="card-container">
        <div className="category" />
        <CardActionArea className="title_container" onClick={this.handleOpenHabit}>
          <Typography variant="h5" className="title">
            {this.props.habit.title}
          </Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" className="delete_button">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActionArea>
        <div className="container">
          <DateCheckbox typeRepetition={this.props.habit.repetitionType} />
        </div>
        <GeneralHabitViewPopupComponent
            selfDistructFunction={this.handleCloseHabit}
            open={this.state.showHabitView}
            habit={this.state.habit} />
      </Card>
    );
  }
}

export default HabitCard;