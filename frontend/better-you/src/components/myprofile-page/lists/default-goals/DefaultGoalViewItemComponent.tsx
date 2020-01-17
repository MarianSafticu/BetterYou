import React, { Component, ChangeEvent } from "react";
import "../../../../assets/scss/dashboard-page/GeneralGoalViewStyle.scss";
import { Button, TextField, Fab, Popover, Select, FormControl, InputLabel } from "@material-ui/core";
import Goal from "../../../../models/Goal";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Close from "@material-ui/icons/Close";
import Service from "../../../../services/Service";
import { GoalException } from "../../../../exceptions/GoalException";
import { goalCategorys, GoalCategory } from "../../../../models/GoalCategorys";
import { connect } from "react-redux";
import { addGoalBegin } from "../../../../redux/actions/actions";
import AddGoalRequest from "../../../../models/requests/AddGoalRequest";


interface IProps {
  onFinnishAction: Function;
  goal: Goal;
  addGoal: Function;
}

interface IStatus {
  goal: Goal;
  goalError: GoalException;
  anchorEl: HTMLButtonElement | null;
}

class DefaultGoalViewItemComponent extends Component<
  IProps,
  IStatus
  > {
  service: Service;
  constructor(props: IProps) {
    super(props);
    this.service = Service.getInstance();

    var err: GoalException = {
      titleError: "",
      descriptionError: "",
      startDateError: "",
      endDateError: "",
      currentProgressError: "",
      progressToReachError: "",
      categoryError: ""
    };

    var initialGoal: Goal = {
      id: props.goal.id,
      title: props.goal.title,
      description: props.goal.description,
      currentProgress: 0,
      progressToReach: props.goal.progressToReach,
      startDate: new Date(),
      endDate: new Date(),
      isPublic: true,
      category: goalCategorys[goalCategorys.findIndex(c => c.category.toUpperCase() === props.goal.category.category)]
    };

    this.state = {
      goal: initialGoal,
      goalError: err,
      anchorEl: null,
    };
  }

  verifyGoal = (goal: Goal) => {
    var err = this.service.validateGoal(goal);
    this.setState({
      goalError: err
    });

    return Service.getInstance().ValidateValidationGoal(err);
  };

  getStringFromData = (data: Date) => {
    var str = data.toLocaleDateString();
    var strs = str.split("/", 3);

    if (strs.length < 3) {
      data = new Date();
      str = data.toLocaleDateString();
      strs = str.split("/", 3);
    }

    if (strs[0].length === 1) strs[0] = "0" + strs[0];
    if (strs[1].length === 1) strs[1] = "0" + strs[1];

    var strss: string = strs[2] + "-" + strs[0] + "-" + strs[1];
    return strss;
  };


  onChangeDateStart = (event: ChangeEvent<HTMLInputElement>) => {
    const goal: Goal = this.state.goal;
    goal.startDate = new Date(Date.parse(event.target.value) + 86400000);

    var err = this.service.validateGoal(goal).startDateError;
    var error = this.state.goalError;
    error.startDateError = err;
    this.setState({
      goalError: error
    });
    this.setState({
      goal: goal
    });
  };
  onChangeDateEnd = (event: ChangeEvent<HTMLInputElement>) => {
    const goal: Goal = this.state.goal;
    goal.endDate = new Date(Date.parse(event.target.value) + 86400000);

    var err = this.service.validateGoal(goal).endDateError;
    var error = this.state.goalError;
    error.endDateError = err;
    this.setState({
      goalError: error
    });

    this.setState({
      goal: goal
    });
  };

  onChangeProgressToReach = (event: ChangeEvent<HTMLInputElement>) => {
    const goal: Goal = this.state.goal;
    goal.progressToReach = parseInt(event.target.value);

    var err = this.service.validateGoal(goal).progressToReachError;
    var error = this.state.goalError;
    error.progressToReachError = err;
    this.setState({
      goalError: error
    });

    this.setState({
      goal: goal
    });
  };

  onSaveAdd = () => {
    let goal: AddGoalRequest = {
      public: this.state.goal.isPublic,
      endDate: this.getStringFromData(this.state.goal.endDate),
      goal: {
        title: this.state.goal.title,
        description: this.state.goal.description,
        progressToReach: this.state.goal.progressToReach,
        category: this.state.goal.category.category.toLocaleUpperCase()
      }
    }
    this.props.addGoal(goal);
    if (this.verifyGoal(this.state.goal)) this.props.onFinnishAction();
  };

  onCancelHandler = () => {
    this.props.onFinnishAction();
  };


  render() {
    return (
      <div className="general-goal-container">
        <div className="general-goal-button-container">
          <Fab
            className="general-goal-button"
            onClick={() => {
              this.onCancelHandler();
            }}
            size="small"
          >
            <Close />
          </Fab>
        </div>
        <h1>
          <TextField
            className="general-goal-input"
            inputProps={{
              readOnly: true
            }}
            defaultValue={this.state.goal.title}
            variant="filled"
            label="title"
          ></TextField>
        </h1>
        <br />
        <TextField
          className="general-goal-input"
          label="description"
          inputProps={{ readOnly: true }}
          defaultValue={this.state.goal.description}
          rowsMax="10"
          multiline
          variant="filled"
        ></TextField>
        <TextField
          onChange={this.onChangeDateStart}
          className="general-goal-input"
          label="starting date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          defaultValue={this.getStringFromData(this.state.goal.startDate)}
          error={this.state.goalError.startDateError.length !== 0}
          helperText={this.state.goalError.startDateError}
        ></TextField>
        <TextField
          onChange={this.onChangeDateEnd}
          className="general-goal-input"
          label="ending date"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="outlined"
          defaultValue={this.getStringFromData(this.state.goal.endDate)}
          error={this.state.goalError.endDateError.length !== 0}
          helperText={this.state.goalError.endDateError}
        ></TextField>
        <TextField
          className="general-goal-input"
          inputProps={{ readOnly: true }}
          label="curent progress"
          type="number"
          variant="filled"
          InputLabelProps={{ shrink: true }}
          defaultValue={this.state.goal.currentProgress}
        ></TextField>
        <TextField
          onChange={this.onChangeProgressToReach}
          className="general-goal-input"
          label="progress to reach"
          type="number"
          InputLabelProps={{ shrink: true }}
          defaultValue={this.state.goal.progressToReach}
          error={this.state.goalError.progressToReachError.length !== 0}
          helperText={this.state.goalError.progressToReachError}
        ></TextField>

        <TextField
          className="general-goal-input"
          label="category"
          inputProps={{ readOnly: true }}
          variant="filled"
          defaultValue={this.state.goal.category.category}
          style={{ backgroundColor: this.state.goal.category.color }}
        ></TextField>

        <br />
        <div className="general-goal-button-container">
          <Button
            size="small"
            className="general-goal-button"
            onClick={() => { this.onSaveAdd(); }}>
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addGoal: (goal: AddGoalRequest) => dispatch(addGoalBegin(goal))
  };
};

export default connect(null, mapDispatchToProps)(DefaultGoalViewItemComponent);