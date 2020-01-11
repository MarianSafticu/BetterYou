import React, { Component } from "react";
import GoalList from "./lists/goals/GoalList";
import "../../assets/scss/dashboard-page/DashboardPageStyle.scss";
import HabitList from "./lists/habits/HabitList";
import NewsfeedList from "./lists/newsfeed/NewsfeedList";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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

let options_1: any[] = []
let options_2: any[] = []
let sort_type: Array<string> = ['none', 'ascending', 'descending'];
let sort_category_goals: Array<string> = ['Title', 'Start Date', 'Number of Points']
let sort_category_habits: Array<string> = ['Title', 'Start Date']
let filt_category: Array<string> = ['Category']

export default class DashboardComponent extends Component {
  state = {
    checked: false,
    openDialog: false,
    title: "",
    category: [],
    type: []
  };

  toggleChecked = () => {
    this.setState({ checked: !this.state.checked })
  };

  handleClick = () => {
    this.setState({ openDialog: !this.state.openDialog })
  };

  handleClickFiltrate = () => {
    if (this.state.checked)
      this.setState({ openDialog: !this.state.openDialog, sort_filt: "filt", title: "Filtrate after : ", category: filt_category })
    else
      this.setState({ openDialog: !this.state.openDialog, sort_filt: "filt", title: "Filtrate after : ", category: filt_category })
  };

  handleClickSort = () => {
    if (this.state.checked)
      this.setState({ openDialog: !this.state.openDialog, sort_filt: "sort", title: "Sort after : ", category: sort_category_habits, type: sort_type })
    else
      this.setState({ openDialog: !this.state.openDialog, sort_filt: "sort", title: "Sort after : ", category: sort_category_goals, type: sort_type })
  };

  populateOptions = () => {
    options_1 = [];
    for (var i = 0; i < this.state.category.length; i++) {
      options_1.push(<option value={this.state.category[i]}>{this.state.category[i]}</option>);
    }
    options_2 = [];
    if (this.state.category == filt_category) {
      for (var i = 0; i < goalCategorys.length; i++) {
        options_2.push(<option value={goalCategorys[i].category}>{goalCategorys[i].category}</option>);
      }
    }
    else {
      for (var i = 0; i < this.state.type.length; i++) {
        options_2.push(<option value={this.state.type[i]}>{this.state.type[i]}</option>);
      }
    }
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
                  <Switch id="switch"
                    checked={this.state.checked}
                    onChange={this.toggleChecked}
                    color="primary"
                    value="this.state.checked" />
                </Grid>
                <Grid item>Habits</Grid>
              </Grid>
            </div>
            <div id="filtrate_sort">
              <Button id="filtrate" onClick={this.handleClickFiltrate}>Filtrate</Button>
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
                    <FormControl id="formControl_1" >
                      <InputLabel htmlFor="demo-dialog-native">Category</InputLabel>
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
                      <InputLabel id="demo-dialog-select-label">Orded by</InputLabel>
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
            <AddCircleIcon id="icon_add" fontSize="large" />
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