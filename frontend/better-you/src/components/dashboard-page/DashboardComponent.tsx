import React, { Component } from "react";
import GoalList from "./lists/goals/GoalList";
import "../../assets/scss/dashboard-page/DashboardPageStyle.scss";
import HabitList from "./lists/habits/HabitList";
import NewsfeedList from "./lists/newsfeed/NewsfeedList";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { goalCategorys } from "../../models/GoalCategorys";
import GeneralGoalViewPopupComponent from "../dashboard-page/lists/goals/GeneralGoalViewPopupComponent";
import GeneralHabitViewPopupComponent from "../dashboard-page/lists/habits/GeneralHabitViewPopupComponent";

let options_1: any[] = [];
let options_2: any[] = [];
let sort_type: Array<string> = ["none", "ascending", "descending"];
let sort_category_goals: Array<string> = [
  "Title",
  "Start Date",
  "Number of Points"
];
let sort_category_habits: Array<string> = ["Title", "Start Date"];
let filt_category: Array<string> = ["Category"];

interface IState {
  showGoal: boolean[];
  showHabit: boolean[];
  checked: boolean;
  openDialog: boolean;
  title: string;
  category: string[];
  type: string[];
  sort_filt: string;
}

export default class DashboardComponent extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showGoal: [],
      showHabit: [],
      checked: false,
      openDialog: false,
      title: "",
      category: [],
      type: [],
      sort_filt: ""
    };
  }

  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  };

  handleClick = () => {
    this.setState({ openDialog: !this.state.openDialog });
  };

  handleClickFiltrate = () => {
    if (this.state.checked)
      this.setState({
        openDialog: !this.state.openDialog,
        sort_filt: "filt",
        title: "Filtrate after : ",
        category: filt_category
      });
    else
      this.setState({
        openDialog: !this.state.openDialog,
        sort_filt: "filt",
        title: "Filtrate after : ",
        category: filt_category
      });
  };

  handleClickSort = () => {
    if (this.state.checked)
      this.setState({
        openDialog: !this.state.openDialog,
        sort_filt: "sort",
        title: "Sort after : ",
        category: sort_category_habits,
        type: sort_type
      });
    else
      this.setState({
        openDialog: !this.state.openDialog,
        sort_filt: "sort",
        title: "Sort after : ",
        category: sort_category_goals,
        type: sort_type
      });
  };

  populateOptions = () => {
    options_1 = [];
    for (var i = 0; i < this.state.category.length; i++) {
      options_1.push(
        <option value={this.state.category[i]}>{this.state.category[i]}</option>
      );
    }
    options_2 = [];
    if (this.state.category == filt_category) {
      for (var i = 0; i < goalCategorys.length; i++) {
        options_2.push(
          <option value={goalCategorys[i].category}>
            {goalCategorys[i].category}
          </option>
        );
      }
    } else {
      for (var i = 0; i < this.state.type.length; i++) {
        options_2.push(
          <option value={this.state.type[i]}>{this.state.type[i]}</option>
        );
      }
    }
  };

  handleShowGoal = (index: number) => {
    const aux = this.state.showGoal.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    aux[index] = true;
    this.setState({
      showGoal: aux
    });
  };

  handleShowHabit = (index: number) => {
    const aux = this.state.showHabit.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    aux[index] = true;
    this.setState({
      showHabit: aux
    });
  };

  handleCloseGoal = () => {
    const aux = this.state.showGoal.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    this.setState({
      showGoal: aux
    });
  };

  handleCloseHabit = () => {
    const aux = this.state.showHabit.map(l => Object.assign({}, l));
    for (var i = 0; i < aux.length; i++) {
      aux[i] = false;
    }
    this.setState({
      showHabit: aux
    });
  };

  render() {
    return (
      <div id="wrapper">
        <div className="list_component">
          <div id="switch_add_bar">
            <div id="switch_label">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Goals</Grid>
                <Grid item>
                  <Switch
                    id="switch"
                    checked={this.state.checked}
                    onChange={this.toggleChecked}
                    color="primary"
                    value="this.state.checked"
                  />
                </Grid>
                <Grid item>Habits</Grid>
              </Grid>
            </div>
            <div id="filter_sort">
              <Button id="filter" onClick={this.handleClickFiltrate}>
                Filter
              </Button>
              <Button onClick={this.handleClickSort}>Sort</Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.state.openDialog}
                onClose={this.handleClick}
              >
                <DialogTitle>{this.state.title}</DialogTitle>
                <DialogContent>
                  <form id="form">
                    <FormControl id="formControl_1">
                      <InputLabel htmlFor="demo-dialog-native">
                        Category
                      </InputLabel>
                      <Select
                        className="select"
                        native
                        input={<Input id="demo-dialog-native" />}
                      >
                        <option value="" />
                        {this.populateOptions()}
                        {options_1}
                      </Select>
                    </FormControl>
                    <FormControl id="formControl_2">
                      <InputLabel id="demo-dialog-select-label">
                        Orded by
                      </InputLabel>
                      <Select
                        className="select"
                        native
                        input={<Input id="demo-dialog-select-label" />}
                      >
                        <option value="" />
                        {this.populateOptions()}
                        {options_2}
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClick}>Cancel</Button>
                  <Button onClick={this.handleClick}>Ok</Button>
                </DialogActions>
              </Dialog>
            </div>
            <div>
              {this.state.checked ? (
                <div>
                  <Button
                    onClick={() => {
                      this.handleShowHabit(0);
                    }}
                  >
                    <AddCircleIcon id="icon_add" fontSize="large" />
                  </Button>
                  <GeneralHabitViewPopupComponent
                    selfDistructFunction={this.handleCloseHabit}
                    open={this.state.showHabit[0]}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => {
                      this.handleShowGoal(0);
                    }}
                  >
                    <AddCircleIcon id="icon_add" fontSize="large" />
                  </Button>
                  <GeneralGoalViewPopupComponent
                    selfDistructFunction={this.handleCloseGoal}
                    open={this.state.showGoal[0]}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="list">
            {!this.state.checked && <GoalList />}
            {this.state.checked && <HabitList />}
          </div>
        </div>

        <div className="newsfeed">
          <NewsfeedList />
        </div>
      </div>
    );
  }
}
