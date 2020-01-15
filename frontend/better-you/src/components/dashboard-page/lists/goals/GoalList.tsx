import React from "react";
import GoalCard from "./GoalCard";
import Goal from "../../../../models/Goal";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import { goalCategorys } from "../../../../models/GoalCategorys";

const goalsList: Goal[] = [
  {
    title: "Citeste 10 carti",
    description: "aaa",
    currentProgress: 10,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0],
    isPublic: true
  },
  {
    title: "Citeste 11 carti",
    description: "bbb",
    currentProgress: 15,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0],
    isPublic: false
  },
  {
    title: "Citeste 12 carti",
    description: "ccc",
    currentProgress: 66,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0],
    isPublic: true
  }
  // {
  //   title: "Citeste 13 carti",
  //   description: "ddd",
  //   currentProgress: 99,
  //   progressToReach: 100,
  //   endDate: new Date(),
  //   startDate: new Date(),
  //   category: goalCategorys[0]
  // },
  // {
  //   title: "Citeste 14 carti",
  //   description: "eee",
  //   currentProgress: 100,
  //   progressToReach: 100,
  //   endDate: new Date(),
  //   startDate: new Date(),
  //   category: goalCategorys[0]
  // },
  // {
  //   title: "Citeste 15 carti",
  //   description: "fff",
  //   currentProgress: 50,
  //   progressToReach: 100,
  //   endDate: new Date(),
  //   startDate: new Date(),
  //   category: goalCategorys[0]
  // },
  // {
  //   title: "Citeste 16 carti",
  //   description: "ggg",
  //   currentProgress: 24,
  //   progressToReach: 100,
  //   endDate: new Date(),
  //   startDate: new Date(),
  //   category: goalCategorys[0]
  // },
  // {
  //   title: "Citeste 17 carti",
  //   description: "hhh",
  //   currentProgress: 24,
  //   progressToReach: 100,
  //   endDate: new Date(),
  //   startDate: new Date(),
  //   category: goalCategorys[0]
  // }
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
