import React, { Component, ChangeEvent } from "react";
import "../../../../assets/scss/dashboard-page/GeneralGoalViewStyle.scss";
import {
  Button,
  TextField,
  Fab,
  Popover,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import Goal from "../../../../models/Goal";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import Service from "../../../../services/Service";
import { GoalException } from "../../../../exceptions/GoalException";
import { goalCategorys } from "../../../../models/GoalCategorys";
import { connect } from "react-redux";
import { addGoalBegin } from "../../../../redux/actions/actions";
import AddGoalRequest from "../../../../models/requests/AddGoalRequest";

interface IProps {
  goal?: Goal;
  isDefaultGoal?: boolean;
  onFinnishAction: Function;
  addGoal: Function;
}

interface IState {
  goal: Goal;
  edditingIsDisabled: boolean;
  isForNewGoal: boolean;
  goalError: GoalException;
  textFieldVariant: "filled" | "outlined";
  showDelete: boolean;
  anchorEl: HTMLButtonElement | null;
  isDefaultGoal: boolean;
}

class GeneralGoalViewItemComponent extends Component<IProps, IState> {
  service: Service;
  initialGoal: Goal = {
    id: undefined,
    title: "",
    description: "",
    currentProgress: 0,
    progressToReach: 1,
    startDate: new Date(),
    endDate: new Date(),
    category: goalCategorys[0],
    isPublic: false
  };

  constructor(props: IProps) {
    super(props);
    this.service = Service.getInstance();

    let goal: Goal = {
      id: undefined,
      title: "",
      description: "",
      currentProgress: 0,
      progressToReach: 1,
      startDate: new Date(),
      endDate: new Date(),
      category: goalCategorys[0],
      isPublic: false
    };
    let err: GoalException = {
      titleError: "",
      descriptionError: "",
      startDateError: "",
      endDateError: "",
      currentProgressError: "",
      progressToReachError: "",
      categoryError: ""
    };

    if (props.goal !== null && props.goal !== undefined) {
      this.initialGoal = {
        id: props.goal.id,
        title: props.goal.title,
        description: props.goal.description,
        currentProgress: props.goal.currentProgress,
        progressToReach: props.goal.progressToReach,
        startDate: props.goal.startDate,
        endDate: props.goal.endDate,
        category: props.goal.category,
        isPublic: props.goal.isPublic
      };

      var isDefaultGoal: boolean = false;
      if (this.props.isDefaultGoal === null || this.props.isDefaultGoal === undefined)
        isDefaultGoal = false;
      else isDefaultGoal = this.props.isDefaultGoal;

      this.state = {
        goal: props.goal,
        edditingIsDisabled: !isDefaultGoal,
        isForNewGoal: isDefaultGoal,
        goalError: err,
        textFieldVariant: isDefaultGoal ? "outlined" : "filled",
        showDelete: false,
        anchorEl: null,
        isDefaultGoal: isDefaultGoal
      };
    } else {
      this.state = {
        goal: goal,
        edditingIsDisabled: false,
        isForNewGoal: true,
        goalError: err,
        textFieldVariant: "outlined",
        showDelete: false,
        anchorEl: null,
        isDefaultGoal: false
      };
    }
  }

  verifyGoal = (goal: Goal) => {
    var err = this.service.validateGoal(goal);
    this.setState({ goalError: err });
    return Service.getInstance().ValidateValidationGoal(err);
  };

  lighten = (color: String, procent: number) => {
    var red = parseInt(color[1] + color[2], 16);
    var green = parseInt(color[3] + color[4], 16);
    var blue = parseInt(color[5] + color[6], 16);

    var med = (red + green + blue) / 3;
    med = Math.floor(med + med * procent);

    red = Math.floor(red * (1 - procent) + med * procent);
    green = Math.floor(green * (1 - procent) + med * procent);
    blue = Math.floor(blue * (1 - procent) + med * procent);

    if (red > 255) red = 255;
    if (green > 255) green = 255;
    if (blue > 255) blue = 255;

    var redC = red.toString(16);
    var greenC = green.toString(16);
    var blueC = blue.toString(16);

    if (redC.length === 1) redC = "0" + redC;
    if (greenC.length === 1) greenC = "0" + greenC;
    if (blueC.length === 1) blueC = "0" + blueC;

    var ret = "#" + redC + greenC + blueC;

    return ret;
  };

  getStringFromData = (data: Date) => {
    var str = this.getStringFromData(data);
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

  onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled || this.state.isDefaultGoal) {
      event.target.value = this.state.goal.title;
      return;
    }
    const goal: Goal = this.state.goal;
    goal.title = event.target.value;

    var err = this.service.validateGoal(goal).titleError;
    var error = this.state.goalError;
    error.titleError = err;
    this.setState({ goalError: error });
    this.setState({ goal: goal });
  };

  onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled || this.state.isDefaultGoal) {
      event.target.value = this.state.goal.description;
      return;
    }
    const goal: Goal = this.state.goal;
    goal.description = event.target.value;

    var err = this.service.validateGoal(goal).descriptionError;
    var error = this.state.goalError;
    error.descriptionError = err;
    this.setState({ goalError: error });
    this.setState({ goal: goal });
  };

  onChangeDateStart = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled) {
      event.target.value = this.state.goal.startDate.toLocaleDateString();
      return;
    }
    const goal: Goal = this.state.goal;
    goal.startDate = new Date(Date.parse(event.target.value) + 86400000);

    var err = this.service.validateGoal(goal).startDateError;
    var error = this.state.goalError;
    error.startDateError = err;
    this.setState({ goalError: error });
    this.setState({ goal: goal });
  };

  onChangeDateEnd = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled) {
      event.target.value = this.state.goal.endDate.toLocaleDateString();
      return;
    }
    const goal: Goal = this.state.goal;
    goal.endDate = new Date(Date.parse(event.target.value) + 86400000);

    var err = this.service.validateGoal(goal).endDateError;
    var error = this.state.goalError;
    error.endDateError = err;
    this.setState({ goalError: error });
    this.setState({ goal: goal });
  };

  onChangeCurentProgress = (event: ChangeEvent<HTMLInputElement>) => {
    if ( this.state.edditingIsDisabled || this.state.isDefaultGoal || isNaN(parseInt(event.target.value))) {
      event.target.value = this.state.goal.currentProgress.toString();
      return;
    }
    const goal: Goal = this.state.goal;
    goal.currentProgress = parseInt(event.target.value);

    var err = this.service.validateGoal(goal).currentProgressError;
    var error = this.state.goalError;
    error.currentProgressError = err;
    this.setState({ goalError: error });
    this.setState({ goal: goal });
  };

  onChangeProgressToReach = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled || this.state.isDefaultGoal || isNaN(parseInt(event.target.value))) {
      event.target.value = this.state.goal.progressToReach.toString();
      return;
    }
    const goal: Goal = this.state.goal;
    goal.progressToReach = parseInt(event.target.value);

    var err = this.service.validateGoal(goal).progressToReachError;
    var error = this.state.goalError;
    error.progressToReachError = err;
    this.setState({ goalError: error});
    this.setState({ goal: goal });
  };

  onChangeCategory = (event: any) => {
    if (this.state.edditingIsDisabled || this.state.isDefaultGoal) {
      event.target.value = this.state.goal.category.category;
      return;
    }
    const goal: Goal = this.state.goal;
    var category = goalCategorys.find(
      category => category.category === event.target.value
    );
    if (category === undefined || category === null) return;
    goal.category = category;

    var err = this.service.validateGoal(goal).categoryError;
    var error = this.state.goalError;
    error.categoryError = err;
    this.setState({
      goalError: error,
      goal: goal
    });
  };
  onChangePublic = (event: any, checked: boolean) => {
    if (this.state.edditingIsDisabled || this.state.isDefaultGoal) {
      event.target.value = this.state.goal.category.category;
      return;
    }
    
    const goal: Goal = this.state.goal;
    goal.isPublic = checked
    this.setState({
      goal: goal
    })
  }

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

  onDeleteShowHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      showDelete: true,
      anchorEl: event.currentTarget
    });
  };

  onModifyHandler = () => {
    this.setState({
      goal: this.state.goal,
      edditingIsDisabled: !this.state.edditingIsDisabled,
      textFieldVariant: this.state.edditingIsDisabled ? "outlined" : "filled"
    });
  };

  onCancelHandler = () => {
    this.setState({
      goal: {
        title: this.initialGoal.title,
        description: this.initialGoal.description,
        category: this.initialGoal.category,
        currentProgress: this.initialGoal.currentProgress,
        endDate: this.initialGoal.endDate,
        progressToReach: this.initialGoal.progressToReach,
        startDate: this.initialGoal.startDate,
        isPublic: this.initialGoal.isPublic 
      }
    })
    this.props.onFinnishAction();
  };

  onClosePopoverDelete = () => {
    this.setState({
      showDelete: false,
      anchorEl: null
    });
  };

  onDeleteHandle = () => {
    console.log("I WANT TO DELETE THIS CRAP");
  };

  render() {
    console.log("GOAL", this.state.goal)
    return (
      <div className="general-goal-container">
        <div className="general-goal-button-container">
          {this.state.isForNewGoal === false && (
            <Fab
              className="general-goal-button"
              onClick={this.onDeleteShowHandler}
              size="small"
            >
              <Delete />
            </Fab>
          )}
          <Popover
            open={this.state.showDelete}
            onClose={this.onClosePopoverDelete}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            anchorEl={this.state.anchorEl}
          >
            <div style={{ padding: "15px" }}>
              <p style={{ textAlign: "center" }}>
                Are you sure you want to delete it?
              </p>
              <Button
                size="small"
                className="general-goal-button"
                onClick={this.onClosePopoverDelete}
              >
                Cancel
              </Button>
              <Button
                size="small"
                className="general-goal-button"
                onClick={this.onDeleteHandle}
              >
                Extra sure
              </Button>
            </div>
          </Popover>
          {this.state.isForNewGoal === false && (
            <Fab
              className="general-goal-button"
              onClick={this.onModifyHandler}
              size="small"
            >
              <Edit />
            </Fab>
          )}
          <Fab
            className="general-goal-button"
            onClick={() => { this.onCancelHandler(); }}
            size="small"
          >
            <Close />
          </Fab>
        </div>
        <TextField
          className="general-goal-input"
          label="title"
          onChange={this.onChangeTitle}
          defaultValue={this.state.goal.title}
          variant={this.state.isDefaultGoal ? "filled" : (this.state.textFieldVariant as any)}
          error={this.state.goalError.titleError.length !== 0}
          helperText={this.state.goalError.titleError}
        />
        <TextField
          className="general-goal-input"
          label="description"
          onChange={this.onChangeDescription}
          defaultValue={this.state.goal.description}
          variant={this.state.isDefaultGoal ? "filled" : (this.state.textFieldVariant as any)}
          error={this.state.goalError.descriptionError.length !== 0}
          helperText={this.state.goalError.descriptionError}
          rowsMax="10"
          multiline
        />
        <TextField
          className="general-goal-input"
          label="starting date"
          onChange={this.onChangeDateStart}
          defaultValue={this.state.edditingIsDisabled ? this.state.goal.startDate : this.getStringFromData(this.state.goal.startDate)}
          variant={this.state.textFieldVariant as any}
          error={this.state.goalError.startDateError.length !== 0}
          helperText={this.state.goalError.startDateError}
          type={this.state.edditingIsDisabled ? "" : "date"}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          className="general-goal-input"
          label="ending date"
          onChange={this.onChangeDateEnd}
          defaultValue={this.state.edditingIsDisabled ? this.state.goal.endDate : this.getStringFromData(this.state.goal.endDate)}
          variant={this.state.textFieldVariant as any}
          error={this.state.goalError.endDateError.length !== 0}
          helperText={this.state.goalError.endDateError}
          type={this.state.edditingIsDisabled ? "" : "date"}
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          className="general-goal-input"
          control={
            <Checkbox
              checked={this.state.goal.isPublic}
              onChange={(event, checked) => this.onChangePublic(event, checked)}
              value="checkedPublic"
            />
          }
          value={this.state.goal.isPublic}
          label="Public"
        />
        {(this.state.isForNewGoal === false || this.state.isDefaultGoal) && (
          <TextField
            className="general-goal-input"
            label="curent progress"
            onChange={this.onChangeCurentProgress}
            defaultValue={this.state.goal.currentProgress}
            variant={this.state.isDefaultGoal ? "filled" : (this.state.textFieldVariant as any)}
            error={this.state.goalError.currentProgressError.length !== 0}
            helperText={this.state.goalError.currentProgressError}
            type="number"
            InputLabelProps={{ shrink: true }}
          />
        )}
        <TextField
          className="general-goal-input"
          label="progress to reach"
          onChange={this.onChangeProgressToReach}
          defaultValue={this.state.goal.progressToReach}
          variant={this.state.isDefaultGoal ? "filled" : (this.state.textFieldVariant as any)}
          error={this.state.goalError.progressToReachError.length !== 0}
          helperText={this.state.goalError.progressToReachError}
          type="number"
          InputLabelProps={{ shrink: true }}
        />
        {!this.state.edditingIsDisabled && !this.state.isDefaultGoal && (
          <FormControl
            className="general-goal-input"
            variant={this.state.textFieldVariant as any}
          >
            <InputLabel
              ref={null}
              htmlFor="outlined-age-native-simple"
              style={{ backgroundColor: this.state.goal.category.color }}
            >
              category
            </InputLabel>
            <Select
              native
              value={this.state.goal.category.category}
              onChange={this.onChangeCategory}
              inputProps={{
                name: "string",
                id: "outlined-age-native-simple"
              }}
              labelWidth={65}
              style={{ backgroundColor: this.state.goal.category.color }}
            >
              {goalCategorys.map(category => (
                <option value={category.category}>{category.category}</option>
              ))}
            </Select>
          </FormControl>
        )}
        {(this.state.edditingIsDisabled || this.state.isDefaultGoal) && (
          <TextField
            className="general-goal-input"
            label="category"
            onChange={this.onChangeCategory}
            defaultValue={this.state.goal.category.category}
            variant={this.state.isDefaultGoal ? "filled" : (this.state.textFieldVariant as any)}
            error={this.state.goalError.categoryError.length !== 0}
            helperText={this.state.goalError.categoryError}
            InputLabelProps={{ shrink: true }}
            style={{ backgroundColor: this.state.goal.category.color }}
          ></TextField>
        )}
        <br />
        <div className="general-goal-button-container">
          {this.state.isForNewGoal === false && (
            <Button
              size="small"
              className="general-goal-button"
              disabled={this.state.edditingIsDisabled}
              onClick={() => { this.onCancelHandler(); }}
            >
              Cancel
            </Button>
          )}
          <Button
            size="small"
            className="general-goal-button"
            disabled={this.state.edditingIsDisabled}
            onClick={() => this.onSaveAdd()}
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

export default connect(null, mapDispatchToProps)(GeneralGoalViewItemComponent);
