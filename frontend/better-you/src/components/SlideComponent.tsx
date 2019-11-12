import React, { Component } from "react";
import "../assets/scss/CarouselStyle.scss";

interface SlideComponentProps {
  index: number;
}

interface SlideComponentState {}

export default class SlideComponent extends Component<
  SlideComponentProps,
  SlideComponentState
> {
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
            Lorem {this.props.index} ipsum {this.props.index} dolor sit amet,
            consectetur adipiscing {this.props.index} elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.{" "}
            {this.props.index} Ut enim ad {this.props.index} minim veniam,{" "}
            {this.props.index} quis nostrud exercitation {this.props.index}
            ullamco laboris nisi ut {this.props.index} aliquip ex ea commodo{" "}
            {this.props.index} consequat. Duis aute {this.props.index} irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat {this.props.index} nulla pariatur. {this.props.index}{" "}
            Excepteur sint occaecat {this.props.index} cupidatat non proident,
            sunt {this.props.index} in culpa qui officia {this.props.index}{" "}
            deserunt mollit anim id est {this.props.index} laborum.
          </p>
        </div>
      </div>
    );
  }
}
