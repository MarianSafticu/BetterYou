import React, { Component, RefObject } from "react";
import "../../assets/scss/myprofile-page/MyProfileComponentStyle.scss";
import "../../assets/scss/generic/AppBarStyle.scss";
import AppState from "../../redux/store/store";
import { unsetCurrentUser } from "../../redux/actions/actions";
import UserDTO from "../../models/UserDTO";
import UserInfoDTO from '../../models/UserInfoDTO';
import { connect } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import BookIcon from '@material-ui/icons/Book';
import { getCookie } from "../../services/CookieService";

import DefaultGoals from '../myprofile-page/lists/default-goals/DefaultGoals';
import FriendsList from '../myprofile-page/lists/friend/FriendsList';

interface IProps {
    userInfo: UserDTO | undefined;
    userInformation: UserInfoDTO | undefined;
    logoutUser: Function;
}

interface IState {
    url_picture?: string,
    profile_name?: string,
    friends: boolean,
    goals: boolean,
    show: boolean,
}

export class MyProfileComponent extends Component<IProps, IState>{

    comp: RefObject<HTMLDivElement>;
    handleClickFriends = () => {
        this.setState({ friends: true, goals: false });
    };

    handleClickGoals = () => {
        this.setState({ friends: false, goals: true })
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            friends: false,
            goals: false,
            url_picture: (this.props.userInfo !== undefined ? this.props.userInfo.profilePicture : "../assets/photos/profile-picture-test.jpg"),
            profile_name: getCookie('userInfo'),
            show: true,
        }
        this.updateDimensions = this.updateDimensions.bind(this);
        this.comp = React.createRef();
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    updateDimensions() {
        if (this.comp.current == null)
            return;

        if (window.innerWidth < 850) {
            this.setState({ show: false });
        }
        else {
            this.setState({ show: true });
        }
    }

    render() {
        return (
            <div>
                <Drawer
                    id="menu"
                    variant="permanent"
                    ref={this.comp}
                >
                    <List>
                        {this.state.show &&
                            <ListItem className="item">
                                <img id="avatar" src={this.state.url_picture}></img>
                            </ListItem>}
                        {this.state.show &&
                            <ListItem id="username">
                                <ListItemText primary={this.state.profile_name} />
                            </ListItem>}
                        {this.state.show && <Divider />}
                        <ListItem disabled key="Statistici" className="item">
                            <ListItemIcon>
                                <AssessmentIcon fontSize="large" />
                            </ListItemIcon>
                            {this.state.show && <ListItemText primary="Statistics" />}
                        </ListItem>
                        <ListItem disabled key="Settings" className="item">
                            <ListItemIcon>
                                <SettingsIcon fontSize="large" />
                            </ListItemIcon>
                            {this.state.show && <ListItemText primary="Settings" />}
                        </ListItem>
                        <Divider />
                        <ListItem button key="Friends" className="item" onClick={this.handleClickFriends}>
                            <ListItemIcon>
                                <PeopleAltIcon fontSize="large" />
                            </ListItemIcon>
                            {this.state.show && <ListItemText primary="Friends" />}
                        </ListItem>
                        <ListItem button key="Goals" className="item" onClick={this.handleClickGoals}>
                            <ListItemIcon>
                                <BookIcon fontSize="large" />
                            </ListItemIcon>
                            {this.state.show && <ListItemText primary="Default Goals" />}
                        </ListItem>
                    </List>
                </Drawer>
                <div id="content_body">
                    {this.state.friends &&
                        <div>
                            <FriendsList />
                        </div>
                    }
                    {this.state.goals &&
                        <div>
                            <DefaultGoals/>
                        </div>
                    }

                </div>
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
