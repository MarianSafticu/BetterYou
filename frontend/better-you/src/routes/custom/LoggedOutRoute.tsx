import React, { Component } from "react";
import "../../assets/scss/auth-page/LoginRegisterTabStyle.scss";
import UserDTO from "../../models/UserDTO";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import { Route, Redirect } from "react-router";

interface IProps {
  exact?: boolean;
  path: string;
  component: any;
  userInfo?: UserDTO | undefined;
}

class LoggedOutRoute extends Component<IProps> {
  render() {
    return (
      <Route
        exact={this.props.exact}
        to={this.props.path}
        render={() => {
          if (
            this.props.userInfo !== undefined &&
            this.props.userInfo.isAuthenticated
          ) {
            return <Redirect to="/dashboard" />;
          } else {
            return <div className="route-container">{this.props.component}</div>;
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProps, null)(LoggedOutRoute);
