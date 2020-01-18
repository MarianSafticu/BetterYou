import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";
import Friend from "../../../../models/Friend";
import { acceptFriendBegin, declineFriendBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import UsernameRequestDTO from "../../../../models/UsernameRequestDTO";

interface IProps {
    image: string;
    sender: Friend;
    acceptRequest: Function;
    declineRequest: Function;
}

class ChallengeCard extends React.Component<IProps, {}> {
    render() {
        return (
            <Card className="friend_container_request">
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
                            this.handleClickDecline(this.props.sender.username);
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

export default connect(null, mapDispatchToProps)(ChallengeCard);