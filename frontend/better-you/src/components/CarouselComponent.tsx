import React, { Component } from "react";
import "../assets/scss/CarouselStyle.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SlideComponent from "./SlideComponent";

export default class CarouselComponent extends Component {
  render() {
    const slides = [];
    for (let i = 0; i < 5; i++) {
      slides.push(
        // <div className="slide-container">
          <SlideComponent index={i} />
        // </div>
      );
    }

    return (
      <div className="carousel-container">
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
          {slides}
        </Slider>
      </div>
    );
  }
}
