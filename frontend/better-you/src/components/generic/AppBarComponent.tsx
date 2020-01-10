import React, { Component, RefObject } from "react";
import "../../assets/scss/generic/AppBarStyle.scss";
import {
  Toolbar,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  AppBar
} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import { NavLink, Link } from "react-router-dom";
import AppState from "../../redux/store/store";
import { connect } from "react-redux";
import { Breakpoint } from "react-socks";
import MenuIcon from "@material-ui/icons/Menu";
import MenuProfilePicture from "../dashboard-page/MenuProfilePicture";
import UserDTO from "../../models/UserDTO";
import NewsfeedList from "../dashboard-page/lists/newsfeed/NewsfeedList";
import GoalList from "../dashboard-page/lists/goals/GoalList";
import { setAppBarSwipeableDrawer } from "../../redux/actions/actions";
import AppBarItem from "../../models/AppBarItem";
import { stat } from "fs";

interface IProps {
  userInfo: UserDTO | undefined;
  appBarListItems: AppBarItem[];
  setAppBarSwipeableDrawer: Function;
}

interface IState {
  drawerIsOpen: boolean;
}

class AppBarComponent extends Component<IProps, IState> {
  appBarSwipeableDrawerAux: RefObject<any>;
  constructor(props: any) {
    super(props);
    this.state = {
      drawerIsOpen: false
    };

    this.appBarSwipeableDrawerAux = React.createRef();
  }
  componentDidMount() {
    this.props.setAppBarSwipeableDrawer(this.appBarSwipeableDrawerAux);
  }

  toggleDrawer(openValue: boolean) {
    this.props.setAppBarSwipeableDrawer(this.appBarSwipeableDrawerAux);
    this.setState({
      drawerIsOpen: openValue
    });
  }

  render() {
    if (
      this.props.userInfo !== undefined &&
      this.props.userInfo.isAuthenticated
    ) {
      return (
        <div className="app-bar-container">
          <Breakpoint large up className="app-bar-breakpoint">
            <AppBar className="appBar">
              <Toolbar className="toolbar">
                <div className="links-container">
                  <div className="logo-container">
                    <NavLink to="/" className="logo">
                      <BuildIcon />
                    </NavLink>
                  </div>
                  <div className="link-container">
                    <NavLink to="/apps" className="link">
                      Apps
                    </NavLink>
                  </div>
                  <div className="link-container">
                    <NavLink to="/about" className="link">
                      About
                    </NavLink>
                  </div>
                </div>
                <div className="profile-picture-container">
                  <MenuProfilePicture />
                </div>
              </Toolbar>
            </AppBar>
          </Breakpoint>
          <Breakpoint medium down className="app-bar-breakpoint">
            <AppBar className="appBar">
              <Toolbar className="toolbar">
                <IconButton onClick={() => this.toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <div className="links-container">
                  <div className="logo-container">
                    <NavLink to="/" className="logo">
                      <BuildIcon />
                    </NavLink>
                  </div>
                </div>
                <div className="profile-picture-container">
                  <MenuProfilePicture />
                </div>
              </Toolbar>
            </AppBar>

            <SwipeableDrawer
              open={this.state.drawerIsOpen}
              onClose={() => this.toggleDrawer(false)}
              onOpen={() => this.toggleDrawer(true)}
            >
              <div
                role="presentation"
                onClick={() => this.toggleDrawer(false)}
                onKeyDown={() => this.toggleDrawer(false)}
              >
                <List className="drawer-list" ref={this.appBarSwipeableDrawerAux}>
                  {this.props.appBarListItems.map(x => {
                    if (x.func == null)
                      return (
                        <div>
                          <Divider />
                          <ListItem>
                            <Link to={x.link} className="link">
                              {x.text}
                            </Link>
                          </ListItem>
                        </div>
                      )
                    else
                      return (
                        <div>
                          <Divider />
                          <ListItem onClick={() => { if (x.func !== null) x.func(); }} className="div_to_link link">
                            {x.text}
                          </ListItem>
                        </div>
                      )
                  }
                  )}
                </List>
              </div>
            </SwipeableDrawer>
          </Breakpoint>
        </div>
      );
    } else {
      return (
        <div className="app-bar-container">
          <Breakpoint large up className="app-bar-breakpoint">
            <AppBar className="app-bar">
              <Toolbar className="toolbar">
                <div className="links-container">
                  <div className="logo-container">
                    <NavLink to="/" className="logo">
                      <BuildIcon />
                    </NavLink>
                  </div>
                  <div className="link-container">
                    <NavLink to="/apps" className="link">
                      Apps
                    </NavLink>
                  </div>
                  <div className="link-container">
                    <NavLink to="/about" className="link">
                      About
                    </NavLink>
                  </div>
                </div>
                <Link to="/login" className="login-link">
                  <Button className="button">Login</Button>
                </Link>
              </Toolbar>
            </AppBar>
          </Breakpoint>
          <Breakpoint medium down className="app-bar-breakpoint">
            <AppBar>
              <Toolbar>
                <IconButton
                  className="menu-icon"
                  onClick={() => this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <div className="links-container">
                  <div className="logo-container">
                    <NavLink to="/" className="logo">
                      <BuildIcon />
                    </NavLink>
                  </div>
                </div>
                <Link to="/login" className="login-link">
                  <Button className="button">Login</Button>
                </Link>
              </Toolbar>
            </AppBar>

            <SwipeableDrawer
              open={this.state.drawerIsOpen}
              onClose={() => this.toggleDrawer(false)}
              onOpen={() => this.toggleDrawer(true)}
            >
              <div
                role="presentation"
                onClick={() => this.toggleDrawer(false)}
                onKeyDown={() => this.toggleDrawer(false)}
              >
                <List className="drawer-list" ref={this.appBarSwipeableDrawerAux}>
                  <ListItem button>
                    <NavLink to="/apps" className="link">
                      Apps
                    </NavLink>
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <NavLink to="/about" className="link">
                      About
                    </NavLink>
                  </ListItem>
                  {this.props.appBarListItems.map(x => {
                    if (x.func == null)
                      return (
                        <div>
                          <Divider />
                          <ListItem>
                            <Link to={x.link} className="link">
                              {x.text}
                            </Link>
                          </ListItem>
                        </div>
                      )
                    else
                      return (
                        <div>
                          <Divider />
                          <ListItem onClick={() => { if (x.func !== null) x.func(); }} className="div_to_link link">
                            {x.text}
                          </ListItem>
                        </div>
                      )
                  }
                  )}
                  <Divider />
                </List>
              </div>
            </SwipeableDrawer>
          </Breakpoint>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  userInfo: state.userInfo,
  appBarListItems: state.appBarItemsList
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAppBarSwipeableDrawer: (refObj: RefObject<any> | null) => dispatch(setAppBarSwipeableDrawer(refObj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);
