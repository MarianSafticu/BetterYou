import React, { Component } from "react";
import "../assets/scss/AppBarStyle.scss";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  Divider,
  ListItem
} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import { NavLink, Link } from "react-router-dom";
import AppState from "../redux/store/store";
import { connect } from "react-redux";
import { User } from "../models/User";
import { Breakpoint } from "react-socks";
import MenuIcon from "@material-ui/icons/Menu";

interface IProps {
  loggedUser: User | undefined;
}

interface IState {
  drawerIsOpen: boolean;
}

class AppBarComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      drawerIsOpen: false
    };
  }

  toggleDrawer(openValue: boolean) {
    this.setState({
      drawerIsOpen: openValue
    });
  }

  render() {
    if (this.props.loggedUser !== undefined) {
      return (
        <div>
          {/* <Breakpoint large up>
            <AppBar className="appBar">
              <Toolbar className={classes.toolbar}>
                <div className={classes.links}>
                  <div className={classes.iconContainer}>
                    <NavLink to="/" className={classes.icon}>
                      <BuildIcon />
                    </NavLink>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
          </Breakpoint>
          <Breakpoint medium down>
            <AppBar className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <IconButton onClick={() => this.toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <div className={classes.links}>
                  <div className={classes.iconContainer}>
                    <NavLink to="/" className={classes.icon}>
                      <BuildIcon />
                    </NavLink>
                  </div>
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
                <List className={classes.drawerList}>
                </List>
              </div>
            </SwipeableDrawer>
          </Breakpoint> */}
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
                <IconButton className="menu-icon" onClick={() => this.toggleDrawer(true)}>
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
                <List className="drawer-list">
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
  loggedUser: state.currentUser
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);
