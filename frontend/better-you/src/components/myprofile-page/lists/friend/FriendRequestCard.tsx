import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";

interface IProps {
    image: string;
    name: string;
    username: string;
}

class FriendRequestCard extends React.Component<IProps, {}> {
    //TODO: de facut
    render() {
        return (
            <Card className="friend_request_container">
                {/* <div className="card_request_div" onClick={() => { console.log(this.props.username) }}>
                    <img src={this.props.image} className="friend_image_page"></img>
                    <div className="friend_name_page">{this.props.name}</div>
                </div> */}

            </Card>
        )
    }
}

export default FriendRequestCard;