import React from "react";
import GoalCard from "./GoalCard";
import Goal from "../../../../models/Goal";
import "../../../../assets/scss/dashboard-page/GoalListStyle.scss";
import { goalCategorys } from "../../../../models/GoalCategorys";

const goalsList: Goal[] = [
  {
    id: 1,
    title: "Citeste 10 carti",
    description: "aaa",
    currentProgress: 10,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  },
  {
    id: 2,
    title: "Citeste 11 carti",
    description: "bbb",
    currentProgress: 15,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  },
  {
    id: 3,
    title: "Citeste 12 carti",
    description: "ccc",
    currentProgress: 66,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  },
  {
    id: 4,
    title: "Citeste 13 carti",
    description: "ddd",
    currentProgress: 99,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  },
  {
    id: 5,
    title: "Citeste 14 carti",
    description: "eee",
    currentProgress: 100,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  },
  {
    id: 6,
    title: "Citeste 15 carti",
    description: "fff",
    currentProgress: 50,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  },
  {
    id: 7,
    title: "Citeste 16 carti",
    description: "ggg",
    currentProgress: 24,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  },
  {
    id: 8,
    title: "Citeste 17 carti",
    description: "hhh",
    currentProgress: 24,
    progressToReach: 100,
    endDate: new Date(),
    startDate: new Date(),
    category: goalCategorys[0]
  }
];


interface IProps {
  isReadOnly?: boolean | null
}
interface IState {
  goals: Goal[]
}

class GoalList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      goals: goalsList
    }
  }

  markGoalAsComplete = (goal: Goal) => {
    console.log(goal)
    var list = this.state.goals;
    list = list.filter(x => x.id !== goal.id)
    this.setState({goals: list})
  }

  render() {
    return (
      <div className="container">
        {this.state.goals.map((goal, index) => 
              <div key={index}>
                <GoalCard goal={goal} isReadOnly={this.props.isReadOnly} markGoalAsCompleate={this.markGoalAsComplete}/>
              </div>
            )
        }
      </div>
    );
  }

  handleClick(e: any) { }
}

export default GoalList;
