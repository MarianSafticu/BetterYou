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
import { addGoalBegin, deleteGoalBegin, editGoalBegin } from "../../../../redux/actions/actions";
import AddGoalRequest from "../../../../models/requests/AddGoalRequest";
import EditGoalRequest from "../../../../models/requests/EditGoalRequest";

interface IProps {
  onFinnishAction: Function;
  goal?: Goal;
  isDefaultGoal?: boolean;
  addGoal: Function;
  editGoal: Function;
  deleteGoal: Function;
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
    title: "",
    groupId: 0,
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

    var goal: Goal = {
      id: null,
      title: "",
      groupId: 0,
      description: "",
      currentProgress: 0,
      progressToReach: 1,
      startDate: new Date(),
      endDate: new Date(),
      category: goalCategorys[0],
      isPublic: false
    };

    var err: GoalException = {
      titleError: "",
      descriptionError: "",
      startDateError: "",
      endDateError: "",
      currentProgressError: "",
      progressToReachError: "",
      categoryError: ""
    };

    if (this.props.goal !== null && this.props.goal !== undefined) {
      if(this.props.goal.startDate.constructor.name === "String")
        this.props.goal.startDate = new Date(this.props.goal.startDate)
      if(this.props.goal.endDate.constructor.name === "String")
          this.props.goal.endDate = new Date(this.props.goal.endDate)

      this.initialGoal = {
        id: this.props.goal.id,
        groupId: this.props.goal.groupId,
        title: this.props.goal.title,
        description: this.props.goal.description,
        currentProgress: this.props.goal.currentProgress,
        progressToReach: this.props.goal.progressToReach,
        startDate: this.props.goal.startDate,
        endDate: this.props.goal.endDate,
        category: this.props.goal.category,
        isPublic: this.props.goal.isPublic
      };

      var isDefaultGoal: boolean = false;
      if (
        this.props.isDefaultGoal === null ||
        this.props.isDefaultGoal === undefined
      )
        isDefaultGoal = false;
      else isDefaultGoal = this.props.isDefaultGoal;

      this.state = {
        goal: this.props.goal,
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
    this.setState({
      goalError: err
    });

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

    if (redC.length == 1) redC = "0" + redC;
    if (greenC.length == 1) greenC = "0" + greenC;
    if (blueC.length == 1) blueC = "0" + blueC;

    var ret = "#" + redC + greenC + blueC;

    return ret;
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
    this.setState({
      goalError: error
    });

    this.setState({
      goal: goal
    });
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
    this.setState({
      goalError: error
    });

    this.setState({
      goal: goal
    });
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
    this.setState({
      goalError: error
    });
    this.setState({
      goal: goal
    });
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
    this.setState({
      goalError: error
    });

    this.setState({
      goal: goal
    });
  };
  onChangeCurentProgress = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      this.state.edditingIsDisabled ||
      this.state.isDefaultGoal ||
      isNaN(parseInt(event.target.value))
    ) {
      event.target.value = this.state.goal.currentProgress.toString();
      return;
    }
    const goal: Goal = this.state.goal;
    goal.currentProgress = parseInt(event.target.value);

    var err = this.service.validateGoal(goal).currentProgressError;
    var error = this.state.goalError;
    error.currentProgressError = err;
    this.setState({
      goalError: error
    });

