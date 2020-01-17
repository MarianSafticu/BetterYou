import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";
import Friend from "../../../../models/Friend";
import { acceptFriendBegin, declineFriendBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";

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
            <Card className="friend_container">
                <div className="card_request_div" onClick={() => { console.log(this.props.sender.username) }}>
                    <img src={this.props.image} className="friend_image_page"></img>
                    <div className="friend_name_page">{this.props.sender.profile_name}</div>
                </div>
                <div className="friend_card_buttons">
                    <button className="acceptButton"
                        onClick={() => {
                            this.handleClickAccept();
                        }}>
                        Accept
                    </button>
                    <button className="declineButton"
                        onClick={() => {
                            this.handleClickDecline();
                        }}>
                        Decline
                    </button>
                </div>

            </Card>
        )
    }


    handleClickAccept() {
        console.log("accept")
    }

    handleClickDecline() {
        console.log("decline");
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        acceptRequest: (username: string) => dispatch(acceptFriendBegin(username)),
        declineRequest: (username: string) => dispatch(declineFriendBegin(username))
    };
  };

export default connect(null, mapDispatchToProps)(FriendRequestCard);