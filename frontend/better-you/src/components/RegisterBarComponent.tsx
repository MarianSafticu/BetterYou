import React from "react";
import RegisterBarStyles from "../assets/scss/RegisterBarStyle";
import { Button } from "@material-ui/core";

export default function RegisterBarComponent() {
  const classes = RegisterBarStyles();
  return (
    <div className={classes.container}>
      <div className={classes.components}>
        <div className={classes.header}>
          <h1>Start organizing your life</h1>
        </div>
        <Button className={classes.button}>Join now</Button>
      </div>
    </div>
  );
}
