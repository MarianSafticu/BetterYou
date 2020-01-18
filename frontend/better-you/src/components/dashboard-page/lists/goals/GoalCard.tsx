import React from "react";
import Card from "@material-ui/core/Card";
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
import Friend from "../../../../models/Friend";
import AppState from "../../../../redux/store/store";
import { connect } from "react-redux";
import { fetchFriendsBegin, challengeFriendBegin, deleteGoalBegin, editGoalBegin } from "../../../../redux/actions/actions";
import ChallengeFriendDTO from "../../../../models/ChallengeFriendDTO";
import EditGoalRequest from "../../../../models/requests/EditGoalRequest";

interface IProps {
  goal: Goal,
  isReadOnly?: boolean | null,
  markGoalAsCompleate?: Function,
  friends: Friend[],
  fetchFriends: Function,
  chalangeFriend: Function;
  deleteGoal: Function;
  updateProgress: Function;
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

  handleDeleteGoal = () => {
    this.props.deleteGoal(this.props.goal.id);
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
              <IconButton aria-label="delete" className="delete_button" onClick={this.handleDeleteGoal}>
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
                <Done onClick={this.handleClick} />
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

  handleClick = () => {
    var goal = this.state.goal;
    goal.currentProgress = goal.currentProgress + this.state.input_progress;
    if (goal.currentProgress < 0)
      goal.currentProgress = 0;
    else if (goal.currentProgress >= goal.progressToReach) {
      goal.currentProgress = goal.progressToReach;
    }
    this.setState({ goal: goal })

    let newGoal: EditGoalRequest = {
      userGoal: {
        id: this.props.goal.id!,
        endDate: this.getStringFromData(this.props.goal.endDate),
        public: this.props.goal.isPublic,
        currentProgress: this.props.goal.currentProgress + this.state.input_progress
      }
    }
    this.props.updateProgress(newGoal);
  }

  getStringFromData = (data: Date) => {
    var str = data.toLocaleDateString();
    var strs = str.split("/", 3);

    if (strs.length < 3) {
      data = new Date();
      str = data.toLocaleDateString();
      strs = str.split("/", 3);
    }

    if (strs[0].length === 1) strs[0] = "0" + strs[0];
    if (strs[1].length === 1) strs[1] = "0" + strs[1];

    var strss: string = strs[2] + "-" + strs[0] + "-" + strs[1];
    return strss;
  };
}


const mapStateToProps = (state: AppState) => ({
  friends: state.friends
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFriends: () => dispatch(fetchFriendsBegin()),
    chalangeFriend: (challenge: ChallengeFriendDTO) => dispatch(challengeFriendBegin(challenge)),
    deleteGoal: (id: number) => dispatch(deleteGoalBegin(id)),
    updateProgress: (goal: EditGoalRequest) => dispatch(editGoalBegin(goal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalCard);
