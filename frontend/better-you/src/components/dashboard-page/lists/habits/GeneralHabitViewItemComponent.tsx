import React, { Component, ChangeEvent } from "react";
import "../../../../assets/scss/dashboard-page/GeneralGoalViewStyle.scss";
import { Button, TextField, Fab, Popover, Select, FormControl, InputLabel, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import Habit from "../../../../models/Habit";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import Service from "../../../../services/Service";
import { HabitException } from "../../../../exceptions/HabitException";
import { goalCategorys } from "../../../../models/GoalCategorys";
import { Repetition } from "../../../../models/Repetition";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddHabitRequest from "../../../../models/requests/AddHabitRequest";
import { addHabitBegin, deleteHabitBegin, editHabitBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import EditHabitRequest from "../../../../models/requests/EditHabitRequest";

interface IProps {
  onFinnishAction: Function;
  habit?: Habit;
  isDefaultHabit?: boolean;
  addHabit: Function;
  editHabit: Function;
  deleteHabit: Function;
}

interface IState {
  habit: Habit;
  edditingIsDisabled: boolean;
  isForNewHabit: boolean;
  habitError: HabitException;
  textFieldVariant: "filled" | "outlined";
  showDelete: boolean;
  anchorEl: HTMLButtonElement | null;
  isDefaultHabit: boolean,
  selectedRepetition: string
}

class GeneralHabitViewItemComponent extends Component<IProps, IState> {
  service: Service;
  initialDates: Date[] = [];
  initialHabit: Habit = {
    title: "",
    description: "",
    repetitionType: Repetition.Daily,
    startDate: new Date(),
    category: goalCategorys[0],
    dates: this.initialDates
  };

  constructor(props: IProps) {
    super(props);
    this.service = Service.getInstance();

    var habit: Habit = {
      title: "",
      description: "",
      repetitionType: Repetition.Daily,
      startDate: new Date(),
      category: goalCategorys[0],
      dates: this.initialDates
    };

    var err: HabitException = {
      titleError: "",
      descriptionError: "",
      startDateError: "",
      categoryError: ""
    };

    if (props.habit !== null && props.habit !== undefined) {
      this.initialHabit = {
        title: props.habit.title,
        description: props.habit.description,
        repetitionType: props.habit.repetitionType,
        startDate: props.habit.startDate,
        category: props.habit.category,
        dates: props.habit.dates
      };

      var isDefaultHabit:boolean = false;
      if(this.props.isDefaultHabit === null || this.props.isDefaultHabit === undefined)
        isDefaultHabit = false;
      else isDefaultHabit = this.props.isDefaultHabit;

      this.state = {
        habit: props.habit,
        edditingIsDisabled: !isDefaultHabit,
        isForNewHabit: isDefaultHabit,
        // onSaveHandle: this.onSaveChanges,
        habitError: err,
        textFieldVariant: isDefaultHabit?"outlined":"filled",
        showDelete: false,
        anchorEl: null,
        isDefaultHabit: isDefaultHabit,
        selectedRepetition: props.habit.repetitionType
      };
    } else {
      this.state = {
        habit: habit,
        edditingIsDisabled: false,
        isForNewHabit: true,
        // onSaveHandle: this.onSaveAdd,
        habitError: err,
        textFieldVariant: "outlined",
        showDelete: false,
        anchorEl: null,
        isDefaultHabit: false,
        selectedRepetition: "Daily"
      };
    }
  }

  verifyHabit = (habit: Habit) => {
    var err = this.service.validateHabit(habit);
    this.setState({
      habitError: err
    });
  
    return Service.getInstance().ValidateValidationHabit(err);
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

    if (red > 255)
      red = 255;
    if (green > 255)
      green = 255;
    if (blue > 255)
      blue = 255;


    var redC = red.toString(16);
    var greenC = green.toString(16);
    var blueC = blue.toString(16);

    if (redC.length == 1)
      redC = "0" + redC;
    if (greenC.length == 1)
      greenC = "0" + greenC;
    if (blueC.length == 1)
      blueC = "0" + blueC;

    var ret = "#" + redC + greenC + blueC;

    return ret;
  }

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
    if (this.state.edditingIsDisabled || this.state.isDefaultHabit) {
      event.target.value = this.state.habit.title;
      return;
    }
    const habit: Habit = this.state.habit;
    habit.title = event.target.value;

    var err = this.service.validateHabit(habit).titleError;
    var error = this.state.habitError;
    error.titleError = err;
    this.setState({
      habitError: error
    });

    this.setState({
      habit: habit
    });
  };

  onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled || this.state.isDefaultHabit) {
      event.target.value = this.state.habit.description;
      return;
    }
    const habit: Habit = this.state.habit;
    habit.description = event.target.value;

    var err = this.service.validateHabit(habit).descriptionError;
    var error = this.state.habitError;
    error.descriptionError = err;
    this.setState({
      habitError: error
    });

    this.setState({
      habit: habit
    });
  };

  onChangeDateStart = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled) {
      event.target.value = this.state.habit.startDate.toLocaleDateString();
      return;
    }
    const habit: Habit = this.state.habit;
    habit.startDate = new Date(Date.parse(event.target.value) + 86400000);

    var err = this.service.validateHabit(habit).startDateError;
    var error = this.state.habitError;
    error.startDateError = err;
    this.setState({
      habitError: error
    });
    this.setState({
      habit: habit
    });
  };

  onChangeCategory = (event: any) => {
    if (this.state.edditingIsDisabled || this.state.isDefaultHabit) {
      event.target.value = this.state.habit.category.category;
      return;
    }
    const habit: Habit = this.state.habit;
    var category = goalCategorys.find((category) => category.category === event.target.value);
    if (category === undefined || category === null)
      return;
    habit.category = category;

    var err = this.service.validateHabit(habit).categoryError;
    var error = this.state.habitError;
    error.categoryError = err;

    this.setState({
      habitError: error,
      habit: habit
    });
  };

  onChangeRepetitionType = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.edditingIsDisabled) {
        event.target.value = this.state.habit.repetitionType.toString();
        return;
    }
    const habit: Habit = this.state.habit;
    if(event.target.value == "Daily")
        habit.repetitionType = Repetition.Daily;
    else
        habit.repetitionType = Repetition.Weekly;
    this.setState({
        habit: habit,
        selectedRepetition: event.target.value
    });
  }
  onChangeDateCalendar: any;

  onSaveAdd = () => {
    if(this.state.edditingIsDisabled) {
      let habitReq: AddHabitRequest = {
        habit: {
          title: this.state.habit.title,
          description: this.state.habit.description,
          startDate: this.getStringFromData(this.state.habit.startDate),
          repetitionType: this.state.habit.repetitionType.toUpperCase(),
          category: this.state.habit.category.category.toUpperCase(),
          bestStreak: 0,
          currentStreak: 0,
          dates: []  
        }
      }
      this.props.addHabit(habitReq);
      if (this.verifyHabit(this.state.habit)) this.props.onFinnishAction();
    }
    else {
      let habitRequest: EditHabitRequest = {
        habit: {
          id: this.state.habit.id,
          title: this.state.habit.title,
          description: this.state.habit.description,
          startDate: this.getStringFromData(this.state.habit.startDate),
          repetitionType: this.state.habit.repetitionType.toString().toUpperCase(),
          category: this.state.habit.category.category.toString().toUpperCase(),
          bestStreak: 0,
          currentStreak: 0,
          dates: this.state.habit.dates.map(date => this.getStringFromData(date))
        }
      }
      this.props.editHabit(habitRequest);
      if (this.verifyHabit(this.state.habit)) this.props.onFinnishAction();
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
      habit: this.state.habit,
      edditingIsDisabled: !this.state.edditingIsDisabled,
      textFieldVariant: this.state.edditingIsDisabled ? "outlined" : "filled"
    });
  };
  onCancelHandler = () => {
    this.state.habit.title = this.initialHabit.title;
    this.state.habit.description = this.initialHabit.description;
    this.state.habit.repetitionType = this.initialHabit.repetitionType;
    this.state.habit.startDate = this.initialHabit.startDate;
    this.state.habit.category = this.initialHabit.category;
    this.state.habit.dates = this.initialHabit.dates;
    this.props.onFinnishAction();
  };
  onClosePopoverDelete = () => {
    this.setState({
      showDelete: false,
      anchorEl: null
    });
  };
  onDeleteHandle = () => {
    this.props.deleteHabit(this.state.habit.id);
    this.onClosePopoverDelete();
    this.props.onFinnishAction();
  };

  render() {
    return (
      <div className="general-goal-container">
        <div className="general-goal-button-container">
          {this.state.isForNewHabit === false && (
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
          {this.state.isForNewHabit === false && (
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
            defaultValue={this.state.habit.title}
            variant={this.state.isDefaultHabit?"filled":this.state.textFieldVariant as any}
            label="title"
            error={this.state.habitError.titleError.length != 0}
            helperText={this.state.habitError.titleError}
          ></TextField>
        </h1>
        <br />
        <TextField
          onChange={this.onChangeDescription}
          className="general-goal-input"
          label="description"
          defaultValue={this.state.habit.description}
          rowsMax="10"
          multiline
          variant={this.state.isDefaultHabit?"filled":this.state.textFieldVariant as any}
          error={this.state.habitError.descriptionError.length != 0}
          helperText={this.state.habitError.descriptionError}
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
              ? this.state.habit.startDate.toLocaleDateString()
              : this.getStringFromData(this.state.habit.startDate)
          }
          error={this.state.habitError.startDateError.length != 0}
          helperText={this.state.habitError.startDateError}
        ></TextField>


        {
          !this.state.edditingIsDisabled && !this.state.isDefaultHabit
          &&
          <FormControl
            variant={this.state.textFieldVariant as any}
            className="general-goal-input">
            <InputLabel ref={null} htmlFor="outlined-age-native-simple"
              style={{ backgroundColor: this.state.habit.category.color }}>
              category
            </InputLabel>
            <Select
              native
              value={this.state.habit.category.category}
              onChange={this.onChangeCategory}
              inputProps={{
                name: 'string',
                id: 'outlined-age-native-simple',
              }}
              labelWidth={65}
              style={{ backgroundColor: this.state.habit.category.color }}
            >
              {goalCategorys.map((category) => <option value={category.category}>{category.category}</option>)}

            </Select>
          </FormControl>
        }
        {
          (this.state.edditingIsDisabled || this.state.isDefaultHabit)
          &&
          <TextField
            onChange={this.onChangeCategory}
            className="general-goal-input"
            label="category"
            variant={this.state.isDefaultHabit?"filled":this.state.textFieldVariant as any}
            InputLabelProps={{ shrink: true }}
            defaultValue={this.state.habit.category.category}
            error={this.state.habitError.categoryError.length != 0}
            helperText={this.state.habitError.categoryError}
            style={{ backgroundColor: this.state.habit.category.color }}
          ></TextField>
        }
        {
          !this.state.edditingIsDisabled && !this.state.isDefaultHabit
          &&
          <FormControl component="fieldset" className="general-goal-input">
            <FormLabel component="legend">repetition type</FormLabel>
            <RadioGroup aria-label="type" name="type" value={this.state.selectedRepetition} onChange={this.onChangeRepetitionType}>
                <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
                <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
            </RadioGroup>
          </FormControl>
        }
        {
          (this.state.edditingIsDisabled || this.state.isDefaultHabit)
          &&
          <TextField
          className="general-goal-input"
          defaultValue={this.state.habit.repetitionType}
          variant={this.state.isDefaultHabit?"filled":this.state.textFieldVariant as any}
          label="repetition type"
          ></TextField>
        }
        {
          (this.state.edditingIsDisabled || this.state.isDefaultHabit)
          &&
          <DatePicker className="general-goal-input" 
          selected={null} 
          onChange={() => this.onChangeDateCalendar}
          highlightDates={this.state.habit.dates}
          placeholderText="   Calendar"
          />                
        }
        <br />
        <div className="general-goal-button-container">
          {this.state.isForNewHabit === false && (
            <Button
              size="small"
              className="general-goal-button"
              disabled={this.state.edditingIsDisabled}
              onClick={() => { this.onCancelHandler(); }}>
              Cancel
            </Button>
          )}
          <Button
            size="small"
            className="general-goal-button"
            disabled={this.state.edditingIsDisabled}
            onClick={() => { this.onSaveAdd(); }}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addHabit: (habit: AddHabitRequest) => dispatch(addHabitBegin(habit)),
    editHabit: (habit: EditHabitRequest) => dispatch(editHabitBegin(habit)),
    deleteHabit: (id: number) => dispatch(deleteHabitBegin(id))
  };
};

export default connect(null, mapDispatchToProps)(GeneralHabitViewItemComponent);
