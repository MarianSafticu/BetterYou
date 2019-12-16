import React, { Component } from "react";
import "../../assets/scss/start-page/StartPageStyle.scss";
import LoadingComponent from "../generic/LoadingComponent";
import Loadable from 'react-loadable';
import { Button } from "@material-ui/core";

const TestComp = Loadable({
  loader: () => import("../test-pages/TestComp"),
  loading: LoadingComponent,
  delay: 0,
  timeout: 60000
});

interface TestPageComponentProps {}

interface TestPageComponentState {
  click: boolean
}

export default class TestLoading extends Component<
  TestPageComponentProps,
  TestPageComponentState
  > {
  constructor(props: TestPageComponentProps){
    super(props)
    this.state = { click: false}
  }

  showTestComp = () => {
    this.setState({
      click: true
    });
  }
  
  render() {
    return (
        <div className="start-page-container">   
        <Button onClick={this.showTestComp}>
            Start loading
        </Button>
        {this.state.click && <TestComp/>}
        </div>
    );
  }
  
}