    this.setState({
      goal: goal
    });
  };
  onChangeProgressToReach = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      this.state.edditingIsDisabled ||
      this.state.isDefaultGoal ||
      isNaN(parseInt(event.target.value))
    ) {
      event.target.value = this.state.goal.progressToReach.toString();
      return;
    }
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
    if(this.state.edditingIsDisabled) {
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
    }
    else {
      let goalRequest: EditGoalRequest = {
        userGoal: {
          id: this.state.goal.id!,
          endDate: this.getStringFromData(this.state.goal.endDate),
          public: this.state.goal.isPublic,
          currentProgress: this.state.goal.currentProgress
        }
      }
      this.props.editGoal(goalRequest);
      if (this.verifyGoal(this.state.goal)) this.props.onFinnishAction();
    }
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
    this.state.goal.title = this.initialGoal.title;
    this.state.goal.description = this.initialGoal.description;
    this.state.goal.category = this.initialGoal.category;
    this.state.goal.currentProgress = this.initialGoal.currentProgress;
    this.state.goal.endDate = this.initialGoal.endDate;
    this.state.goal.progressToReach = this.initialGoal.progressToReach;
    this.state.goal.startDate = this.initialGoal.startDate;
    this.state.goal.isPublic = this.initialGoal.isPublic;
    this.state.goal.groupId = this.initialGoal.groupId;
    this.props.onFinnishAction();
  };

  onClosePopoverDelete = () => {
    this.setState({
      showDelete: false,
      anchorEl: null
    });
  };

  onDeleteHandle = () => {
    this.props.deleteGoal(this.state.goal.id);
    this.onClosePopoverDelete();
    this.props.onFinnishAction();
  };

  render() {
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
            onChange={this.onChangeTitle}
            className="general-goal-input"
            defaultValue={this.state.goal.title}
            variant={
              this.state.isDefaultGoal
                ? "filled"
                : (this.state.textFieldVariant as any)
            }
            label="title"
            error={this.state.goalError.titleError.length != 0}
            helperText={this.state.goalError.titleError}
          ></TextField>
        </h1>
        <TextField
          onChange={this.onChangeDescription}
          className="general-goal-input"
          label="description"
          defaultValue={this.state.goal.description}
          rowsMax="10"
          multiline
          variant={
            this.state.isDefaultGoal
              ? "filled"
              : (this.state.textFieldVariant as any)
          }
          error={this.state.goalError.descriptionError.length != 0}
          helperText={this.state.goalError.descriptionError}
        ></TextField>
        <TextField
          onChange={this.onChangeDateStart}
          className="general-goal-input"
          label="starting date"
          type={this.state.edditingIsDisabled ? "" : "date"}
          InputLabelProps={{ shrink: true }}
          variant={this.state.textFieldVariant as any}
          defaultValue={
            this.state.edditingIsDisabled
              ? this.state.goal.startDate.toLocaleDateString()
              : this.getStringFromData(this.state.goal.startDate)
          }
          error={this.state.goalError.startDateError.length != 0}
          helperText={this.state.goalError.startDateError}
        ></TextField>
        <TextField
          onChange={this.onChangeDateEnd}
          className="general-goal-input"
          label="ending date"
          InputLabelProps={{ shrink: true }}
          type={this.state.edditingIsDisabled ? "" : "date"}
          variant={this.state.textFieldVariant as any}
          defaultValue={
            this.state.edditingIsDisabled
              ? this.state.goal.endDate.toLocaleDateString()
              : this.getStringFromData(this.state.goal.endDate)
          }
          error={this.state.goalError.endDateError.length != 0}
          helperText={this.state.goalError.endDateError}
        ></TextField>
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
            onChange={this.onChangeCurentProgress}
            className="general-goal-input"
            label="curent progress"
            type="number"
            variant={
              this.state.isDefaultGoal
                ? "filled"
                : (this.state.textFieldVariant as any)
            }
            InputLabelProps={{ shrink: true }}
            defaultValue={this.state.goal.currentProgress}
            error={this.state.goalError.currentProgressError.length != 0}
            helperText={this.state.goalError.currentProgressError}
          ></TextField>
        )}
        <TextField
          onChange={this.onChangeProgressToReach}
          className="general-goal-input"
          label="progress to reach"
          type="number"
          variant={
            this.state.isDefaultGoal
              ? "filled"
              : (this.state.textFieldVariant as any)
          }
          InputLabelProps={{ shrink: true }}
          defaultValue={this.state.goal.progressToReach}
          error={this.state.goalError.progressToReachError.length != 0}
          helperText={this.state.goalError.progressToReachError}
        ></TextField>

        {!this.state.edditingIsDisabled && !this.state.isDefaultGoal && (
          <FormControl
            variant={this.state.textFieldVariant as any}
            className="general-goal-input"
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
            onChange={this.onChangeCategory}
            className="general-goal-input"
            label="category"
            variant={
              this.state.isDefaultGoal
                ? "filled"
                : (this.state.textFieldVariant as any)
            }
            InputLabelProps={{ shrink: true }}
            defaultValue={this.state.goal.category.category}
            error={this.state.goalError.categoryError.length != 0}
            helperText={this.state.goalError.categoryError}
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
              onClick={() => {
                this.onCancelHandler();
              }}
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
    addGoal: (goal: AddGoalRequest) => dispatch(addGoalBegin(goal)),
    editGoal: (goal: EditGoalRequest) => dispatch(editGoalBegin(goal)),
    deleteGoal: (id: number) => dispatch(deleteGoalBegin(id))
  };
};

export default connect(null, mapDispatchToProps)(GeneralGoalViewItemComponent);
