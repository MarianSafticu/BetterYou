import React from "react";
import AppBarStyles from "../assets/scss/AppBarStyle";
import "../assets/scss/AppBarStyle.scss";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Button } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import { NavLink, Link } from "react-router-dom";

export default function AppBarComponent() {
  const classes = AppBarStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.links}>
          <div className={classes.iconContainer}>
            <NavLink to="/" className={classes.icon}>
              <BuildIcon />
            </NavLink>
          </div>
          <div className="link-container">
            <NavLink to="/apps" className={classes.link}>
              Apps
            </NavLink>
          </div>
          <div className="link-container">
            <NavLink to="/about" className={classes.link}>
              About
            </NavLink>
          </div>
        </div>
        <Link to="/login" className={classes.link}>
          <Button className={classes.button}>Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
