import React from "react";
import AppBarStyles from "../assets/scss/AppBarStyle";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Button} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import { Link } from "react-router-dom";

export default function AppBarComponent() {
  const classes = AppBarStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.icon}>
          <BuildIcon />
        </Link>
        <Link to="/apps" className={classes.link}>
          Apps
        </Link>
        <Link to="/about" className={classes.link}>
          About
        </Link>
        <Button className={classes.button}>Login</Button>
      </Toolbar>
    </AppBar>
  );
}
