import React, { Component, ChangeEvent } from "react";
import "../assets/scss/GeneralGoalViewStyle.scss"
import { Button, TextField, Fab } from "@material-ui/core";
import { Goal } from "../models/Goal";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Close from '@material-ui/icons/Close';

interface IProps {
    onFinnishAction: Function,
    goal?: Goal
}

interface IStatus {
    goal: Goal,
    edditingIsDisabled: boolean,
    isForNewGoal: boolean,
    onSaveHandle: Function
}

export default class GeneralGoalViewItemComponent extends Component<IProps, IStatus>{
    constructor(props: IProps) {
        super(props);

        var goal: Goal = {
            title: "",
            description: "",
            currentProgress: 0,
            progressToReach: 1,
            startDate: new Date(),
            endDate: new Date(),
            category: ""
        };
        if (props.goal !== null && props.goal !== undefined) {
            this.state = {
                goal: props.goal,
                edditingIsDisabled: true,
                isForNewGoal: false,
                onSaveHandle: this.onSaveChanges
            };
        }
        else {
            this.state = {
                goal: goal,
                edditingIsDisabled: false,
                isForNewGoal: true,
                onSaveHandle: this.onSaveAdd
            };
        }

    }

    onSaveChanges = () => {
        console.log("SE SALVEAZA SCHIMBARILE")
        this.props.onFinnishAction();
    }
    onSaveAdd = () => {
        console.log("SE ADAUGA GOAlUL")
        this.props.onFinnishAction();
    }

    onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const goal: Goal = this.state.goal;
        goal.title = event.target.value;
        this.setState({
            goal: goal,
            edditingIsDisabled: this.state.edditingIsDisabled
        });
    }

    onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        const goal: Goal = this.state.goal;
        goal.description = event.target.value;
        this.setState({
            goal: goal,
            edditingIsDisabled: this.state.edditingIsDisabled
        });
    }
    onChangeDateStart = (event: ChangeEvent<HTMLInputElement>) => {
        const goal: Goal = this.state.goal;
        goal.startDate = new Date(event.target.value);
        this.setState({
            goal: goal,
            edditingIsDisabled: this.state.edditingIsDisabled
        });
    }
    onChangeCurentProgress = (event: ChangeEvent<HTMLInputElement>) => {
        const goal: Goal = this.state.goal;
        goal.currentProgress = parseInt(event.target.value);
        this.setState({
            goal: goal,
            edditingIsDisabled: this.state.edditingIsDisabled
        });
    }
    onChangeProgressToReach = (event: ChangeEvent<HTMLInputElement>) => {
        const goal: Goal = this.state.goal;
        goal.progressToReach = parseInt(event.target.value);
        this.setState({
            goal: goal,
            edditingIsDisabled: this.state.edditingIsDisabled
        });
    }
    onDeletehandler = () => {

    }
    onModifyHandler = () => {
        this.setState({
            goal: this.state.goal,
            edditingIsDisabled: !this.state.edditingIsDisabled,
            isForNewGoal: this.state.isForNewGoal,
            onSaveHandle: this.state.onSaveHandle
        });
    }
    render() {
        return (
            <div className="general-goal-container">
                <div className="general-goal-button-container">
                    {
                        this.state.isForNewGoal === false
                        &&
                        <Fab className="general-goal-button" onClick={this.onDeletehandler} size="small">
                            <Delete />
                        </Fab>
                    }
                    {
                        this.state.isForNewGoal === false
                        &&
                        <Fab className="general-goal-button" onClick={this.onModifyHandler} size="small">
                            <Edit />
                        </Fab>
                    }
                    <Fab className="general-goal-button" onClick={() => { this.props.onFinnishAction(); }} size="small">
                        <Close />
                    </Fab>
                </div>
                <h1>
                    <TextField
                        onChange={this.onChangeTitle}
                        className="general-goal-input"
                        disabled={this.state.edditingIsDisabled}
                        value={this.state.goal.title}>
                    </TextField>
                </h1>
                <br />
                <TextField
                    onChange={this.onChangeDescription}
                    className="general-goal-input"
                    label="description"
                    value={this.state.goal.description}
                    disabled={this.state.edditingIsDisabled}
                    rowsMax="10"
                    multiline>
                </TextField>
                <TextField
                    onChange={this.onChangeDateStart}
                    className="general-goal-input"
                    label="starting date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={this.state.goal.startDate}
                    disabled={this.state.edditingIsDisabled}>
                </TextField>
                <TextField
                    onChange={this.onChangeDateStart}
                    className="general-goal-input"
                    label="ending date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={this.state.goal.endDate}
                    disabled={this.state.edditingIsDisabled}>
                </TextField>
                {
                    this.state.isForNewGoal === false
                    &&
                    <TextField
                        onChange={this.onChangeCurentProgress}
                        className="general-goal-input"
                        label="progress to reach"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        value={this.state.goal.currentProgress}
                        disabled={this.state.edditingIsDisabled}>
                    </TextField>
                }
                <TextField
                    onChange={this.onChangeProgressToReach}
                    className="general-goal-input"
                    label="progress to reach"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={this.state.goal.progressToReach}
                    disabled={this.state.edditingIsDisabled}>
                </TextField>
                <br />
                <div className="general-goal-button-container">
                    <Fab size="small" className="general-goal-button" disabled={this.state.edditingIsDisabled} onClick={() => { this.state.onSaveHandle(); }}>
                        <Save />
                    </Fab>
                    {
                        this.state.isForNewGoal === false
                        &&
                        <Fab size="small" className="general-goal-button" disabled={this.state.edditingIsDisabled} onClick={() => { this.props.onFinnishAction(); }}>
                            <Cancel />
                        </Fab>
                    }
                </div>
            </div>
        );
    }
}