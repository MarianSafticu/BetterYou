import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";
import Friend from "../../../../models/Friend";
import { acceptFriendBegin, declineFriendBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import UsernameRequestDTO from "../../../../models/UsernameRequestDTO";
import ChallengeDTO from "../../../../models/ChallengeDTO";
import { NavLink } from "react-router-dom";

interface IProps {
    image: string;
    challenge: ChallengeDTO;
    acceptRequest: Function;
    declineRequest: Function;
}

class ChallengeCard extends React.Component<IProps, {}> {
    render() {
        return (
            <Card className="friend_container_request">
                <div className="card_request_div" onClick={() => { console.log(this.props.challenge.form.username) }}>
                    <img src={this.props.image} className="friend_image_page"></img>
                    <NavLink to={"/u/"+this.props.challenge.form.username} className="friend_name_page">{this.props.challenge.form.profile_name}</NavLink>
                </div>
                <div className="friend_card_buttons">
                    <button className="acceptButton"
                        onClick={() => {
                            //this.handleClickAccept();
                        }}>
                        Accept
                    </button>
                    <button className="declineButton"
                        onClick={() => {
                            //if(this.props.challenge.form.username !== undefined)
                            //    this.handleClickDecline(this.props.challenge.form.username);
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