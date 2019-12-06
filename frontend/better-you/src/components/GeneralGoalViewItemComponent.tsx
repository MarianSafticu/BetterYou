import React, { Component, ChangeEvent } from "react";
import "../assets/scss/GeneralGoalViewStyle.scss"
import { Button, TextField, Fab } from "@material-ui/core";
import { Goal } from "../models/Goal";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Close from '@material-ui/icons/Close';
import Service from "../services/Service";
import { GoalException } from "../exceptions/GoalException";

interface IProps {
    onFinnishAction: Function,
    goal?: Goal
}

interface IStatus {
    goal: Goal,
    edditingIsDisabled: boolean,
    isForNewGoal: boolean,
    onSaveHandle: Function,
    goalError: GoalException,
    textFieldVariant: "filled" | "outlined" 
}

export default class GeneralGoalViewItemComponent extends Component<IProps, IStatus>{
    service: Service;
    initialGoal: Goal = {
        title: "",
        description: "",
        currentProgress: 0,
        progressToReach: 1,
        startDate: new Date(),
        endDate: new Date(),
        category: ""
    };
    constructor(props: IProps) {
        super(props);
        this.service = Service.getInstance();

        var goal: Goal = {
            title: "",
            description: "",
            currentProgress: 0,
            progressToReach: 1,
            startDate: new Date(),
            endDate: new Date(),
            category: ""
        };

        var err: GoalException = {
            titleError: "",
            descriptionError: "",
            startDateError: "",
            endDateError: "",
            currentProgressError: "",
            progressToReachError: "",
            categoryError: ""
        }

        if (props.goal !== null && props.goal !== undefined) {
            this.initialGoal = {
                title: props.goal.title,
                description: props.goal.description,
                currentProgress: props.goal.currentProgress,
                progressToReach: props.goal.progressToReach,
                startDate: props.goal.startDate,
                endDate: props.goal.endDate,
                category: props.goal.category
            };
            this.state = {
                goal: props.goal,
                edditingIsDisabled: true,
                isForNewGoal: false,
                onSaveHandle: this.onSaveChanges,
                goalError: err,
                textFieldVariant: "filled"
            };
        }
        else {
            this.state = {
                goal: goal,
                edditingIsDisabled: false,
                isForNewGoal: true,
                onSaveHandle: this.onSaveAdd,
                goalError: err,
                textFieldVariant: "outlined"
            };
        }

    }

    verifyGoal = (goal: Goal) => {
        var err = this.service.validateGoal(goal);
        this.setState({
            goalError: err
        });

        console.log(err);

        if (
            err.categoryError.length != 0 ||
            err.currentProgressError.length != 0 ||
            err.descriptionError.length != 0 ||
            err.endDateError.length != 0 ||
            err.progressToReachError.length != 0 ||
            err.startDateError.length != 0 ||
            err.titleError.length != 0
        )
            return false;

        return true;
    }

    getStringFromData = (data: Date) => {
        var str = data.toLocaleDateString()
        var strs = str.split("/", 3)

        if(strs.length < 3){
            data = new Date();
            str = data.toLocaleDateString()
            strs = str.split("/", 3)
        }

        if (strs[0].length == 1)
            strs[0] = "0" + strs[0];
        if (strs[1].length == 1)
            strs[1] = "0" + strs[1];

        var strss: string = strs[2] + "-" + strs[0] + "-" + strs[1];
        return strss;
    }


    onSaveChanges = () => {
        console.log("SE SALVEAZA SCHIMBARILE");
        console.log(this.state.goal);
        if(this.verifyGoal(this.state.goal))
            this.props.onFinnishAction();
    }
    onSaveAdd = () => {
        console.log("SE ADAUGA GOALUL");
        console.log(this.state.goal);
        if(this.verifyGoal(this.state.goal))
            this.props.onFinnishAction();
    }
    onDeletehandler = () => {

    }
    onModifyHandler = () => {
        this.setState({
            goal: this.state.goal,
            edditingIsDisabled: !this.state.edditingIsDisabled,
            textFieldVariant: (this.state.edditingIsDisabled) ? "outlined" : "filled"
        });
    }
    onCancelHangler = () => {
        this.state.goal.title = this.initialGoal.title;
        this.state.goal.description = this.initialGoal.description;
        this.state.goal.category = this.initialGoal.category;
        this.state.goal.currentProgress = this.initialGoal.currentProgress;
        this.state.goal.endDate = this.initialGoal.endDate;
        this.state.goal.progressToReach = this.initialGoal.progressToReach;
        this.state.goal.startDate = this.initialGoal.startDate;
        this.props.onFinnishAction();
    }


    onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        if(this.state.edditingIsDisabled){
            event.target.value = this.state.goal.title;
            return;
        }
        const goal: Goal = this.state.goal;
        goal.title = event.target.value;

        var err = this.service.validateGoal(goal).titleError;
        var error = this.state.goalError;
        error.titleError = err;
        this.setState({
            goalError: error
        })


