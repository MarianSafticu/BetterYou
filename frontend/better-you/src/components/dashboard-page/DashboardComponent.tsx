import React, { Component, RefObject } from "react";
import GoalList from "./lists/goals/GoalList";
import "../../assets/scss/dashboard-page/DashboardPageStyle.scss";
import HabitList from "./lists/habits/HabitList";
import NewsfeedList from "./lists/newsfeed/NewsfeedList";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppState from "../../redux/store/store";
import { connect } from "react-redux";
import { ListItem, Divider } from "@material-ui/core";

interface IProp {
  appBarSwipeableDrawer: RefObject<any> | null;
}

interface IState {
  checked: boolean;
  compToShow: number;
}

class DashboardComponent extends Component<IProp, IState> {
  comp1: RefObject<HTMLDivElement>;
  comp2: RefObject<HTMLDivElement>;
  thisDiv: RefObject<HTMLDivElement>;
  swithcButton: RefObject<HTMLDivElement>;
  compToShow: number;
  constructor(props: IProp) {
    super(props);

    this.compToShow = 1;
    this.state = {
      checked: false,
      compToShow: this.compToShow
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.comp1 = React.createRef();
    this.comp2 = React.createRef();
    this.thisDiv = React.createRef();
    this.swithcButton = React.createRef();
    this.updateDimensions();
  }

  componentDidMount() {
    // Additionally I could have just used an arrow function for the binding `this` to the component...
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();

    setInterval(() => {
      if (this.swithcButton.current != null) {
        if (this.props.appBarSwipeableDrawer == null || this.props.appBarSwipeableDrawer.current == null) {
          this.swithcButton.current.setAttribute("hidden", "true");
        }
        else {
          if (!(this.props.appBarSwipeableDrawer.current as HTMLElement).contains(this.swithcButton.current)) {
            this.swithcButton.current.removeAttribute("hidden");
            (this.props.appBarSwipeableDrawer.current as HTMLElement).appendChild(this.swithcButton.current);
            /*var nod = React.createElement("Divider");
            (this.props.appBarSwipeableDrawer.current as HTMLElement).appendChild(nod.ref?.valueOf as Node);*/
          }
        }
      }
    }, 100);
  }

  updateDimensions() {
    if (this.comp1.current == null)
      return;
    if (this.comp2.current == null)
      return;
    if (this.swithcButton.current == null)
      return;
    if (this.thisDiv.current == null)
      return;

    console.log(this.props.appBarSwipeableDrawer);
    console.log(this.swithcButton);

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

  render() {
    return (
      <div id="wrapper" ref={this.thisDiv}>
        <div
          role="button"
          className="div-link MuiListItem-root MuiListItem-gutters MuiListItem-button"
          onClick={this.onSwitchComponenTHandler}
          ref={this.swithcButton}>
          {
            this.state.compToShow % 2 !== 0
            &&
            <div>Goals and Habits</div>
          }
          {
            this.state.compToShow % 2 === 0
            &&
            <div>News</div>
          }
        </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);