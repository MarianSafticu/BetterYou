import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";
import "../../assets/scss/generic/AppBarStyle.scss";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import { unsetCurrentUser, setCurrentUserInformationBegin } from "../../redux/actions/actions";
import UserDTO from "../../models/UserDTO";
import UserInfoDTO from "../../models/UserInfoDTO";
import { getUserInformationHandler } from "../../redux/sagas/Listeners";

const StyledMenu = withStyles({
  paper: {
    border: "none",
    backgroundColor: "rgba(235, 185, 83, 0.6)"
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

interface IProps {
  image?: string;
  userInfo: UserDTO | undefined;
  userInformation : UserInfoDTO | undefined;
  logoutUser: Function;
  getUserInformation : Function;
}

function MenuProfilePicture(props: IProps) {
  let picture = {
    backgroundImage:
      'url("' +
      (props.userInfo !== undefined
        ? props.userInfo.profilePicture
        : "../assets/photos/profile-picture-test.jpg") +
      '")'
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutAction = () => {
    props.logoutUser();
  };

  const handleProfileAction = () => {
    props.getUserInformation();
  }

  return (
    <div>
      <a
        aria-controls="customized-menu"
        className="profile-pic"
        style={picture}
        onClick={handleClick}
      ></a>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <NavLink to="/dashboard" className="link">
              <HomeIcon fontSize="small" /> Dashboard
            </NavLink>
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NavLink to="/profile" className="link" onClick={handleProfileAction}>
              <PersonIcon fontSize="small" /> MyProfile
            </NavLink>
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NavLink to="/" className="link" onClick={handleLogoutAction}>
              <ExitToAppIcon fontSize="small" /> Sign out
            </NavLink>
          </ListItemIcon>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    userInfo: state.userInfo,
    userInformation : state.userInformation
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutUser: () => dispatch(unsetCurrentUser()),
    getUserInformation : () => dispatch(setCurrentUserInformationBegin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuProfilePicture);
