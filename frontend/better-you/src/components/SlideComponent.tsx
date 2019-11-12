import React, { Component } from "react";
import "../assets/scss/CarouselStyle.scss";

interface SlideComponentProps {
    index: number;
}

interface SlideComponentState {}

export default class SlideComponent extends Component<SlideComponentProps, SlideComponentState> {
  render() {
    return (
      <div className="slide">
        <div className="image">
          <img
            className="image-content"
            src={"../assets/photos/img" + this.props.index + ".png"} 
            alt={"to be implemented"}
          />
        </div>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    );
  }
}
