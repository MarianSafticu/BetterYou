import AppState from "../store/store";
import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";
import { deleteCookie } from "../../services/CookieService";

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
