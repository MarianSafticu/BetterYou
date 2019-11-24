import { UserLoginDTO } from "../../models/UserLoginDTO";

export const SET_CURRENT_USER_BEGIN = "SET_CURRENT_USER_BEGIN";
export const SET_CURRENT_USER_SUCCESS = "SET_CURRENT_USER_SUCCESS";
export const SET_CURRENT_USER_ERROR = "SET_CURRENT_USER_ERROR";

export interface SetCurrentUserBegin {
  type: typeof SET_CURRENT_USER_BEGIN;
  payload: UserLoginDTO;
}
export interface SetCurrentUserSuccess {
  type: typeof SET_CURRENT_USER_SUCCESS;
  payload: UserLoginDTO;
}
export interface SetCurrentUserError {
  type: typeof SET_CURRENT_USER_ERROR;
  payload: string;
}

export type AppActionType =
  | SetCurrentUserBegin
  | SetCurrentUserSuccess
  | SetCurrentUserError;
