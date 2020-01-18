import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import UserDTO from "../../../../models/UserDTO";
import GoalList from "../../../dashboard-page/lists/goals/GoalList";
import "../../../../assets/scss/dashboard-page/FriendPageStyle.scss"
import { Button } from "@material-ui/core";
import { checkFriendBegin, addFriendBegin } from "../../../../redux/actions/actions";
import AppState from "../../../../redux/store/store";
import { connect } from "react-redux";

interface IProps extends RouteComponentProps<any> {
    username: string,
    addFriend: Function,
    checkFriend: Function
}

interface IState {
    user: UserDTO,
    isFriend: boolean
}


class FriendPageComponent extends React.Component<IProps, IState> {
    getUser = (username: string): UserDTO => {
        return { username: username, profilePicture: "https://c8.alamy.com/comp/P9MYWR/man-avatar-profile-P9MYWR.jpg", isAuthenticated: true }
    }

    constructor(props: IProps) {
        super(props);
        var user = this.getUser(this.props.match.params.username)
        this.state = {
            user: user,
            isFriend: false
        }

        this.setState({
            isFriend: this.props.checkFriend()
        })


    }

    makeFriendRequest = () => {
        this.props.addFriend(this.state.user.username);
    }

    render() {
        return (
            <div className="profile-card-container">
                <div className="profile-card-border">
                    <div className="profile-card">
                        <img src={this.state.user.profilePicture} />
                        <div>
                            <h2>User: {this.state.user.username} </h2>
                            {/* {() => {
                                console.log("CHECK: ", this.state.isFriend)

                                if (this.state.isFriend === false) {
                                    return (
                                        <Button onClick={this.makeFriendRequest}> Add friend </Button>
                                    )
                                }
                            }} */}
                            {this.state.isFriend === false ? 
                                        <Button onClick={this.makeFriendRequest}> Add friend </Button>
                                    : console.log("True")}
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
        addFriend: (username: string) => dispatch(addFriendBegin(username)),
        checkFriend: (username: string) => dispatch(checkFriendBegin(username))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FriendPageComponent));