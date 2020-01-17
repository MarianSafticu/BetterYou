import React from "react";
import GoalCard from "./GoalCard";
import Goal from "../../../../models/Goal";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import GoalCardReadOnly from "./GoalCardReadOnly";
import { fetchGoalsBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import AppState from "../../../../redux/store/store";

interface IProps {
  goals: Goal[];
  fetchGoals: Function;
  isReadOnly?: boolean | null;
}

class GoalList extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.fetchGoals();
  }

  markGoalAsComplete = (goal: Goal) => {
    console.log(goal)
    // var list = this.state.goals;
    // list = list.filter(x => x.id !== goal.id)
    // this.setState({goals: list})
  }

  render() {
    return (
      <div className="container">
        {
          this.props.goals.map((goal, index) => {
            if (this.props.isReadOnly === true)
              return <div key={index}>
                <GoalCardReadOnly goal={goal} />
              </div>
            return <div key={index}>
              <GoalCard goal={goal} />
            </div>
          }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    goals: state.goals
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchGoals: () => dispatch(fetchGoalsBegin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalList);
