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
  "#1AA200",
  "#1AA200"
];

interface IProps {
  progress: number;
  step: number;
}

interface IState {
  progress: number;
  color: string;
}

class ProgressBar extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      progress: this.props.progress,
      color: rgbList[this.props.progress / 10 - 1]
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
      if (state.progress + this.props.step >= 100 + this.props.step) {
        return { progress: 0, color: "#C70900" };
      } else if (state.progress + this.props.step > 100) {
        return { progress: 100, color: "#1AA200" };
      }
      return {
        progress: state.progress + this.props.step,
        color: rgbList[parseInt((state.progress + this.props.step) / 10 + "")]
      };
    });
  }
}

export default ProgressBar;
