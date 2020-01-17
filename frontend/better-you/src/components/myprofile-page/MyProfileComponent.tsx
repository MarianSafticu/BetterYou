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


interface IProps {
    userInfo: UserDTO | undefined;
    userInformation: UserInfoDTO | undefined;
    logoutUser: Function;
}

interface IState {
    url_picture?: string,
    username?: string,
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
            url_picture: (props.userInfo !== undefined ? props.userInfo.profilePicture : "../assets/photos/profile-picture-test.jpg"),
            username: (props.userInformation !== undefined ? props.userInformation.profile_name : "Profile Name"),
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
            this.setState({ show: false});
        }
        else {
            this.setState({ show: true});
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
                            <ListItemText primary={this.state.username} />
                        </ListItem>}
                        {this.state.show && <Divider />}
                        <ListItem key="Statistici" className="item">
                            <ListItemIcon>
                                <AssessmentIcon fontSize="large" />
                            </ListItemIcon>
                            {this.state.show && <ListItemText primary="Statistics" />}
                        </ListItem>
                        <ListItem key="Settings" className="item">
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
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                            donec massa sapien faucibus et molestie ac.
                </p>
                    }
                    {this.state.goals &&
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                            donec ultrices.
                </p>
                    }

                </div>
            </div>
            // <img src={this.state.url_picture}></img>
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
