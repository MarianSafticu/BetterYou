import React from "react";
import AppBarMobileStyles from "../assets/scss/AppBarMobileStyle";
import "../assets/scss/AppBarMobileStyle.scss";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

export default function AppBarMobileComponent() {
  const classes = AppBarMobileStyles();
  const [state, setState] = React.useState({ drawerOpen: false });

  const toggleDrawer = (open: boolean) => () => {
    setState({ ...state, drawerOpen: open });
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <div className={classes.links}>
            <div className={classes.iconContainer}>
              <NavLink to="/" className={classes.icon}>
                <BuildIcon />
              </NavLink>
            </div>
          </div>
          <Button className={classes.button}>Login</Button>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={state.drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List className={classes.drawerList}>
            <ListItem button>
              <NavLink to="/apps" className={classes.link}>
                Apps
              </NavLink>
            </ListItem>
            <Divider />
            <ListItem button>
              <NavLink to="/about" className={classes.link}>
                About
              </NavLink>
            </ListItem>
            <Divider />
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
