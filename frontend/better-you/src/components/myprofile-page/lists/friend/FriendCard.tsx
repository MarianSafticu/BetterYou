import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";

interface IProps {
  image: string;
  name: string;
  username: string;
}

class FriendCard extends React.Component<IProps, {}> {
  render() {
    return(
      <Card className="friend_container">
        <img src={this.props.image} className="friend_image_page"></img>
        <div className="friend_name_page">{this.props.name}</div>
      </Card>
    )
  }
}

export default FriendCard;
