import React from "react";
import HabitCard from "./HabitCard";
import "../assets/scss/GoalListStyle.scss";

const habitsList = [
  { title: "Read 30 minutes", repetitionType: "DAILY" },
  { title: "Visit Paris", repetitionType: "WEEKLY" },
  { title: "Drink beer", repetitionType: "DAILY" },
  { title: "Sleep 7-8 hours a night", repetitionType: "DAILY" },
  { title: "Swim", repetitionType: "WEEKLY" },
  { title: "Eat cake", repetitionType: "WEEKLY" },
  { title: "Walk at least 30 minutes a day", repetitionType: "DAILY" },
  { title: "Do general cleaning", repetitionType: "WEEKLY" },
  { title: "Eat fast-food", repetitionType: "DAILY" },
  { title: "Pay bills", repetitionType: "WEEKLY" },
];

class HabitList extends React.Component {
  render() {
    return (
      <div className="list">
        {habitsList.map(function(habit, index) {
          return (
            <div>
              <HabitCard habit={habit} />
            </div>
          );
        })}
      </div>
    );
  }

  handleClick(e: any) {}
}

export default HabitList;
