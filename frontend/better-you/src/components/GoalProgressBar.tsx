import React from "react";
import "../assets/scss/GoalListStyle.scss";

const rgbList = [
  "#C70900",
  "#B31A00",
  "#BF5400",
  "#BB7800",
  "#B79A00",
  "#ABB200",
  "#84AF00",
  "#5FAB00",
  "#3BA700",
  "#1AA200"
];

class ProgressBar extends React.Component<
  {},
  { progress: number; color: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      progress: 0,
      color: "#C70900"
    };
  }

  render() {
    const style = {
      width: this.state.progress + "%",
      background: this.state.color
    };

    return (
      <div
        className="wrapper"
        onClick={e => {
          this.handleClick();
        }}
      >
        <div className="bar" style={style}>
          <div id="label">{this.state.progress}%</div>
        </div>
      </div>
    );
  }

  handleClick() {
    this.setState(state => {
      console.log(this.state.color);
      if (state.progress + 10 > 100) {
        return { progress: 0, color: "#C70900" };
      }
      return {
        progress: state.progress + 10,
        color: rgbList[state.progress / 10]
      };
    });
  }
}

export default ProgressBar;
