import React from "react";
import DateCheckbox from "./DateCheckbox"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import "../assets/scss/GoalListStyle.scss";

interface IProps {
  habit: { title: string; repetitionType: string;};
}


class HabitCard extends React.Component<IProps, {}> {
  constructor(prop: IProps) {
    super(prop);
    this.state = {
      habit: {
        title: prop.habit.title,
        repetitionType: prop.habit.repetitionType,
      }
    };
  }

  render() {
    return (
      <Card className="card">
        <div className="category" />
        <CardActionArea>
          <Typography variant="h5" className="title">
            {this.props.habit.title}
          </Typography>
        </CardActionArea>
        <DateCheckbox typeRepetition={this.props.habit.repetitionType} />
      </Card>
    );
  }
}

export default HabitCard;
