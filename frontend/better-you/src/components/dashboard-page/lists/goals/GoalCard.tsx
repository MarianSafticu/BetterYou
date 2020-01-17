import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField, Button, Popover, List, ListItem, Divider } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Done from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Goal from "../../../../models/Goal";
import GeneralGoalViewPopupComponent from "../goals/GeneralGoalViewPopupComponent";
import { deleteGoalBegin, fetchFriendsBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import Friend from "../../../../models/Friend";
import AppState from "../../../../redux/store/store";
import { challengeFriendBegin } from "../../../../redux/actions/actions";
import ChallengeFriendDTO from "../../../../models/ChallengeFriendDTO";

interface IProps {
  goal: Goal,
  isReadOnly?: boolean | null,
  markGoalAsCompleate?: Function,
  friends: Friend[],
  fetchFriends: Function,
  chalangeFriend: Function;
  deleteGoal: Function;
}

interface IState {
  goal: Goal,
  showGoalView: boolean,
  input_progress: number,
  isChalangeFriendOpen: boolean
}

class GoalCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      goal: this.props.goal,
      showGoalView: false,
      input_progress: 1,
      isChalangeFriendOpen: false
    };
  }

  isReadOnly = (): boolean => {
    if (this.props.isReadOnly !== null && this.props.isReadOnly !== undefined && this.props.isReadOnly)
      return true;
    return false;
  }

  handleOpenGoal = () => {
    if (this.isReadOnly())
      return
    this.setState({
      goal: this.state.goal,
      showGoalView: true,
      inpu_progress: this.state.input_progress
    });
  };

  handleCloseGoal = () => {
    this.setState({
      goal: this.state.goal,
      showGoalView: false,
      input_progress: this.state.input_progress
    });
  };

  handleOpenChalangeFriend = () => {
    //this.props.fetchFriends();
    this.setState({
      isChalangeFriendOpen: true
    });
  }
  handleCloseChalangeFriend = () => {
    this.setState({
      isChalangeFriendOpen: false
    });
  }

  handleChalangeFriend = (friend: Friend) => {
    this.props.chalangeFriend({receiverUsername: friend.username, goalId: this.props.goal.groupId})
    this.handleCloseChalangeFriend();
  }

  render() {
    return (
      <Card className="card-container">
        <div className="category"  style={{backgroundColor: this.state.goal.category.color}}/>
        <div className="title-container">
        <Typography variant="h5" className="title" onClick={this.handleOpenGoal}>
            {this.props.goal.title}
          </Typography>
          <Button style={{ float: "right", height: "50px", width: "25%" }} onClick={this.handleOpenChalangeFriend}>
            challenge
          </Button>
          {
            !this.isReadOnly()
            &&
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete" 
                className="delete_button"
                onClick={() => this.props.deleteGoal(this.state.goal.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        </div>

        <div className="container">
          <GoalProgressBar
            currentProgress={this.state.goal.currentProgress}
            progressToReach={this.props.goal.progressToReach}
          />
          {
            !this.isReadOnly()
            &&
            <Tooltip
              title="Modify progress with the specified number"
              aria-label="add"
            >
              <TextField
                type="number"
                defaultValue="1"
                className="input_progress"
                onChange={(text: any) => {
                  this.setState({
                    input_progress: Number(text.target.value)
                  });
                }}
              />
            </Tooltip>
          }
          {
            !this.isReadOnly()
            &&
            <Tooltip title="Modify" aria-label="add">
              <Fab color="inherit" className="add_button_progress">
                <Done onClick={e => { this.handleClick(); }} />
              </Fab>
            </Tooltip>
          }
          <GeneralGoalViewPopupComponent
            selfDistructFunction={this.handleCloseGoal}
            open={this.state.showGoalView}
            goal={this.props.goal}
          />
          <Popover
            anchorOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            anchorEl={null}
            open={this.state.isChalangeFriendOpen}
            onClose={this.handleCloseChalangeFriend}>
            <div style={{ width: "500px", maxWidth: "100vw", height: "50vh", overflowY: "scroll", alignContent: "center", textAlign: "center" }}>
              {
                this.props.friends.length === 0
                &&
                <p style={{ margin: "auto" }}>You have no friends to challenge</p>
              }
              {
                this.props.friends.length !== 0
                &&
                <div style={{ padding: "20px" }}>
                  Chose the friend you want to challenge
                <List >
                    {this.props.friends.map((x) =>
                      <div>
                        <ListItem style={{ cursor: "pointer" }} onClick={() => { this.handleChalangeFriend(x) }}>
                          {x.username}
                        </ListItem>
                        <Divider />
                      </div>
                    )}
                  </List>
                </div>
              }
            </div>
          </Popover>
        </div>
      </Card>
    );
  }

  handleClick() {
    let goal = this.state.goal;
    goal.currentProgress = goal.currentProgress + this.state.input_progress;
    if (goal.currentProgress < 0)
      goal.currentProgress = 0;
    else if (goal.currentProgress >= goal.progressToReach)
      goal.currentProgress = goal.progressToReach;
    this.setState({ goal: goal })
  }
}


const mapStateToProps = (state: AppState) => ({
  friends: state.friends
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFriends: () => dispatch(fetchFriendsBegin()),
    chalangeFriend: (challenge: ChallengeFriendDTO) => dispatch(challengeFriendBegin(challenge)),
    deleteGoal: (id: number) => dispatch(deleteGoalBegin(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalCard);
