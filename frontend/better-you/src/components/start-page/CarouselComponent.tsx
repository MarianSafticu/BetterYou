import React, { Component } from "react";
import "../../assets/scss/start-page/CarouselStyle.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SlideComponent from "./SlideComponent";
import { Breakpoint } from "react-socks";

export default class CarouselComponent extends Component {
  render() {
    const slidesForDesktop = [];
    for (let i = 0; i < 10; i += 2) {
      slidesForDesktop.push(<SlideComponent key={i} index={i} />);
    }

    const slidesForMobile = [];
    for (let i = 0; i < 10; i++) {
      slidesForMobile.push(<SlideComponent key={i} index={i} />);
    }

    return (
      <div className="carousel-container">
        <Breakpoint medium up className="carousel-breakpoint">
          <Slider
            className="slider"
            lazyLoad={"ondemand"}
            dots={true}
            fade={true}
            autoplay={true}
            infinite={true}
            autoplaySpeed={4000}
            centerMode={true}
            centerPadding={"150px"}
            pauseOnHover={true}
          >
            {slidesForDesktop}
          </Slider>
        </Breakpoint>
        <Breakpoint small down className="carousel-breakpoint">
          <Slider
            className="slider"
            lazyLoad={"ondemand"}
            dots={true}
            fade={true}
            infinite={true}
            centerMode={true}
            centerPadding={"50px"}
          >
            {slidesForMobile}
          </Slider>
        </Breakpoint>
      </div>
    );
  }
}
