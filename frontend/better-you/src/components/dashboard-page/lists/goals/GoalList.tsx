import React from "react";
import GoalCard from "./GoalCard";
import Goal from "../../../../models/Goal";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import { goalCategorys } from "../../../../models/GoalCategorys";
import GoalCardReadOnly from "./GoalCardReadOnly";
import { fetchGoalsBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import AppState from "../../../../redux/store/store";

const goalsList: Goal[] = [
  {
    id: 1,
    title: "Citeste 10 carti",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    currentProgress: 10,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0],
    isPublic: true
  },
  {
    id: 2,
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
    id: 3,
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

interface IProps {
  goals: Goal[];
  fetchGoals: Function;
  isReadOnly?: boolean | null;
}

class GoalList extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      goals: goalsList
    }
  }

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
