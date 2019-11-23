import React from "react";
import GoalCard from "./GoalCard";
import "../assets/scss/GoalListStyle.scss";

const goalsList = [
  { title: "Citeste 10 carti", description: "aaa", progress: 20, step: 10 },
  {
    title: "CIteste 3 carti",
    description: "bbb",
    progress: 100,
    step: 34
  },
  { title: "Citeste 100 de carti", description: "ccc", progress: 70, step: 1 },
  { title: "Citeste 5 carti", description: "ddd", progress: 40, step: 20 },
  { title: "E", description: "ddd", progress: 60, step: 10 },
  { title: "Citeste 2 carti", description: "ddd", progress: 50, step: 50 },
  { title: "Citeste o carte", description: "ddd", progress: 0, step: 100 },
  { title: "H", description: "ddd", progress: 30, step: 10 }
];

class GoalList extends React.Component {
  render() {
    return (
      <div className="list">
        {goalsList.map(function(goal, index) {
          return (
            <div>
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
