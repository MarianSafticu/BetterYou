import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import UserDTO from "../../../../models/UserDTO";
import GoalList from "../../../dashboard-page/lists/goals/GoalList";
import "../../../../assets/scss/dashboard-page/FriendPageStyle.scss"
import { Button } from "@material-ui/core";
import { acceptFriendBegin } from "../../../../redux/actions/actions";
import AppState from "../../../../redux/store/store";
import { connect } from "react-redux";

interface IProps extends RouteComponentProps<any>{
    username: string,
    invideFriend: Function
}

interface IState {
    user: UserDTO
}


class FriendPageComponent extends React.Component<IProps, IState> {
    getUser = (username: string): UserDTO => {
        return { username: username, profilePicture: "https://c8.alamy.com/comp/P9MYWR/man-avatar-profile-P9MYWR.jpg", isAuthenticated: true }
    }

    constructor(props: IProps) {
        super(props);
        var user = this.getUser(this.props.match.params.username)
        this.state = {
            user: user
        }
        console.log(this.props.match.params.username)
    }

    makeFriendRequest = () => {
        this.props.invideFriend();
    }

    render() {
        return (
            <div className="profile-card-container">
                <div className="profile-card-border">
                    <div className="profile-card">
                        <img src={this.state.user.profilePicture} />
                        <div>
                            <h2>User: {this.state.user.username} </h2>
                            <Button onClick={this.makeFriendRequest}> Add friend </Button>
                        </div>
                    </div>
                </div>
                <div className="goallist-container-div">
                    <GoalList isReadOnly={true} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: AppState) => {
    return {
    }
  }
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      fetchFriends: (username: string) => dispatch(acceptFriendBegin(username))
    }
  }
export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(FriendPageComponent));