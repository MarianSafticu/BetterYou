import React from "react";
import Card from "@material-ui/core/Card";
import "../../../../assets/scss/dashboard-page/NewsfeedListStyle.scss";
import Fab from "@material-ui/core/Fab";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Tooltip from "@material-ui/core/Tooltip";

interface IProps {
  image: string;
  name: string;
  action: string;
}

class NewsfeedCard extends React.Component<IProps, {}> {
  render() {
    let stil = {
      backgroundImage: 'url("' + this.props.image + '")'
    };

    if (this.props.image === "")
      return (
        <Card className="newsfeed_container">
          <Tooltip title="Go to profile">
            <Fab color="inherit" className="friend_image">
              <AccountCircleOutlinedIcon />
            </Fab>
          </Tooltip>

          <div className="newsfeed_message">
            <div id="friend_name">{this.props.name}</div>
            <div id="friend_action">{this.props.action}</div>
          </div>
        </Card>
      );
    else
      return (
        <Card className="newsfeed_container">
          <Tooltip title="Go to profile">
            <Fab color="inherit" className="friend_image" style={stil}>{""}</Fab>
          </Tooltip>

          <div className="newsfeed_message">
            <div id="friend_name">{this.props.name}</div>
            <div id="friend_action">{this.props.action}</div>
          </div>
        </Card>
      );
  }
}

export default NewsfeedCard;
