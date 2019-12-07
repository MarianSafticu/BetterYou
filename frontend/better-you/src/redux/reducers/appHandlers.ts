import AppState from "../store/store";
import { UserLoginDTO } from "../../models/UserLoginDTO";

export function setCurrentUserBeginHandler(
  oldState: AppState,
  user: UserLoginDTO
): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.currentUser = undefined;
  return newState;
}

export function setCurrentUserSuccessHandler(
  oldState: AppState,
  user: UserLoginDTO
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.currentUser = user;
  return newState;
}

export function setCurrentUserErrorHandler(
  oldState: AppState,
  error: string
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.currentUser = undefined;
  return newState;
}

export function unsetCurrentUserHandler(
  oldState: AppState,
  user: UserLoginDTO
): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.currentUser = undefined;
  return newState;
}
