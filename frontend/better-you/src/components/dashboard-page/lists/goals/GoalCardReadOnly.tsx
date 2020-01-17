import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Fab from "@material-ui/core/Fab";
import Goal from "../../../../models/Goal";
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded';




interface IProps {
    goal: Goal,
}
interface IState {
    goal: Goal,
}

export default class GoalCardReadOnly extends React.Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);
        this.state = {
            goal: this.props.goal,
        };
    }

    render() {
        return (
            <Card className="card-container">
                <div className="category" style={{ backgroundColor: this.state.goal.category.color }} />
                <CardActionArea
                    className="title_container"
                >
                    <Typography variant="h5" className="title">
                        {this.props.goal.title}
                    </Typography>
                </CardActionArea>

                <div style={{ paddingLeft: "5px", paddingTop: "5px" }}>
                    <Fab size="small" style={{ marginLeft: "20px" }}>
                    <ThumbUpAltRoundedIcon  />
                    </Fab>
                    <Fab size="small" style={{ marginLeft: "20px" }}>
                    <ThumbDownAltRoundedIcon  />
                    </Fab>
                </div>

                <div className="container-readOnly">
                    <GoalProgressBar
                        currentProgress={this.state.goal.currentProgress}
                        progressToReach={this.props.goal.progressToReach}
                    />
                    <p>
                        {this.state.goal.description}
                    </p>
                </div>
            </Card>
        );
    }
}