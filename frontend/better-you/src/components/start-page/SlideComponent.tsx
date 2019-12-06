import React, { Component } from "react";
import "../assets/scss/CarouselStyle.scss";
import { Breakpoint } from "react-socks";

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
        <Breakpoint medium up className="slide-breakpoint">
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
              {this.props.index} consequat.
            </p>
          </div>
        </Breakpoint>

        <Breakpoint small down>
          {this.props.index % 2 === 0 ? (
            <div className="image">
              <img
                className="image-content"
                src={"../assets/photos/img" + this.props.index + ".png"}
                alt={"to be implemented"}
              />
            </div>
          ) : (
            <div className="content">
              <p>
                Lorem {this.props.index} ipsum {this.props.index} dolor sit
                amet, consectetur adipiscing {this.props.index} elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                {this.props.index} Ut enim ad {this.props.index} minim veniam,{" "}
                {this.props.index} quis nostrud exercitation {this.props.index}
                ullamco laboris nisi ut {this.props.index} aliquip ex ea commodo{" "}
                {this.props.index} consequat.
              </p>
            </div>
          )}
        </Breakpoint>
      </div>
    );
  }
}
