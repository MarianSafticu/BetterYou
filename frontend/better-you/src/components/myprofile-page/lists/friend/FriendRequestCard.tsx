import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";
import Friend from "../../../../models/Friend";

interface IProps {
    image: string;
    sender: Friend;
}

class FriendRequestCard extends React.Component<IProps, {}> {
    render() {
        {console.log("SENDER", this.props.sender)}

        return (
            <Card className="friend_container">
                <div className="card_request_div" onClick={() => { console.log(this.props.sender.username) }}>
                    <img src={this.props.image} className="friend_image_page"></img>
                    <div className="friend_name_page">{this.props.sender.profile_name}</div>
                </div>

            </Card>
        )
    }
}

export default FriendRequestCard;