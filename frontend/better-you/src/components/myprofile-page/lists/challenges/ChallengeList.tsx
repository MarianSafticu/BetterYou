import React from "react";
import Friend from "../../../../models/Friend";
import { fetchFriendsBegin, fetchChallengesBegin } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import AppState from "../../../../redux/store/store";
import { NavLink } from "react-router-dom";
import ChallengeCard from "./ChallengeCard";
import ChallengeDTO from "../../../../models/ChallengeDTO";
import { List, ListItem } from "@material-ui/core";


interface IProps {
    challenges: ChallengeDTO[];
    fetchChallenges: Function;
}

class ChallengeList extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            friendsList: []
        }
    }

    componentDidMount() {
        if (this.props.challenges.length === 0)
            this.props.fetchChallenges();
    }


    render() {
        return (
            <div>
                <List>
                {
                    this.props.challenges.map((challenges, i) => {
                        return (
                            <ListItem key={i}>
                                <ChallengeCard image="" challenge={challenges}/>
                            </ListItem>
                        )
                    })
                }
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        challenges: state.challenges
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchChallenges: () => dispatch(fetchChallengesBegin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList)