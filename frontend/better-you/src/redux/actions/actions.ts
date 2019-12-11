import {
  AppActionType,
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
  UNSET_CURRENT_USER
} from "./types";
import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";

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
