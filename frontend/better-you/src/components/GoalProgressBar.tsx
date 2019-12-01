import React from "react";
import "../assets/scss/GoalListStyle.scss";

interface IProps {
  currentProgress: number;
  progressToReach: number;
}

class ProgressBar extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const style = {
      width:
        (this.props.currentProgress * 100) / this.props.progressToReach + "%"
    };

    return (
      <div className="wrapper">
        <div className="bar" style={style}>
          <div className="progress">
            {this.props.currentProgress}/{this.props.progressToReach}
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
