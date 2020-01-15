import {
  AppActionType,
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
  UNSET_CURRENT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CONFIRM_ACCOUNT_BEGIN,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
  ADD_GOAL_BEGIN,
  ADD_GOAL_SUCCESS,
  ADD_GOAL_ERROR
} from "./types";
import LoginRequest from "../../models/requests/LoginRequest";
import UserDTO from "../../models/UserDTO";
import RegisterRequest from "../../models/requests/RegisterRequest";
import Goal from "../../models/Goal";
import AddGoalRequest from "../../models/requests/AddGoalRequest";

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

export function confirmAccountBegin(code: string): AppActionType {
  return {
    type: CONFIRM_ACCOUNT_BEGIN,
    payload: code
  }
}
export function confirmAccountSuccess(response: boolean): AppActionType {
  return {
    type: CONFIRM_ACCOUNT_SUCCESS,
    payload: response
  }
}
export function confirmAccountError(error: string): AppActionType {
  return {
    type: CONFIRM_ACCOUNT_ERROR,
    payload: error
  }
}

export function addGoalBegin(goal: AddGoalRequest): AppActionType {
  return {
    type: ADD_GOAL_BEGIN,
    payload: goal
  }
}
export function addGoalSuccess(goal: Goal): AppActionType {
  return {
    type: ADD_GOAL_SUCCESS,
    payload: goal
  }
}
export function addGoalError(error: string): AppActionType {
  return {
    type: ADD_GOAL_ERROR,
    payload: error
  }
}
