import React from "react";
import DefaultGoalCard from "./DefaultGoalCard";
import Goal from "../../models/Goal";
import "../../assets/scss/dashboard-page/GoalListStyle.scss";
import "../../assets/scss/dashboard-page/DashboardPageStyle.scss";
import { fetchDefaultGoalsBegin } from "../../redux/actions/actions";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import AddCircleIcon from '@material-ui/icons/AddCircle';


interface IProps {
  goals: Goal[];
  fetchDefaultGoals: Function;
}

class DefaultGoals  extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.fetchDefaultGoals();
  }

  onRandomGoalsHandler = () => {
    this.props.fetchDefaultGoals();
  };

  render() {
    return (
      <div className="container">
        <div className="default_list_component">
        <AddCircleIcon className="generate_button" fontSize="large" onClick={this.onRandomGoalsHandler}></AddCircleIcon>
        {this.props.goals.map((goal, index) => 
              <div key={index}>
                <DefaultGoalCard goal={goal}/>
              </div>
            )
        }
        </div>
      </div>
    );
  }

  handleClick(e: any) { }
}

const mapStateToProps = (state: AppState) => {
  return {
    goals: state.defaultGoals
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchDefaultGoals: () => dispatch(fetchDefaultGoalsBegin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultGoals);
