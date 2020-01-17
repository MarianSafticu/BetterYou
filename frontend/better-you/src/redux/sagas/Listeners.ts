import IHttpService from "../../services/interfaces/IHttpService";
import HttpService from "../../services/HttpService";
import { AppActionType } from "../../redux/actions/types";
import { call, put } from "@redux-saga/core/effects";
import {
  setCurrentUserSuccess,
  setCurrentUserError,
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
  deleteGoalSuccess,
  deleteGoalError,
  deleteHabitSuccess,
  deleteHabitError,
  fetchFriendsError,
  fetchFriendsSuccess,
  fetchDefaultGoalsError,
  fetchDefaultGoalsSuccess,
} from "../actions/actions";
import { setCookie } from "../../services/CookieService";
import UserDTO from "../../models/UserDTO";
import Goal from "../../models/Goal";
import LoginRequest from "../../models/requests/LoginRequest";
import RegisterRequest from "../../models/requests/RegisterRequest";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import FetchGoalResponse from "../../models/responses/FetchGoalResponse";
import FetchHabitResponse from "../../models/responses/FetchHabitResponse";
import FetchFriendsResponse from "../../models/responses/FetchFriendsResponse";
import Habit from "../../models/Habit";
import { Repetition } from "../../models/Repetition";
import AddHabitRequest from "../../models/requests/AddHabitRequest";
import { goalCategorys } from "../../models/GoalCategorys";
import Friend from "../../models/Friend";
import GoalDTO from "../../models/GoalDTO";

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
        return goalDTO;
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
        category: (goalCategorys as any)[goal.goal.category]
      }
      yield put(addGoalSuccess(goalComplete))
    }
    else if(massage) yield put(addGoalError(massage))
  }
}


export function* editGoalHandler(action: AppActionType): IterableIterator<any> {

}


export function* deleteGoalHandler(action: AppActionType): IterableIterator<any> {
  let id: number = action.payload as number;
  const response = yield call(httpService.deleteGoal, id);
  if(response) {
    const { aBoolean, massage } = response;
    if (aBoolean) yield put(deleteGoalSuccess(id));
    else if (massage) yield put(deleteGoalError(massage))
  }
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
          repetitionType: (Repetition as any)[habit.repetitionType],
          category: (goalCategorys as any)[habit.category],
          dates: habit.dates.map(date => new Date(date))
        }
        habitsDTO.push(habitDTO);
        return habitDTO;
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
        repetitionType: (Repetition as any)[habit.habit.repetitionType],
        category: (goalCategorys as any)[habit.habit.category],
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
  let id: number = action.payload as number;
  const response = yield call(httpService.deleteHabit, id);
  if(response) {
    const { aBoolean, massage } = response;
    if (aBoolean) yield put(deleteHabitSuccess(id));
    else if (massage) yield put(deleteHabitError(massage))
  }
}

export function* fetchFriendsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchFriends);
  if (response) {
    const { friends, massage } = response;
    if (friends) {
      let respFriends: FetchFriendsResponse[] = friends
      let friendsDTO: Friend[] = []
      respFriends.map((friend: FetchFriendsResponse) => {
        let friendDTO: Friend = {
          id: friend.id,
          username: friend.username,
          profile_name: friend.profile_name,
          email: friend.email,
          birthDate: new Date(friend.birthDate),
          points: friend.points,
          verified: friend.verified
        }
        friendsDTO.push(friendDTO);
        });
      yield put(fetchFriendsSuccess(friendsDTO));
    }
    if (massage) yield put(fetchFriendsError(massage))
  }
}

    
  export function* fetchDefaultGoalsHandler(action: AppActionType): IterableIterator<any> {
    const response = yield call(httpService.fetchDefaultGoals);
    if (response) {
      const { goals, massage } = response;
      if (goals) {
        let defaultGoals: GoalDTO[] = goals
        let goalsDTO: Goal[] = []
        defaultGoals.map((goal: GoalDTO) => {
          let goalDTO: Goal = {
            id: goal.id,
            title: goal.title,
            description: goal.description,
            startDate: new Date(),
            endDate: new Date(),
            currentProgress: 0,
            progressToReach: goal.progressToReach,
            isPublic: true,
            category: { category: goal.category, color: "#e9eff2"}
          }
          goalsDTO.push(goalDTO);
        });
        yield put(fetchDefaultGoalsSuccess(goalsDTO));
      }
      if (massage) yield put(fetchDefaultGoalsError(massage))
  }
} 