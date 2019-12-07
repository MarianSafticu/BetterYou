import React, { Component } from "react";
import "../../assets/scss/start-page/StartPageStyle.scss";
import CarouselComponent from "./CarouselComponent";
import RegisterBarComponent from "./RegisterBarComponent";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import UserDTO from "../../models/UserDTO";

interface IProps {
  userInfo: UserDTO | undefined;
}

interface IState {}

class StartPageComponent extends Component<IProps, IState> {
  render() {
    if (this.props.userInfo !== undefined && this.props.userInfo.isAuthenticated) {
      return (
        <div className="start-page-container">
          <CarouselComponent />
        </div>
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