        this.setState({
            goal: goal
        });
    }

    onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        if(this.state.edditingIsDisabled){
            event.target.value = this.state.goal.description;
            return;
        }
        const goal: Goal = this.state.goal;
        goal.description = event.target.value;

        var err = this.service.validateGoal(goal).descriptionError;
        var error = this.state.goalError;
        error.descriptionError = err;
        this.setState({
            goalError: error
        })

        this.setState({
            goal: goal
        });
    }
    onChangeDateStart = (event: ChangeEvent<HTMLInputElement>) => {
        if(this.state.edditingIsDisabled || event.target.value.length == 0){
            event.target.value = this.state.goal.startDate.toLocaleDateString();
            return;
        }
        const goal: Goal = this.state.goal;
        goal.startDate = new Date(Date.parse(event.target.value) + 86400000);

        console.log(event.target.value);
        console.log(goal.startDate);
        console.log(goal);

        var err = this.service.validateGoal(goal).startDateError;
        var error = this.state.goalError;
        error.startDateError = err;
        this.setState({
            goalError: error
        })  
        this.setState({
            goal: goal
        });
    }
    onChangeDateEnd = (event: ChangeEvent<HTMLInputElement>) => {
        if(this.state.edditingIsDisabled || event.target.value.length == 0){ 
            event.target.value = this.state.goal.endDate.toLocaleDateString();
            return;
        }
        const goal: Goal = this.state.goal;
        goal.endDate = new Date(Date.parse(event.target.value) + 86400000);

        console.log("MEgA DICKS" + event.target.value);

        var err = this.service.validateGoal(goal).endDateError;
        var error = this.state.goalError;
        error.endDateError = err;
        this.setState({
            goalError: error
        })


        this.setState({
            goal: goal
        });
    }
    onChangeCurentProgress = (event: ChangeEvent<HTMLInputElement>) => {
        if(this.state.edditingIsDisabled){
            event.target.value = this.state.goal.currentProgress.toString();
            return;
        }
        const goal: Goal = this.state.goal;
        goal.currentProgress = parseInt(event.target.value);

        var err = this.service.validateGoal(goal).currentProgressError;
        var error = this.state.goalError;
        error.currentProgressError = err;
        this.setState({
            goalError: error
        })


        this.setState({
            goal: goal
        });
    }
    onChangeProgressToReach = (event: ChangeEvent<HTMLInputElement>) => {
        if(this.state.edditingIsDisabled){
            event.target.value = this.state.goal.progressToReach.toString();
            return;
        }
        const goal: Goal = this.state.goal;
        goal.progressToReach = parseInt(event.target.value);

        var err = this.service.validateGoal(goal).progressToReachError;
        var error = this.state.goalError;
        error.progressToReachError = err;
        this.setState({
            goalError: error
        })


        this.setState({
            goal: goal
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
                    <Fab className="general-goal-button" onClick={() => { this.onCancelHangler(); }} size="small">
                        <Close />
                    </Fab>
                </div>
                <h1>
                    <TextField
                        onChange={this.onChangeTitle}
                        className="general-goal-input"
                        defaultValue={this.state.goal.title}
                        variant={this.state.textFieldVariant as any}
                        label="title"
                        error={this.state.goalError.titleError.length != 0}
                        helperText={this.state.goalError.titleError}
                    >
                    </TextField>
                </h1>
                <br />
                <TextField
                    onChange={this.onChangeDescription}
                    className="general-goal-input"
                    label="description"
                    defaultValue={this.state.goal.description}
                    rowsMax="10"
                    multiline
                    variant={this.state.textFieldVariant as any}
                    error={this.state.goalError.descriptionError.length != 0}
                    helperText={this.state.goalError.descriptionError}>
                </TextField>
                <TextField
                    onChange={this.onChangeDateStart}
                    className="general-goal-input"
                    label="starting date"
                    type={this.state.edditingIsDisabled ? "" : "date"}
                    InputLabelProps={{ shrink: true }}
                    variant={this.state.textFieldVariant as any}
                    defaultValue={this.state.edditingIsDisabled ?
                                        this.state.goal.startDate.toLocaleDateString() : 
                                        this.getStringFromData(this.state.goal.startDate)}
                    error={this.state.goalError.startDateError.length != 0}
                    helperText={this.state.goalError.startDateError}>
                </TextField>
                <TextField
                    onChange={this.onChangeDateEnd}
                    className="general-goal-input"
                    label="ending date"
                    InputLabelProps={{ shrink: true }}
                    type={this.state.edditingIsDisabled ? "" : "date"}
                    variant={this.state.textFieldVariant as any}
                    defaultValue={this.state.edditingIsDisabled ?
                                        this.state.goal.endDate.toLocaleDateString() : 
                                        this.getStringFromData(this.state.goal.endDate)}
                    error={this.state.goalError.endDateError.length != 0}
                    helperText={this.state.goalError.endDateError}>
                </TextField>
                {
                    this.state.isForNewGoal === false
                    &&
                    <TextField
                        onChange={this.onChangeCurentProgress}
                        className="general-goal-input"
                        label="curent progress"
                        type="number"
                        variant={this.state.textFieldVariant as any}
                        InputLabelProps={{ shrink: true }}
                        defaultValue={this.state.goal.currentProgress}
                        error={this.state.goalError.currentProgressError.length != 0}
                        helperText={this.state.goalError.currentProgressError}>
                    </TextField>
                }
                <TextField
                    onChange={this.onChangeProgressToReach}
                    className="general-goal-input"
                    label="progress to reach"
                    type="number"
                    variant={this.state.textFieldVariant as any}    
                    InputLabelProps={{ shrink: true }}
                    defaultValue={this.state.goal.progressToReach}
                    error={this.state.goalError.progressToReachError.length != 0}
                    helperText={this.state.goalError.progressToReachError}>
                </TextField>
                <br />
                <div className="general-goal-button-container">
                    {
                        this.state.isForNewGoal === false
                        &&
                        <Fab size="small" className="general-goal-button" disabled={this.state.edditingIsDisabled} onClick={() => { this.onCancelHangler(); }}>
                            <Cancel />
                        </Fab>
                    }
                    <Fab size="small" className="general-goal-button" disabled={this.state.edditingIsDisabled} onClick={() => { this.state.onSaveHandle(); }}>
                        <Save />
                    </Fab>
                </div>
            </div>
        );
    }
}