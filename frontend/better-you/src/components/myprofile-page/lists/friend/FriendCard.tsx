import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/profile-page/FriendsListStyle.scss";
import { NavLink } from "react-router-dom";

interface IProps {
  image: string;
  name: string;
  username: string;
}

class FriendCard extends React.Component<IProps, {}> {
  render() {
    return (
      // <Card className="friend_container" onClick={() => {console.log(this.props.username)}}>
      <Card className="friend_container">
        <NavLink className="nav_link_friend" to={"u/" + this.props.username} id="friend_name">
          <img src={this.props.image} className="friend_image_page"></img>
          <div className="friend_name_page">{this.props.name}</div>
        </NavLink>
      </Card>
    )
  }
}

export default FriendCard;
