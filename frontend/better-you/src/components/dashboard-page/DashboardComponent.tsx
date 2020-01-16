import React, { Component, RefObject } from "react";
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
import { setAppBarItemsList } from "../../redux/actions/actions";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import AppBarItem from "../../models/AppBarItem";

let options_1: any[] = []
let options_2: any[] = []
let sort_type: Array<string> = ['none', 'ascending', 'descending'];
let sort_category_goals: Array<string> = ['Title', 'Start Date', 'Number of Points']
let sort_category_habits: Array<string> = ['Title', 'Start Date']
let filt_category: Array<string> = ['Category']

interface IProp {
  setAppBarItemsList: Function
}

interface IState {
  checked: boolean,
  openDialog: boolean,
  title: string,
  category: Array<string>,
  type: Array<string>,
  compToShow: number,
}

export class DashboardComponent extends Component<IProp, IState> {
  comp1: RefObject<HTMLDivElement>;
  comp2: RefObject<HTMLDivElement>;
  thisDiv: RefObject<HTMLDivElement>;
  compToShow: number;

  constructor(props: IProp) {
    super(props);

    this.compToShow = 1;
    this.state = {
      checked: false,
      openDialog: false,
      title: "",
      category: [],
      type: [],
      compToShow: this.compToShow
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.comp1 = React.createRef();
    this.comp2 = React.createRef();
    this.thisDiv = React.createRef();
    this.updateDimensions();
  }
  componentDidMount() {
    // Additionally I could have just used an arrow function for the binding `this` to the component...
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();

    this.props.setAppBarItemsList([{
      text: "Goals/News",
      link: "",
      func: this.onSwitchComponenTHandler
    }])
  }

  updateDimensions() {
    if (this.comp1.current == null)
      return;
    if (this.comp2.current == null)
      return;
    if (this.thisDiv.current == null)
      return;

    //this.compToChangeParent.current.removeAttribute("hidden");

    if (window.innerWidth < 770) {
      if (this.compToShow % 2 == 0) {
        this.comp1.current.removeAttribute("hidden");
        this.comp2.current.setAttribute("hidden", "true");
      }
      else {
        this.comp1.current.setAttribute("hidden", "true");
        this.comp2.current.removeAttribute("hidden");
      }
    }
    else {
      this.comp1.current.removeAttribute("hidden");
      this.comp2.current.removeAttribute("hidden");
    }
  }

  onSwitchComponenTHandler = (e: React.MouseEvent) => {
    this.compToShow = (this.compToShow + 1) % 2;
    this.updateDimensions();
    this.setState({ compToShow: this.compToShow });
  }

  toggleChecked = () => {
    this.setState({ checked: !this.state.checked })
  };

  handleClick = () => {
    this.setState({ openDialog: !this.state.openDialog })
  };

  handleClickFiltrate = () => {
    if (this.state.checked)
      this.setState({ openDialog: !this.state.openDialog, title: "Filtrate after : ", category: filt_category })
    else
      this.setState({ openDialog: !this.state.openDialog, title: "Filtrate after : ", category: filt_category })
  };

  handleClickSort = () => {
    if (this.state.checked)
      this.setState({ openDialog: !this.state.openDialog, title: "Sort after : ", category: sort_category_habits, type: sort_type })
    else
      this.setState({ openDialog: !this.state.openDialog, title: "Sort after : ", category: sort_category_goals, type: sort_type })
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
      <div id="wrapper" ref={this.thisDiv}>
        <div className="list_component" ref={this.comp1}>
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

        <div className="newsfeed" ref={this.comp2}>
            <NewsfeedList />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state: AppState) => ({
  appBarSwipeableDrawer: state.appBarSwipeableDrawer
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAppBarItemsList: (list: AppBarItem[]) => dispatch(setAppBarItemsList(list))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);