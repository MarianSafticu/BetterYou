import React, { Component } from "react";
import "../../assets/scss/start-page/StartPageStyle.scss";
import CarouselComponent from "./CarouselComponent";
import RegisterBarComponent from "./RegisterBarComponent";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import UserDTO from "../../models/UserDTO";
import { Redirect } from "react-router-dom";

interface IProps {
  userInfo: UserDTO | undefined;
}

class StartPageComponent extends Component<IProps> {
  render() {
    if (this.props.userInfo !== undefined && this.props.userInfo.isAuthenticated) {
      return (
        <Redirect to="/dashboard"/>
      );
    } else {
      return (
        <div className="start-page-container">
          <CarouselComponent />
          <RegisterBarComponent />
        </div>
      );
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps, null)(StartPageComponent);
