import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import UserDTO from "../../models/UserDTO";
import GoalList from "./lists/goals/GoalList";
import "../../assets/scss/dashboard-page/FriendPageStyle.scss"

interface IProps {
    username: string,
}

interface IState {
    user: UserDTO
}


class FriendPageComponent extends React.Component<RouteComponentProps<IProps>, IState> {
    getUser = (username: string): UserDTO => {
        return { username: username, profilePicture: "https://cdn3.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumb900.jpg", isAuthenticated: true }
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
            <div>
                <div className="profile-card">
                    <img src={this.state.user.profilePicture}/>
                    <div>
                        <h2>Username: {this.state.user.username} </h2>
                        <h2>Username: {this.state.user.username} </h2>
                        <h2>Username: {this.state.user.username} </h2>
                    </div>
                </div>
                <GoalList isReadOnly={true} />
            </div>
        )
    }
}
export default withRouter(FriendPageComponent);