import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import GoalProgressBar from "./GoalProgressBar";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Popover, List, ListItem, Divider } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Done from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Goal from "../../../../models/Goal";
import GeneralGoalViewPopupComponent from "../goals/GeneralGoalViewPopupComponent";
import Friend from "../../../../models/Friend";
import AppState from "../../../../redux/store/store";
import { connect } from "react-redux";
import { fetchFriendsBegin, challengeFriendBegin } from "../../../../redux/actions/actions";
import ChallengeFriendDTO from "../../../../models/ChallengeFriendDTO";
import { goalCategorys } from "../../../../models/GoalCategorys";

interface IProps {
  goal: Goal,
  isReadOnly?: boolean | null,
  markGoalAsCompleate?: Function,
  friends: Friend[],
  fetchFriends: Function,
  chalangeFriend: Function
}
interface IState {
  goal: Goal,
  showGoalView: boolean,
  input_progress: number,
  isChalangeFriendOpen: boolean
}

const friends: Friend[] = [
  {
    birthDate: new Date(),
    email: "",
    id: 10,
    points: 100,
    profile_name: "profile name 1",
    username: "username 1",
    verified: true
  },
  {
    birthDate: new Date(),
    email: "",
    id: 10,
    points: 100,
    profile_name: "profile name 1",
    username: "username 1",
    verified: true
  },
  {
    birthDate: new Date(),
    email: "",
    id: 10,
    points: 100,
    profile_name: "profile name 1",
    username: "username 1",
    verified: true
  },
]

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

  isReaadOnly = (): boolean => {
    if (this.props.isReadOnly !== null &&
      this.props.isReadOnly !== undefined &&
      this.props.isReadOnly)
      return true;
    return false;
  }

  handleOpneGoal = () => {
    if (this.isReaadOnly())
      return
    this.setState({
      goal: this.state.goal,
      showGoalView: true,
      input_progress: this.state.input_progress
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
        <div className="category" style={{ backgroundColor: this.state.goal.category.color }} />
        <div
          className="MuiButtonBase-root MuiCardActionArea-root title_container"

        >
          <div className="title" onClick={this.handleOpneGoal}>
            {this.props.goal.title}
          </div>

          <Button style={{ float: "right", height: "50px", width: "25%" }} onClick={this.handleOpenChalangeFriend}>
            challenge
          </Button>

          {
            !this.isReaadOnly()
            &&
            <Tooltip title="Delete">
              <IconButton aria-label="delete" className="delete_button">
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
            !this.isReaadOnly()
            &&
            <Tooltip
              title="Modify progress with the specified number"
              aria-label="add"
            >
              <TextField
                type="number"
                defaultValue="+1"
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
            !this.isReaadOnly()
            &&
            <Tooltip title="Modify" aria-label="add">
              <Fab color="inherit" className="add_button_progress">
                <Done
                  onClick={e => {
                    this.handleClick();
                  }}
                />
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
    var goal = this.state.goal;
    goal.currentProgress = goal.currentProgress + this.state.input_progress;
    if (goal.currentProgress < 0)
      goal.currentProgress = 0;
    else if (goal.currentProgress >= goal.progressToReach) {
      goal.currentProgress = goal.progressToReach;
      /*if (this.props.markGoalAsCompleate !== undefined)
        this.setState({ openDialog: true })
      return*/
    }

    this.setState({ goal: goal })
  }
  handleClick2() {
    /*this.setState(state => {
      var newGoal = this.state.goal;

      if (state.goal.currentProgress + state.input_progress < 0) {
        newGoal.currentProgress = 0;
        this.state.goal.currentProgress = 0;
        return {
          goal: newGoal,
          input_progress: this.state.input_progress,
          showGoalView: this.state.showGoalView
        };
      }
      if (
        state.goal.currentProgress + state.input_progress <=
        this.props.goal.progressToReach
      ) {
        newGoal.currentProgress =
          state.goal.currentProgress + state.input_progress;
        this.state.goal.currentProgress =
          state.goal.currentProgress + state.input_progress;
        return {
          goal: newGoal,
          input_progress: this.state.input_progress,
          showGoalView: this.state.showGoalView
        };
      } else {
        this.state.goal.currentProgress = this.state.goal.progressToReach;
        return {
          goal: {
            title: this.props.goal.title,
            description: this.props.goal.description,
            currentProgress: this.props.goal.progressToReach,
            category: newGoal.category,
            endDate: newGoal.endDate,
            progressToReach: newGoal.progressToReach,
            startDate: newGoal.startDate,
            isPublic: newGoal.isPublic
          },
          input_progress: this.state.input_progress,
          showGoalView: this.state.showGoalView
        };
      }
    });*/
  }
}


const mapStateToProps = (state: AppState) => ({
  friends: state.friends
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFriends: () => dispatch(fetchFriendsBegin()),
    chalangeFriend: (challenge: ChallengeFriendDTO) => dispatch(challengeFriendBegin(challenge))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalCard);
