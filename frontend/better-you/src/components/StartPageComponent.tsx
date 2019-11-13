import React, { Component } from "react";
import "../assets/scss/StartPageStyle.scss";
import AppBarComponent from "./AppBarComponent";
import CarouselComponent from "./CarouselComponent";
import RegisterBarComponent from "./RegisterBarComponent";
import { Breakpoint } from "react-socks";
import AppBarMobileComponent from "./AppBarMobileComponent";

interface StartPageComponentProps {
}

interface StartPageComponentState {
}

export class StartPageComponent extends Component<StartPageComponentProps, StartPageComponentState> {
    render() {
        return (
            <div className="start-page-container">
                <Breakpoint large up>
                    <AppBarComponent/>
                </Breakpoint>
                <Breakpoint medium down>
                    <AppBarMobileComponent/>
                </Breakpoint>
                <CarouselComponent/>
                <RegisterBarComponent/>
            </div>
        );
    }
}