import React, { Component } from "react";
import "../../assets/scss/start-page/StartPageStyle.scss";
import CarouselComponent from "./CarouselComponent";
import RegisterBarComponent from "./RegisterBarComponent";

interface IProps {}

interface IState {}

export class StartPageComponent extends Component<IProps, IState> {
  render() {
    return (
      <div className="start-page-container">
        <CarouselComponent />
        <RegisterBarComponent />
      </div>
    );
  }
}
