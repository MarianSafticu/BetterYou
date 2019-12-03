import React, { Component } from "react";
import MenuProfilePicture from "./MenuProfilePicture";
interface TestPageComponentProps {}

interface TestPageComponentState {}


export default class TestPageComponent extends Component<
  TestPageComponentProps,
  TestPageComponentState
> {
  render() {
    return (
      <div>
        <MenuProfilePicture image={"https://scontent.fclj2-1.fna.fbcdn.net/v/t1.0-9/p960x960/65599347_2311883428903442_7016303985434820608_o.jpg?_nc_cat=104&_nc_ohc=9QKSRuuC0JIAQmAZfqU_L5Q2YSH2OvRoeW2h4wjL3neS-TF16WVPQQTOg&_nc_ht=scontent.fclj2-1.fna&oh=25407343b7baa23c5f5edf00b274d1fc&oe=5E42CD00"}/>
      </div>

    );
  }
}
