import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";
import RegisterRequest from "../../models/requests/RegisterRequest";

export const SET_CURRENT_USER_BEGIN = "SET_CURRENT_USER_BEGIN";
export const SET_CURRENT_USER_SUCCESS = "SET_CURRENT_USER_SUCCESS";
export const SET_CURRENT_USER_ERROR = "SET_CURRENT_USER_ERROR";

export const UNSET_CURRENT_USER = "UNSET_CURRENT_USER";

export const REGISTER_USER_BEGIN = "REGISTER_USER_BEGIN";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const CONFIRM_ACCOUNT_BEGIN = "CONFIRM_ACCOUNT_BEGIN";
export const CONFIRM_ACCOUNT_SUCCESS = "CONFIRM_ACCOUNT_SUCCESS";
export const CONFIRM_ACCOUNT_ERROR = "CONFIRM_ACCOUNT_ERROR";

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

export type AppActionType =
  | SetCurrentUserBegin
  | SetCurrentUserSuccess
  | SetCurrentUserError
  | UnsetCurrentUser
  | RegisterUserBegin
  | RegisterUserSuccess
  | RegisterUserError
  | ConfirmAccountBegin
  | ConfirmAccountSuccess
  | ConfirmAccountError;
