import React from "react";
import GoalCard from "./GoalCard";
import "../assets/scss/GoalListStyle.scss";

const goalsList = [
  {
    title: "Citeste 10 carti",
    description: "aaa",
    currentProgress: 2,
    progressToReach: 10
  },
  {
    title: "Citeste 3 carti",
    description: "bbb",
    currentProgress: 3,
    progressToReach: 3
  },
  {
    title: "Citeste 100 de carti",
    description: "ccc",
    currentProgress: 70,
    progressToReach: 100
  },
  {
    title: "Citeste 5 carti",
    description: "ddd",
    currentProgress: 4,
    progressToReach: 5
  },
  { title: "E", description: "ddd", currentProgress: 60, progressToReach: 100 },
  {
    title: "Citeste 2 carti",
    description: "ddd",
    currentProgress: 1,
    progressToReach: 2
  },
  {
    title: "Citeste o carte",
    description: "ddd",
    currentProgress: 0,
    progressToReach: 1
  },
  { title: "H", description: "ddd", currentProgress: 30, progressToReach: 100 },
  {
    title: "Citeste 10 carti",
    description: "aaa",
    currentProgress: 2,
    progressToReach: 10
  },
  {
    title: "Citeste 3 carti",
    description: "bbb",
    currentProgress: 3,
    progressToReach: 3
  },
  {
    title: "Citeste 100 de carti",
    description: "ccc",
    currentProgress: 70,
    progressToReach: 100
  },
  {
    title: "Citeste 5 carti",
    description: "ddd",
    currentProgress: 4,
    progressToReach: 5
  },
  { title: "E", description: "ddd", currentProgress: 60, progressToReach: 100 },
  {
    title: "Citeste 2 carti",
    description: "ddd",
    currentProgress: 1,
    progressToReach: 2
  },
  {
    title: "Citeste o carte",
    description: "ddd",
    currentProgress: 0,
    progressToReach: 1
  },
  { title: "H", description: "ddd", currentProgress: 30, progressToReach: 100 }
];

class GoalList extends React.Component {
  render() {
    return (
      <div className="container">
        {goalsList.map(function(goal, index) {
          return (
            <div key={index}>
              <GoalCard goal={goal} />
            </div>
          );
        })}
      </div>
    );
  }

  handleClick(e: any) {}
}

export default GoalList;
