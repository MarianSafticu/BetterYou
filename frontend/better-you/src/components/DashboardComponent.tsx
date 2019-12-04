import React, { Component } from "react";
import GoalList from "./GoalList";
import "../assets/scss/DashboardPageStyle.scss";
import HabitList from "./HabitList";
import NewsfeedList from "./NewsfeedList";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default class DashboardComponent extends Component {
  state = {
    checked: false
  };

  toggleChecked = () => {
    this.setState({checked : !this.state.checked})
  };

  render() {
    return (
        <div id="wrapper">
            <div className="list">
              <div id="switch_add_bar">
                <div id="switch_label">
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid item>Goals</Grid>
                        <Grid item>
                          <Switch id="switch"
                            checked={this.state.checked}
                            onChange={this.toggleChecked}
                            color = "primary"
                            value="this.state.checked"/>
                        </Grid>
                      <Grid item>Habits</Grid>
                    </Grid>
                  </div>
                
                <AddCircleIcon id="icon_add" fontSize="large"/>
              </div>
                
              { !this.state.checked && <GoalList/> }
              {this.state.checked && <HabitList/> }
            
            </div>
            
            <div className="newsfeed">
                <NewsfeedList/>
            </div>

        </div>
    );
  }
}

