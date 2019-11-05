import React, { Component } from "react";
import "../assets/scss/CarouselStyle.scss";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export default class CarouselComponent extends Component {
  render() {
    return (
      <CarouselProvider
        className="carousel-container"
        naturalSlideHeight={50}
        naturalSlideWidth={50}
        totalSlides={5}
        isPlaying={true}
        interval={2000}
        step={1}
        playDirection={"forward"}
        orientation={"vertical"}
      >
        <Slider className="carousel-slider">
          <Slide index={0}>
            I am the first Slide.
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Slide>
          <Slide index={1}>
            I am the second Slide. <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Slide>
          <Slide index={2}>
            I am the third Slide. <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Slide>
          <Slide index={3}>
            I am the fourth Slide. <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Slide>
          <Slide index={4}>
            I am the fifth Slide. <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}
