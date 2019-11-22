import React from "react";
import GoalCard from "./GoalCard";

const goal1 = <GoalCard></GoalCard>;

class GoalList extends React.Component<
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

    return <div>{goal1}</div>;
  }

  handleClick(e: any) {}
}

export default GoalList;
