import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import UserDTO from "../../models/UserDTO";
import GoalList from "./lists/goals/GoalList";
import "../../assets/scss/dashboard-page/FriendPageStyle.scss"
import { Button } from "@material-ui/core";

interface IProps {
    username: string,
}

interface IState {
    user: UserDTO
}


class FriendPageComponent extends React.Component<RouteComponentProps<IProps>, IState> {
    getUser = (username: string): UserDTO => {
        return { username: username, profilePicture: "https://c8.alamy.com/comp/P9MYWR/man-avatar-profile-P9MYWR.jpg", isAuthenticated: true }
    }

    constructor(props: RouteComponentProps<IProps>) {
        super(props);
        var user = this.getUser(this.props.match.params.username)
        this.state = {
            user: user
        }
        console.log(this.props.match.params.username)
    }

    render() {
        return (
            <div className="profile-card-container">
                <div className="profile-card-border">
                    <div className="profile-card">
                        <img src={this.state.user.profilePicture} />
                        <div>
                            <h2>User: {this.state.user.username} </h2>
                            <Button> Add friend </Button>
                            <Button> Challenge friend </Button>
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
export default withRouter(FriendPageComponent);