import {
  AppActionType,
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
  UNSET_CURRENT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR
} from "./types";
import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";
import RegisterRequest from "../../models/requests/RegisterRequest";

export function setCurrentUserBegin(userInfo: LoginRequest): AppActionType {
  return {
    type: SET_CURRENT_USER_BEGIN,
    payload: userInfo
  };
}
export function setCurrentUserSuccess(userInfo: UserDTO): AppActionType {
  return {
    type: SET_CURRENT_USER_SUCCESS,
    payload: userInfo
  };
}
export function setCurrentUserError(error: string): AppActionType {
  return {
    type: SET_CURRENT_USER_ERROR,
    payload: error
  };
}

export function unsetCurrentUser(): AppActionType {
  return {
    type: UNSET_CURRENT_USER,
    payload: undefined
  }
}

export function registerUserBegin(user: RegisterRequest): AppActionType {
  return {
    type: REGISTER_USER_BEGIN,
    payload: user
  }
}

export function registerUserSuccess(): AppActionType {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: undefined
  }
}

export function registerUserError(error: string): AppActionType {
  return {
    type: REGISTER_USER_ERROR,
    payload: error
  }
}
