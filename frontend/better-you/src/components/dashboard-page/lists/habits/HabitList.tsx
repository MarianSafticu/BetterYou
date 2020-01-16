import React from "react";
import HabitCard from "./HabitCard";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import Habit from "../../../../models/Habit";
import { connect } from "react-redux";
import AppState from "../../../../redux/store/store";
import { fetchHabitsBegin } from "../../../../redux/actions/actions";

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
