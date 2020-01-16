import AppState from "../store/store";
import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";
import { deleteCookie } from "../../services/CookieService";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import Goal from "../../models/Goal";
import Habit from "../../models/Habit";
import { RefObject } from "react";
import AppBarItem from "../../models/AppBarItem";


export function setCurrentUserBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.userInfo = undefined;
  return newState;
}
export function setCurrentUserSuccessHandler(oldState: AppState, userInfo: UserDTO): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.userInfo = userInfo;
  return newState;
}
export function setCurrentUserErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.userInfo = undefined;
  return newState;
}


export function unsetCurrentUserHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.userInfo = undefined;
  newState.registrationEmailSent = false;
  deleteCookie("token");
  return newState;
}


export function registerUserBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.registrationEmailSent = false;
  return newState;
}
export function registerUserSuccessHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.registrationEmailSent = true;
  return newState;
}
export function registerUserErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.registrationEmailSent = false;
  return newState;
}


export function confirmAccountBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.accountConfirmed = false;
  return newState;
}
export function confirmAccountSuccessHandler(oldState: AppState, response: boolean): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.accountConfirmed = true;
  return newState;
}
export function confirmAccountErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.accountConfirmed = false;
  return newState;
}


export function fetchGoalsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchGoalsSuccessHandler(oldState: AppState, goals: Goal[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.goals = goals;
  return newState;
}
export function fetchGoalsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = [];
  return newState;
}


export function addGoalBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.goals = oldState.goals;
  return newState;
}
export function addGoalSuccessHandler(oldState: AppState, goal: Goal): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  
  let newGoals = newState.goals.slice();
  newGoals.splice(0, 0, goal);
  newState.goals = newGoals;
  
  return newState;
}
export function addGoalErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.goals = oldState.goals;
  return newState;
}


export function editGoalBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  return newState;
}
export function editGoalSuccessHandler(oldState: AppState, goal: Goal): AppState {
  const newState = {...oldState};
  return newState;
}
export function editGoalErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  return newState;
}


export function deleteGoalBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  return newState;
}
export function deleteGoalSuccessHandler(oldState: AppState, id: number): AppState {
  const newState = {...oldState};
  return newState;
}
export function deleteGoalErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  return newState;
}


export function fetchHabitsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  return newState;
}
export function fetchHabitsSuccessHandler(oldState: AppState, habits: Habit[]): AppState {
  const newState = {...oldState};
  return newState;
}
export function fetchHabitsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  return newState;
}


export function addHabitBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  return newState;
}
export function addHabitSuccessHandler(oldState: AppState, habit: Habit): AppState {
  const newState = {...oldState};
  return newState;
}
export function addHabitErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  return newState;
}


export function editHabitBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  return newState;
}
export function editHabitSuccessHandler(oldState: AppState, habit: Habit): AppState {
  const newState = {...oldState};
  return newState;
}
export function editHabitErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  return newState;
}


export function deleteHabitBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  return newState;
}
export function deleteHabitSuccessHandler(oldState: AppState, id: number): AppState {
  const newState = {...oldState};
  return newState;
}
export function deleteHabitErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  return newState;
}

export function setAppBarSwipeableDrawerHandler(oldState: AppState, refObj: RefObject<unknown> | null):AppState {
  const newState = { ...oldState };
  newState.appBarSwipeableDrawer = refObj;
  return newState;
}

export function setAppBarItemsListHandler(oldState: AppState, list: AppBarItem[]):AppState {
  const newState = { ...oldState };
  newState.appBarItemsList = list;
  return newState;
}
