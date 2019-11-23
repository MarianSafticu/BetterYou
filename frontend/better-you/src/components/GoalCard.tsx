import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../assets/scss/GoalListStyle.scss";

interface IProps {
  goal: { title: string; description: string; progress: number; step: number };
}

class GoalCard extends React.Component<IProps, {}> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      goal: {
        title: prop.goal.title,
        description: prop.goal.description,
        progress: prop.goal.progress
      }
    };
  }

  render() {
    return (
      <Card className="card">
        <div className="category" />
        <CardActionArea>
          <Typography variant="h5" className="title">
            {this.props.goal.title}
          </Typography>
        </CardActionArea>
        <GoalProgressBar
          progress={this.props.goal.progress}
          step={this.props.goal.step}
        />
      </Card>
    );
  }
}

export default GoalCard;
