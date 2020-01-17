import IHttpService from "../../services/interfaces/IHttpService";
import HttpService from "../../services/HttpService";
import { AppActionType } from "../../redux/actions/types";
import { call, put } from "@redux-saga/core/effects";
import {
  setCurrentUserSuccess,
  setCurrentUserError,
  setCurrentUserInformationSuccess,
  setCurrentUserInformationError,
  registerUserSuccess,
  registerUserError,
  confirmAccountSuccess,
  confirmAccountError,
  addGoalSuccess,
  addGoalError,
  fetchGoalsError,
  fetchGoalsSuccess,
  fetchHabitsSuccess,
  addHabitSuccess,
  addHabitError,
  fetchHabitsError,
  setCurrentUserInformationBegin
} from "../actions/actions";
import { setCookie } from "../../services/CookieService";
import UserDTO from "../../models/UserDTO";
import Goal from "../../models/Goal";
import LoginRequest from "../../models/requests/LoginRequest";
import RegisterRequest from "../../models/requests/RegisterRequest";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import FetchGoalResponse from "../../models/responses/FetchGoalResponse";
import FetchHabitResponse from "../../models/responses/FetchHabitResponse";
import Habit from "../../models/Habit";
import { Repetition } from "../../models/Repetition";
import AddHabitRequest from "../../models/requests/AddHabitRequest";
import { goalCategorys } from "../../models/GoalCategorys";
import UserInfoDTO from "../../models/UserInfoDTO";


const httpService: IHttpService = HttpService.getInstance();


export function* loginUserHandler(action: AppActionType): IterableIterator<any> {
  let user: LoginRequest = action.payload as LoginRequest;
  const response = yield call(httpService.loginUser, user);
  if (response) {
    const { token, massage } = response;
    if (token) {
      setCookie("token", token);
      let authenticatedUser: UserDTO = {
        username: "",
        profilePicture: "../assets/photos/profile-picture-test.jpg",
        isAuthenticated: true
      };
      const response = yield call(httpService.getUserInformation);
      if(response){
        const {userInfo, massage} = response;
        const userInfoCookie: UserInfoDTO = userInfo;
        if(userInfo && userInfoCookie.profile_name !== undefined){
          setCookie("userInfo", userInfoCookie.profile_name);
          yield put(setCurrentUserInformationSuccess(userInfo));}
        if(massage)
          yield put(setCurrentUserInformationError(massage))
      }
      yield put(setCurrentUserSuccess(authenticatedUser));
    } else if (massage) {
      yield put(setCurrentUserError(massage));
    }
  }
}


export function* registerUserHandler(action: AppActionType): IterableIterator<any> {
  let user: RegisterRequest = action.payload as RegisterRequest;
  const response = yield call(httpService.registerUser, user);
  if (response) {
    const { token, massage } = response;
    if (token) yield put(registerUserSuccess());
    else if (massage) yield put(registerUserError(massage));
  }
}


export function* confirmAccountHandler(action: AppActionType): IterableIterator<any> {
  let code: string = action.payload as string;
  const response = yield call(httpService.confirmAccount, code);
  if (response) {
    const { aBoolean , massage } = response;
    if (aBoolean) yield put(confirmAccountSuccess(aBoolean));
    else if (massage) yield put(confirmAccountError(massage));
  }
}

export function* getUserInformationHandler(action:AppActionType):IterableIterator<any>{
  const response = yield call(httpService.getUserInformation);
  if(response){
    const {userInfo, massage} = response;
    if(userInfo){
      yield put(setCurrentUserInformationSuccess(userInfo));}
    if(massage)
      yield put(setCurrentUserInformationError(massage))
  }
}

export function* fetchGoalsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchGoals);
  if (response) {
    const { userGoals, massage } = response;
    if (userGoals) {
      let goals: FetchGoalResponse[] = userGoals
      let goalsDTO: Goal[] = []
      goals.map((goal: FetchGoalResponse) => {
        let goalDTO: Goal = {
          id: goal.id,
          title: goal.goal.title,
          description: goal.goal.description,
          startDate: new Date(goal.startDate),
          endDate: new Date(goal.endDate),
          currentProgress: goal.currentProgress,
          progressToReach: goal.goal.progressToReach,
          isPublic: goal.public,
          category: { category: goal.goal.category, color: "#e9eff2"}
        }
        goalsDTO.push(goalDTO);
      });
      yield put(fetchGoalsSuccess(goalsDTO));
    }
    if (massage) yield put(fetchGoalsError(massage))
  }
}


export function* addGoalHandler(action: AppActionType): IterableIterator<any> {
  let goal: AddGoalRequest = action.payload as AddGoalRequest;
  const response = yield call(httpService.addGoal, goal);
  if(response) {
    const {id, massage} = response;
    if(id) {
      let goalComplete: Goal = {
        id: id,
        title: goal.goal.title,
        description: goal.goal.description,
        startDate: new Date(),
        endDate: new Date(goal.endDate),
        currentProgress: 0,
        progressToReach: goal.goal.progressToReach,
        isPublic: goal.public,
        category: (<any>goalCategorys)[goal.goal.category]
      }
      yield put(addGoalSuccess(goalComplete))
    }
    else if(massage) yield put(addGoalError(massage))
  }
}


export function* editGoalHandler(action: AppActionType): IterableIterator<any> {

}


export function* deleteGoalHandler(action: AppActionType): IterableIterator<any> {

}


export function* fetchHabitsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchHabits);
  if (response) {
    const { habits, massage } = response;
    if (habits) {
      let respHabits: FetchHabitResponse[] = habits
      let habitsDTO: Habit[] = []
      respHabits.map((habit: FetchHabitResponse) => {
        let habitDTO: Habit = {
          id: habit.id,
          title: habit.title,
          description: habit.description,
          startDate: new Date(habit.startDate),
          repetitionType: (<any>Repetition)[habit.repetitionType],
          category: (<any>goalCategorys)[habit.category],
          dates: habit.dates.map(date => new Date(date))
        }
        habitsDTO.push(habitDTO);
      });
      yield put(fetchHabitsSuccess(habitsDTO));
    }
    if (massage) yield put(fetchHabitsError(massage))
  }
}


export function* addHabitHandler(action: AppActionType): IterableIterator<any> {
  let habit: AddHabitRequest = action.payload as AddHabitRequest;
  const response = yield call(httpService.addHabit, habit);
  if(response) {
    const {id, massage} = response;
    if(id) {
      let habitComplete: Habit = {
        id: id,
        title: habit.habit.title,
        description: habit.habit.description,
        startDate: new Date(),
        repetitionType: (<any>Repetition)[habit.habit.repetitionType],
        category: (<any>goalCategorys)[habit.habit.category],
        dates: habit.habit.dates.map(date => new Date(date))
      }
      yield put(addHabitSuccess(habitComplete))
    }
    else if(massage) yield put(addHabitError(massage))
  }
}


export function* editHabitHandler(action: AppActionType): IterableIterator<any> {

}


export function* deleteHabitHandler(action: AppActionType): IterableIterator<any> {
  
}