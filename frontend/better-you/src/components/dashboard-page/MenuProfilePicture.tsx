import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";
import "../../assets/scss/generic/AppBarStyle.scss";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import { unsetCurrentUser } from "../../redux/actions/actions";
import UserDTO from "../../models/UserDTO";

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
  logoutUser: Function;
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

  return (
    <div>
      <a
        aria-controls="customized-menu"
        className="profile-pic"
        style={picture}
        onClick={handleClick}
      >{""}</a>
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
              <PersonIcon fontSize="small" /> My profile
            </NavLink>
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NavLink to="/settings" className="link">
              <SettingsIcon fontSize="small" /> Settings
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
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutUser: () => dispatch(unsetCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuProfilePicture);
