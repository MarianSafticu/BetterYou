import React from "react";
import GoalCard from "./GoalCard";
import "../assets/scss/GoalListStyle.scss";

const goalsList = [
  <GoalCard />,
  <GoalCard />,
  <GoalCard />,
  <GoalCard />,
  <GoalCard />,
  <GoalCard />,
  <GoalCard />,
  <GoalCard />,
  <GoalCard />,
  <GoalCard />
];

class GoalList extends React.Component {
  render() {
    return (
      <div className="list">
        {goalsList.map(function(goal, index) {
          return <div>{goal}</div>;
        })}
      </div>
    );
  }

  handleClick(e: any) {}
}

export default GoalList;
