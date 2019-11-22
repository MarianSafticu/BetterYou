import React from "react";
import {
  lighten,
  makeStyles,
  createStyles,
  withStyles,
  Theme
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const rgbList = ["", "", "", "", "", "", "", "", "", ""];

class ProgressBar extends React.Component<
  {},
  { progress: number; color: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      progress: 0,
      color: "#E53400"
    };
  }

  render() {
    const style = {
      progress: this.state.progress + "%"
    };

    return (
      <div
        className="wrapper"
        onClick={e => {
          this.handleClick(e);
        }}
      >
        {"Score: " + this.state.score} <br />
        {this.state.progress + "%"}
        <div className="bar" style={style} />
      </div>
    );
  }

  handleClick(e) {
    this.setState(state => {
      if (state.progress + 10 === 100) {
        return { progress: 0, score: state.score + 1 };
      }
      return { progress: state.progress + 10 };
    });
  }
}
