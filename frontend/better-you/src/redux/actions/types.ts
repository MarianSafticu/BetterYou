import LoginRequest from "../../models/requests/LoginRequest";
import RegisterRequest from "../../models/requests/RegisterRequest";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import EditGoalRequest from "../../models/requests/EditGoalRequest";
import AddHabitRequest from "../../models/requests/AddHabitRequest";
import EditHabitRequest from "../../models/requests/EditHabitRequest";
import UserDTO from "../../models/UserDTO";
import Goal from "../../models/Goal";
import Habit from "../../models/Habit";

import { RefObject } from "react";
import AppBarItem from "../../models/AppBarItem";
import UserInfoDTO from "../../models/UserInfoDTO";

export const SET_CURRENT_USER_BEGIN = "SET_CURRENT_USER_BEGIN";
export const SET_CURRENT_USER_SUCCESS = "SET_CURRENT_USER_SUCCESS";
export const SET_CURRENT_USER_ERROR = "SET_CURRENT_USER_ERROR";

export const UNSET_CURRENT_USER = "UNSET_CURRENT_USER";

export const SET_CURRENT_USER_INFORMATION_BEGIN = "SET_CURRENT_USER_INFORMATION_BEGIN";
export const SET_CURRENT_USER_INFORMATION_SUCCES = "SET_CURRENT_USER_INFORMATION_SUCCES";
export const SET_CURRENT_USER_INFORMATION_ERROR = "SET_CURRENT_USER_INFORMATION_ERROR";

export const REGISTER_USER_BEGIN = "REGISTER_USER_BEGIN";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const CONFIRM_ACCOUNT_BEGIN = "CONFIRM_ACCOUNT_BEGIN";
export const CONFIRM_ACCOUNT_SUCCESS = "CONFIRM_ACCOUNT_SUCCESS";
export const CONFIRM_ACCOUNT_ERROR = "CONFIRM_ACCOUNT_ERROR";

export const FETCH_GOALS_BEGIN = "FETCH_GOALS_BEGIN";
export const FETCH_GOALS_SUCCESS = "FETCH_GOALS_SUCCESS";
export const FETCH_GOALS_ERROR = "FETCH_GOALS_ERROR";

export const ADD_GOAL_BEGIN = "ADD_GOAL_BEGIN";
export const ADD_GOAL_SUCCESS = "ADD_GOAL_SUCCESS";
export const ADD_GOAL_ERROR = "ADD_GOAL_ERROR";

export const EDIT_GOAL_BEGIN = "EDIT_GOAL_BEGIN";
export const EDIT_GOAL_SUCCESS = "EDIT_GOAL_SUCCESS";
export const EDIT_GOAL_ERROR = "EDIT_GOAL_ERROR";

export const DELETE_GOAL_BEGIN = "DELETE_GOAL_BEGIN";
export const DELETE_GOAL_SUCCESS = "DELETE_GOAL_SUCCESS";
export const DELETE_GOAL_ERROR = "DELETE_GOAL_ERROR";

export const FETCH_HABITS_BEGIN = "FETCH_HABITS_BEGIN";
export const FETCH_HABITS_SUCCESS = "FETCH_HABITS_SUCCESS";
export const FETCH_HABITS_ERROR = "FETCH_HABITS_ERROR";

export const ADD_HABIT_BEGIN = "ADD_HABIT_BEGIN";
export const ADD_HABIT_SUCCESS = "ADD_HABIT_SUCCESS";
export const ADD_HABIT_ERROR = "ADD_HABIT_ERROR";

export const EDIT_HABIT_BEGIN = "EDIT_HABIT_BEGIN";
export const EDIT_HABIT_SUCCESS = "EDIT_HABIT_SUCCESS";
export const EDIT_HABIT_ERROR = "EDIT_HABIT_ERROR";

export const DELETE_HABIT_BEGIN = "DELETE_HABIT_BEGIN";
export const DELETE_HABIT_SUCCESS = "DELETE_HABIT_SUCCESS";
export const DELETE_HABIT_ERROR = "DELETE_HABIT_ERROR";

export const SET_APPBAR_SWIPEABLEDRAWER = "SET_APPBAR_SWIPEABLEDRAWER";
export const SET_APPBAR_ITEMSLISTS = "SET_APPBAR_ITEMSLISTS";

export interface SetCurrentUserBegin {
  type: typeof SET_CURRENT_USER_BEGIN;
  payload: LoginRequest;
}
export interface SetCurrentUserSuccess {
  type: typeof SET_CURRENT_USER_SUCCESS;
  payload: UserDTO;
}
export interface SetCurrentUserError {
  type: typeof SET_CURRENT_USER_ERROR;
  payload: string;
}


export interface UnsetCurrentUser {
  type: typeof UNSET_CURRENT_USER;
  payload: undefined;
}

export interface SetCurrentUserInformationBegin{
  type : typeof SET_CURRENT_USER_INFORMATION_BEGIN;
  payload : undefined;
}
export interface SetCurrentUserInformationSucces{
  type : typeof SET_CURRENT_USER_INFORMATION_SUCCES;
  payload: UserInfoDTO;
}
export interface SetCurrentUserInformationError{
  type : typeof SET_CURRENT_USER_INFORMATION_ERROR;
  payload: string;
}


