import React, { Component } from "react";

interface TestPageComponentProps {}

interface TestPageComponentState {
}

export default class TestComp extends Component<
  TestPageComponentProps,
  TestPageComponentState
  > {

  render() {
    for(let i=0;i<5000000000;i++){
    }
    return (
      <div>
      S-a incarcat pagina
      </div>     
    )
  } 
}
