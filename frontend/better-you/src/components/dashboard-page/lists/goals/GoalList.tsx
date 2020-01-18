import React from "react";
import GoalCard from "./GoalCard";
import Goal from "../../../../models/Goal";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import { goalCategorys } from "../../../../models/GoalCategorys";
import GoalCardReadOnly from "./GoalCardReadOnly";
import { fetchGoalsBegin, fetchFriendGoalsBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import AppState from "../../../../redux/store/store";

const goalsList: Goal[] = [
  {
    id: 1,
    groupId: 4,
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
    groupId: 5,
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
    groupId: 6,
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
  fetchFriendGoals: Function;
  isReadOnly?: boolean | null;
  forUser?: string,
  errorFetch: string
}

class GoalList extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.forUser === undefined)
      this.props.fetchGoals();
    else this.props.fetchFriendGoals(this.props.forUser);
  }

  markGoalAsComplete = (goal: Goal) => {
    //console.log(goal)
    // var list = this.state.goals;
    // list = list.filter(x => x.id !== goal.id)
    // this.setState({goals: list})
  }

  render() {
    return (
      <div className="container">
        {
          this.props.errorFetch.length !== 0
          &&
          <h1 style={{width:"100%", textAlign: "center"}}>
            {this.props.errorFetch}
          </h1>
        }
        {
          this.props.goals.map((goal, index) => {
            if (goal.category === undefined)
              goal.category = goalCategorys[0];

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
        {
          this.props.goals.length === 0 &&  this.props.errorFetch.length === 0
          &&
          <h1 style={{width:"100%", textAlign: "center"}}>
            This user has no goals
          </h1>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    goals: state.goals,
    errorFetch: state.error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchGoals: () => dispatch(fetchGoalsBegin()),
    fetchFriendGoals: (username: string) => dispatch(fetchFriendGoalsBegin(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalList);
