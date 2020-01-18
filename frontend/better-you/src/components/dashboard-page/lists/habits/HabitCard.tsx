import React from "react";
import DateCheckbox from "./DateCheckbox";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Habit from "../../../../models/Habit";
import GeneralHabitViewPopupComponent from "./GeneralHabitViewPopupComponent";
import { connect } from "react-redux";
import AppState from "../../../../redux/store/store";
import { deleteHabitBegin } from "../../../../redux/actions/actions";

interface IProps {
  habit: Habit;
  deleteHabit: Function;
}

interface IState {
  habit: Habit;
  showHabitView: boolean;
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
    });
  };

  handleCloseHabit = () => {
    this.setState({
      habit: this.props.habit,
      showHabitView: false
    });
  };

  handleDeleteHabit = () => {
    this.props.deleteHabit(this.props.habit.id);
  };

  render() {
    return (
      <Card className="card-container-habit">
        <div
          className="category"
          style={{ backgroundColor: this.state.habit.category.color }}
        />

        <div className="MuiButtonBase-root MuiCardActionArea-root title_container">
          <div className="title" onClick={this.handleOpenHabit}>
            {this.props.habit.title}
          </div>

          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              className="delete_button"
              onClick={this.handleDeleteHabit}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <DateCheckbox typeRepetition={this.props.habit.repetitionType} />
        </div>
        <GeneralHabitViewPopupComponent
          selfDistructFunction={this.handleCloseHabit}
          open={this.state.showHabitView}
          habit={this.state.habit}
        />
      </Card>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteHabit: (id: number) => dispatch(deleteHabitBegin(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitCard);
