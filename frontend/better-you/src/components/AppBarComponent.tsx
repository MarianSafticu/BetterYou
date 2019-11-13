import React from "react";
import AppBarStyles from "../assets/scss/AppBarStyle";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, IconButton, Button } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import { Link } from "react-router-dom";

export default function AppBarComponent() {
  const classes = AppBarStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton className={classes.iconButton} edge="start">
          <BuildIcon />
        </IconButton>
        <Link to="/" className={classes.link}>
          Apps
        </Link>
        <Link to="/" className={classes.link}>
          About
        </Link>
        <Link to="/login" className={classes.button}>
          <Button className={classes.button}>Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
