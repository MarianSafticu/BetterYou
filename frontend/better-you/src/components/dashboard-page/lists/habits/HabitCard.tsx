import React from "react";
import DateCheckbox from "./DateCheckbox"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
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
      <Card className="card-container">
        <div className="category" />
        <CardActionArea className="title_container">
          <Typography variant="h5" className="title">
            {this.props.habit.title}
          </Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" className="delete_button">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActionArea>
        <div className="container">
          <DateCheckbox typeRepetition={this.props.habit.repetitionType} />
        </div>
      </Card>
    );
  }
}

export default HabitCard;
