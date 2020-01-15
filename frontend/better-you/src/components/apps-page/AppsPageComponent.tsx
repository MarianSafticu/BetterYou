import React, {Component} from "react";
import "../../assets/scss/apps-page/AppsPageStyle.scss";

export default class AppsPageComponent extends Component {
  render() {
    return (
      <div className="apps-page-container">
        <div className="page-content">
          <img
            className="image-content"
            src={"../assets/photos/ui.png"}
            alt={"Web browser logo"}
          />
          <img
            className="image-content"
            src={"../assets/photos/apple.png"}
            alt={"Apple logo"}
          />
          <img
            className="image-content"
            src={"../assets/photos/android.png"}
            alt={"Android logo"}
          />
        </div>
      </div>
    );
  }
}
