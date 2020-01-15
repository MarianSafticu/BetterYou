import AppState from "../store/store";
import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";
import { deleteCookie } from "../../services/CookieService";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import Goal from "../../models/Goal";

export function setCurrentUserBeginHandler(
  oldState: AppState,
  userInfo: LoginRequest
): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.userInfo = undefined;
  return newState;
}

export function setCurrentUserSuccessHandler(
  oldState: AppState,
  userInfo: UserDTO
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.userInfo = userInfo;
  return newState;
}

export function setCurrentUserErrorHandler(
  oldState: AppState,
  error: string
): AppState {
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

export function registerUserErrorHandler(
  oldState: AppState,
  error: string
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.registrationEmailSent = false;
  return newState;
}

export function confirmAccountBeginHandler(
  oldState: AppState,
  code: string
): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.accountConfirmed = false;
  return newState;
}

export function confirmAccountSuccessHandler(
  oldState: AppState,
  response: boolean
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.accountConfirmed = true;
  return newState;
}

export function confirmAccountErrorHandler(
  oldState: AppState,
  error: string
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.accountConfirmed = false;
  return newState;
}

export function addGoalBeginHandler(oldState: AppState, goal: AddGoalRequest): AppState {
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
  newState.goals = oldState.goals;
  newState.goals.push(goal);
  return newState;
}

export function addGoalErrorHandler(
  oldState: AppState,
  error: string
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.goals = oldState.goals;
  return newState;
}
