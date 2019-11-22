import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalListStyle from "../assets/scss/GoalListStyle";
import GoalProgressBar from "./GoalProgressBar";
import "../assets/scss/GoalListStyle";

export default function GoalCard() {
  const classes = GoalListStyle();
  return (
    <Card className={classes.card}>
      <div className={classes.category} />
      <CardActionArea>
        <Typography variant="h5" className={classes.title}>
          Citeste 10 carti
        </Typography>
      </CardActionArea>
      <GoalProgressBar />
    </Card>
  );
}
