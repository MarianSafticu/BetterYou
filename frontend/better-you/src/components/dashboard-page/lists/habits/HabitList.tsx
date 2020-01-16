import React from "react";
import HabitCard from "./HabitCard";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Habit from "../../../../models/Habit";
import { Repetition } from "../../../../models/Repetition";
import { goalCategorys } from "../../../../models/GoalCategorys";
import { connect } from "react-redux";
import AppState from "../../../../redux/store/store";
import { fetchHabitsBegin } from "../../../../redux/actions/actions";

var d = new Date();

const datesTest:Date[] = [
  new Date(),
  new Date(d.setDate(d.getDate() - 8)),
  new Date(d.setDate(d.getDate() - 7)),
  new Date(d.setDate(d.getDate() - 6)),
  new Date(d.setDate(d.getDate() - 3)),
  new Date(d.setDate(d.getDate() - 20)),
  new Date(d.setDate(d.getDate() - 1))
];

const habitsList:Habit[] = [
  { 
    title: "Read 30 minutes", 
    description: "Read 30 minutes from a book every day", 
    startDate: new Date(), 
    repetitionType: Repetition.Daily, 
    category: goalCategorys[4], 
    dates: datesTest
  },
  { 
    title: "Visit Paris", 
    description: "Fly to Paris every week and drink coffee", 
    startDate: new Date(), 
    repetitionType: Repetition.Weekly, 
    category: goalCategorys[10], 
    dates: datesTest
  },
  { 
    title: "Drink beer", 
    description: "Be more happy for a day", 
    startDate: new Date(), 
    repetitionType: Repetition.Weekly, 
    category: goalCategorys[0], 
    dates: datesTest
  },
  { 
    title: "Sleep 7-8 hours a night", 
    description: "Get rest", 
    startDate: new Date(), 
    repetitionType: Repetition.Daily, 
    category: goalCategorys[2], 
    dates: datesTest
  },
  { 
    title: "Swim", 
    description: "I cann't live without swimming", 
    startDate: new Date(), 
    repetitionType: Repetition.Weekly, 
    category: goalCategorys[2], 
    dates: datesTest
  },
  { 
    title: "Eat cake", 
    description: "I need cake", 
    startDate: new Date(), 
    repetitionType: Repetition.Weekly, 
    category: goalCategorys[0], 
    dates: datesTest
  },
  { 
    title: "Walk at least 30 minutes a day", 
    description: "I don't want to be lazy", 
    startDate: new Date(), 
    repetitionType: Repetition.Daily, 
    category: goalCategorys[2], 
    dates: datesTest
  },
  { 
    title: "Do general cleaning", 
    description: "I love to clean my house", 
    startDate: new Date(), 
    repetitionType: Repetition.Weekly, 
    category: goalCategorys[0], 
    dates: datesTest
  },
  { 
    title: "Eat fast-food", 
    description: "I like to be fat", 
    startDate: new Date(), 
    repetitionType: Repetition.Daily, 
    category: goalCategorys[0], 
    dates: datesTest
  },
  { title: "Eat vegetables",
    description: "I like to be healthy", 
    startDate: new Date(), 
    repetitionType: Repetition.Weekly, 
    category: goalCategorys[2], 
    dates: datesTest
  },
];

interface IProps {
  habits: Habit[];
  fetchHabits: Function;
}

class HabitList extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.fetchHabits();
  }

  render() {
    return (
      <div className="container">
        {this.props.habits.map(function(habit, index) {
          return (
            <div key={index}>
              <HabitCard habit={habit} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    habits: state.habits
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchHabits: () => dispatch(fetchHabitsBegin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitList);
