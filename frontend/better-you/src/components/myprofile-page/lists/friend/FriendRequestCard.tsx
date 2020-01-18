import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";
import Friend from "../../../../models/Friend";
import { acceptFriendBegin, declineFriendBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import UsernameRequestDTO from "../../../../models/UsernameRequestDTO";
import { NavLink } from "react-router-dom";

interface IProps {
    image: string;
    sender: Friend;
    acceptRequest: Function;
    declineRequest: Function;
}

class FriendRequestCard extends React.Component<IProps, {}> {
    render() {
        { console.log("SENDER", this.props.sender) }

        return (
            <Card className="friend_container_request">
                <div className="card_request_div">
                    <NavLink className="nav_link_friend" to={"u/" + this.props.sender.username} id="friend_name">

                        <img src={this.props.image} className="friend_image_page"></img>
                        <div className="friend_name_page">{this.props.sender.profile_name}</div>
                    </NavLink>
                </div>
                <div className="friend_card_buttons">
                    <button className="acceptButton"
                        onClick={() => {
                            this.handleClickAccept(this.props.sender.username);
                        }}>
                        Accept
                    </button>
                    <button className="declineButton"
                        onClick={() => {
                            this.handleClickDecline(this.props.sender.username);
                        }}>
                        Decline
                    </button>
                </div>

            </Card>
        )
    }


    handleClickAccept(username: string) {
        let user: UsernameRequestDTO = {
            usernameSender: username
        }
        this.props.acceptRequest(user);
    }

    handleClickDecline(username: string) {
        let user: UsernameRequestDTO = {
            usernameSender: username
        }
        this.props.declineRequest(user);
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        acceptRequest: (username: string) => dispatch(acceptFriendBegin(username)),
        declineRequest: (username: string) => dispatch(declineFriendBegin(username))
    };
};

export default connect(null, mapDispatchToProps)(FriendRequestCard);