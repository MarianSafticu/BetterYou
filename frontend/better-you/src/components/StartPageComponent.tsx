import React, { Component } from "react";
import "../assets/scss/StartPageStyle.scss";
import AppBarComponent from "./AppBarComponent";
import CarouselComponent from "./CarouselComponent";
import RegisterBarComponent from "./RegisterBarComponent";

interface StartPageComponentProps {
}

interface StartPageComponentState {
}

export class StartPageComponent extends Component<StartPageComponentProps, StartPageComponentState> {
    render() {
        return (
            <div className="start-page-container">
                <AppBarComponent/>
                <CarouselComponent/>
                <RegisterBarComponent/>
            </div>
        );
    }
}