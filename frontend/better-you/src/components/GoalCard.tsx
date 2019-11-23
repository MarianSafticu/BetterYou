import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../assets/scss/GoalListStyle.scss";

class GoalCard extends React.Component<
  {},
  { title: string; description: string; progress: number }
> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      title: "No title",
      description: "",
      progress: 0
    };
  }

  render() {
    return (
      <Card className="card">
        <div className="category" />
        <CardActionArea>
          <Typography variant="h5" className="title">
            {this.state.title}
          </Typography>
        </CardActionArea>
        <GoalProgressBar />
      </Card>
    );
  }
}

export default GoalCard;
