import React, { Component } from "react";
import "../../assets/scss/about-page/AboutPageStyle.scss";

export default class AboutPageComponent extends Component {
  render() {
    return (
      <div className="about-page-container">
        <h2 className="page-title">Transforming the way people work so they can achieve their greatest ambitions</h2>
        <div className="page-content">
          At Better You, we all come to work every day because we want to solve one of
        the biggest problem in human motivation. <b className="bigger-text">Achieving your goals</b>. People don't know what they want nor how to
        achieve what they want. Every motivational speaker, blog or even friends only say to set some goals, achieve
        them and feel better about yourself. But nobody reveals the most important aspect: <b className="bigger-text">HOW ?</b>
        </div>
        <br></br><br></br>
        <div className="page-text">
          We come with the answer! Use our platform to track your goals and achieve the undoable. Add goals, challenge and
          get challenged by your friends, develop great habits and discover the better <b className="bigger-text">YOU</b>.
        </div>
      </div>
    );
  }
}
