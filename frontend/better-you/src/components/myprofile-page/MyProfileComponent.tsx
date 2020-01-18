import React, { Component, RefObject } from "react";
import "../../assets/scss/myprofile-page/MyProfileComponentStyle.scss";
import "../../assets/scss/generic/AppBarStyle.scss";
import AppState from "../../redux/store/store";
import { unsetCurrentUser } from "../../redux/actions/actions";
import UserDTO from "../../models/UserDTO";
import UserInfoDTO from "../../models/UserInfoDTO";
import { connect } from "react-redux";
import { Breakpoint } from "react-socks";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SettingsIcon from "@material-ui/icons/Settings";
import BookIcon from "@material-ui/icons/Book";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { getCookie } from "../../services/CookieService";

import DefaultGoals from "../myprofile-page/lists/default-goals/DefaultGoals";
import FriendsList from "../myprofile-page/lists/friend/FriendsList";
import FriendsListRequests from "./lists/friend/FriendsListRequests";

interface IProps {
  userInfo: UserDTO | undefined;
  userInformation: UserInfoDTO | undefined;
  logoutUser: Function;
}

interface IState {
  url_picture?: string;
  profile_name?: string;
  friends: boolean;
  friends_request: boolean,
  goals: boolean;
}

export class MyProfileComponent extends Component<IProps, IState> {
  handleClickFriends = () => {
    this.setState({ friends: true, goals: false, friends_request: false });
  };

  handleClickGoals = () => {
    this.setState({ friends: false, goals: true, friends_request: false });
  };

  handleClickFriendsRequest = () => {
    this.setState({ friends: false, goals: false, friends_request: true });
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      friends: false,
      goals: false,
      friends_request: false,
      url_picture:
        this.props.userInfo !== undefined
          ? this.props.userInfo.profilePicture
          : "../assets/photos/profile-picture-test.jpg",
      profile_name: getCookie("userInfo"),
    };
  }

  render() {
    return (
      <div>
        <Breakpoint large up>
        <Drawer id="menu" variant="permanent">
            <List>
              <ListItem className="item">
                <img id="avatar" src={this.state.url_picture}></img>
              </ListItem>

              <ListItem id="username">
                <ListItemText primary={this.state.profile_name} />
              </ListItem>

              <Divider />

              <ListItem disabled key="Statistici" className="item">
                <ListItemIcon>
                  <AssessmentIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItem>
              <ListItem disabled key="Settings" className="item">
                <ListItemIcon>
                  <SettingsIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>

              <Divider />

              <ListItem
                button
                key="Friends"
                className="item"
                onClick={this.handleClickFriends}
              >
                <ListItemIcon>
                  <PeopleAltIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Friends" />
              </ListItem>

              <ListItem
                button
                key="Goals"
                className="item"
                onClick={this.handleClickGoals}
              >
                <ListItemIcon>
                  <BookIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Default Goals" />
              </ListItem>
            </List>
          </Drawer>
          <div id="content_body">
            <div id="left-side">
              {this.state.friends && (
                <div>
                  <FriendsList />
                </div>
              )}

              {this.state.goals && (
                <div>
                  <DefaultGoals />
                </div>
              )}
            </div>
            {this.state.friends &&
              <div id="right-side">
                <h2>Friend Request </h2>
                <div id="request">
                  <FriendsListRequests />
                </div>
              </div>}
          </div>
        </Breakpoint>

        <Breakpoint medium>
          <Drawer id="menu" variant="permanent">
            <List>
              <ListItem className="item">
                <img id="avatar" src={this.state.url_picture}></img>
              </ListItem>

              <ListItem id="username">
                <ListItemText primary={this.state.profile_name} />
              </ListItem>

              <Divider />

              <ListItem disabled key="Statistici" className="item">
                <ListItemIcon>
                  <AssessmentIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItem>
              <ListItem disabled key="Settings" className="item">
                <ListItemIcon>
                  <SettingsIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>

              <Divider />

              <ListItem
                button
                key="Friends"
                className="item"
                onClick={this.handleClickFriends}
              >
                <ListItemIcon>
                  <PeopleAltIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Friends" />
              </ListItem>

              <ListItem
                button
                key="Friends_Request"
                className="item"
                onClick={this.handleClickFriendsRequest}
              >
                <ListItemIcon>
                  <PersonAddIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Friend Request" />
              </ListItem>

              <ListItem
                button
                key="Goals"
                className="item"
                onClick={this.handleClickGoals}
              >
                <ListItemIcon>
                  <BookIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Default Goals" />
              </ListItem>
            </List>
          </Drawer>
          <div id="content_body">
              {this.state.friends && (
                <div>
                  <FriendsList />
                </div>
              )}

              {this.state.goals && (
                <div>
                  <DefaultGoals />
                </div>
              )}

              {this.state.friends_request && (
                <div>
                  <FriendsListRequests/>
                </div>
              )}
          </div>
        </Breakpoint>
        <Breakpoint small down>
          <Drawer id="menu" variant="permanent">
            <List>
              <ListItem className="item-avatar">
                <img id="avatar" src={this.state.url_picture}></img>
              </ListItem>

              <Divider />

              <ListItem disabled key="Statistici" className="item">
                <ListItemIcon>
                  <AssessmentIcon fontSize="large" />
                </ListItemIcon>
              </ListItem>
              <ListItem disabled key="Settings" className="item">
                <ListItemIcon>
                  <SettingsIcon fontSize="large" />
                </ListItemIcon>
              </ListItem>
              <Divider />

              <ListItem
                button
                key="Friends"
                className="item"
                onClick={this.handleClickFriends}
              >
                <ListItemIcon>
                  <PeopleAltIcon fontSize="large" />
                </ListItemIcon>
              </ListItem>

              <ListItem
                button
                key="Friends_Request"
                className="item"
                onClick={this.handleClickFriendsRequest}
              >
                <ListItemIcon>
                  <PersonAddIcon fontSize="large" />
                </ListItemIcon>
              </ListItem>
              
              <ListItem
                button
                key="Goals"
                className="item"
                onClick={this.handleClickGoals}
              >
                <ListItemIcon>
                  <BookIcon fontSize="large" />
                </ListItemIcon>
              </ListItem>
            </List>
          </Drawer>
          <div id="content_body">
            {this.state.friends && (
              <div className="list">
                <FriendsList />
              </div>
            )}
            {this.state.goals && (
              <div className="list">
                <DefaultGoals />
              </div>
            )}
              {this.state.friends_request && (
                <div>
                  <FriendsListRequests/>
                </div>
              )}
          </div>
        </Breakpoint>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    userInfo: state.userInfo,
    userInformation: state.userInformation
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutUser: () => dispatch(unsetCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileComponent);
