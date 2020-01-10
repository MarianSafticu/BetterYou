import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";
import RegisterRequest from "../../models/requests/RegisterRequest";
import { RefObject } from "react";

export const SET_CURRENT_USER_BEGIN = "SET_CURRENT_USER_BEGIN";
export const SET_CURRENT_USER_SUCCESS = "SET_CURRENT_USER_SUCCESS";
export const SET_CURRENT_USER_ERROR = "SET_CURRENT_USER_ERROR";

export const UNSET_CURRENT_USER = "UNSET_CURRENT_USER";

export const REGISTER_USER_BEGIN = "REGISTER_USER_BEGIN";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const SET_APPBAR_SWIPEABLEDRAWER = "SET_APPBAR_SWIPEABLEDRAWER";

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

export interface SetAppBarSwipeableDrawer {
  type: typeof SET_APPBAR_SWIPEABLEDRAWER;
  payload: RefObject<any> | null;
}

export type AppActionType =
  | SetCurrentUserBegin
  | SetCurrentUserSuccess
  | SetCurrentUserError
  | UnsetCurrentUser
  | RegisterUserBegin
  | RegisterUserSuccess
  | RegisterUserError
  | SetAppBarSwipeableDrawer;