export interface RegisterUserBegin {
  type: typeof REGISTER_USER_BEGIN;
  payload: RegisterRequest;
}
export interface RegisterUserSuccess {
  type: typeof REGISTER_USER_SUCCESS;
  payload: undefined;
}
export interface RegisterUserError {
  type: typeof REGISTER_USER_ERROR;
  payload: string;
}


export interface ConfirmAccountBegin {
  type: typeof CONFIRM_ACCOUNT_BEGIN;
  payload: string;
}
export interface ConfirmAccountSuccess {
  type: typeof CONFIRM_ACCOUNT_SUCCESS;
  payload: boolean;
}
export interface ConfirmAccountError {
  type: typeof CONFIRM_ACCOUNT_ERROR;
  payload: string;
}


export interface FetchGoalsBegin {
  type: typeof FETCH_GOALS_BEGIN;
  payload: undefined;
}
export interface FetchGoalsSuccess {
  type: typeof FETCH_GOALS_SUCCESS;
  payload: Goal[];
}
export interface FetchGoalsError {
  type: typeof FETCH_GOALS_ERROR;
  payload: string;
}


export interface AddGoalBegin {
  type: typeof ADD_GOAL_BEGIN;
  payload: AddGoalRequest;
}
export interface AddGoalSuccess {
  type: typeof ADD_GOAL_SUCCESS;
  payload: Goal;
}
export interface AddGoalError {
  type: typeof ADD_GOAL_ERROR;
  payload: string;
}


export interface EditGoalBegin {
  type: typeof EDIT_GOAL_BEGIN;
  payload: EditGoalRequest;
}
export interface EditGoalSuccess {
  type: typeof EDIT_GOAL_SUCCESS;
  payload: Goal;
}
export interface EditGoalError {
  type: typeof EDIT_GOAL_ERROR;
  payload: string;
}


export interface DeleteGoalBegin {
  type: typeof DELETE_GOAL_BEGIN;
  payload: number;
}
export interface DeleteGoalSuccess {
  type: typeof DELETE_GOAL_SUCCESS;
  payload: number;
}
export interface DeleteGoalError {
  type: typeof DELETE_GOAL_ERROR;
  payload: string;
}


export interface FetchHabitsBegin {
  type: typeof FETCH_HABITS_BEGIN;
  payload: undefined;
}
export interface FetchHabitsSuccess {
  type: typeof FETCH_HABITS_SUCCESS;
  payload: Habit[];
}
export interface FetchHabitsError{
  type: typeof FETCH_HABITS_ERROR;
  payload: string;
}


export interface AddHabitBegin {
  type: typeof ADD_HABIT_BEGIN;
  payload: AddHabitRequest;
}
export interface AddHabitSuccess {
  type: typeof ADD_HABIT_SUCCESS;
  payload: Habit;
}
export interface AddHabitError {
  type: typeof ADD_HABIT_ERROR;
  payload: string;
}


export interface EditHabitBegin {
  type: typeof EDIT_HABIT_BEGIN;
  payload: EditHabitRequest;
}
export interface EditHabitSuccess {
  type: typeof EDIT_HABIT_SUCCESS;
  payload: Habit;
}
export interface EditHabitError {
  type: typeof EDIT_HABIT_ERROR;
  payload: string;
}


export interface DeleteHabitBegin {
  type: typeof DELETE_HABIT_BEGIN;
  payload: number;
}
export interface DeleteHabitSuccess {
  type: typeof DELETE_HABIT_SUCCESS;
  payload: number;
}
export interface DeleteHabitError {
  type: typeof DELETE_HABIT_ERROR;
  payload: string;
}

export interface SetAppBarSwipeableDrawer {
  type: typeof SET_APPBAR_SWIPEABLEDRAWER;
  payload: RefObject<any> | null;
}

export interface SetAppBarItemsList {
  type: typeof SET_APPBAR_ITEMSLISTS;
  payload: AppBarItem[];
}

export type AppActionType =
  | SetCurrentUserBegin
  | SetCurrentUserSuccess
  | SetCurrentUserError
  | UnsetCurrentUser
  | SetCurrentUserInformationBegin
  | SetCurrentUserInformationSucces
  | SetCurrentUserInformationError
  | RegisterUserBegin
  | RegisterUserSuccess
  | RegisterUserError
  | ConfirmAccountBegin
  | ConfirmAccountSuccess
  | ConfirmAccountError
  | FetchGoalsBegin
  | FetchGoalsSuccess
  | FetchGoalsError
  | AddGoalBegin
  | AddGoalSuccess
  | AddGoalError
  | EditGoalBegin
  | EditGoalSuccess
  | EditGoalError
  | DeleteGoalBegin
  | DeleteGoalSuccess
  | DeleteGoalError
  | FetchHabitsBegin
  | FetchHabitsSuccess
  | FetchHabitsError
  | AddHabitBegin
  | AddHabitSuccess
  | AddHabitError
  | EditHabitBegin
  | EditHabitSuccess
  | EditHabitError
  | DeleteHabitBegin
  | DeleteHabitSuccess
  | DeleteHabitError
  | SetAppBarSwipeableDrawer
  | SetAppBarItemsList;
