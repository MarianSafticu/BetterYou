import {
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
  AppActionType,
  UNSET_CURRENT_USER,
  SET_CURRENT_USER_INFORMATION_BEGIN,
  SET_CURRENT_USER_INFORMATION_SUCCES,
  SET_CURRENT_USER_INFORMATION_ERROR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CONFIRM_ACCOUNT_BEGIN,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
  FETCH_GOALS_BEGIN,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_ERROR,
  ADD_GOAL_BEGIN,
  ADD_GOAL_SUCCESS,
  ADD_GOAL_ERROR,
  EDIT_GOAL_BEGIN,
  EDIT_GOAL_SUCCESS,
  EDIT_GOAL_ERROR,
  DELETE_GOAL_BEGIN,
  DELETE_GOAL_SUCCESS,
  DELETE_GOAL_ERROR,
  FETCH_HABITS_BEGIN,
  FETCH_HABITS_SUCCESS,
  FETCH_HABITS_ERROR,
  ADD_HABIT_BEGIN,
  ADD_HABIT_SUCCESS,
  ADD_HABIT_ERROR,
  EDIT_HABIT_BEGIN,
  EDIT_HABIT_SUCCESS,
  EDIT_HABIT_ERROR,
  DELETE_HABIT_BEGIN,
  DELETE_HABIT_SUCCESS,
  DELETE_HABIT_ERROR,
  SET_APPBAR_SWIPEABLEDRAWER,
  SET_APPBAR_ITEMSLISTS
} from "./types";
import UserDTO from "../../models/UserDTO";
import Goal from "../../models/Goal";
import Habit from "../../models/Habit";
import LoginRequest from "../../models/requests/LoginRequest";
import RegisterRequest from "../../models/requests/RegisterRequest";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import EditGoalRequest from "../../models/requests/EditGoalRequest";
import AddHabitRequest from "../../models/requests/AddHabitRequest";
import EditHabitRequest from "../../models/requests/EditHabitRequest";

import { RefObject } from "react";
import AppBarItem from "../../models/AppBarItem";
import UserInfoDTO from "../../models/UserInfoDTO";

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
  };
}


export function setCurrentUserInformationBegin():AppActionType{
  return {
    type : SET_CURRENT_USER_INFORMATION_BEGIN,
    payload : undefined
  };
}
export function setCurrentUserInformationSuccess(userInfo : UserInfoDTO):AppActionType{
  return {
    type : SET_CURRENT_USER_INFORMATION_SUCCES,
    payload : userInfo
  };
}
export function setCurrentUserInformationError(error:string):AppActionType{
  return {
    type : SET_CURRENT_USER_INFORMATION_ERROR,
    payload : error
  }
}

export function registerUserBegin(user: RegisterRequest): AppActionType {
  return {
    type: REGISTER_USER_BEGIN,
    payload: user
  };
}
export function registerUserSuccess(): AppActionType {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: undefined
  };
}
export function registerUserError(error: string): AppActionType {
  return {
    type: REGISTER_USER_ERROR,
    payload: error
  };
}


export function confirmAccountBegin(code: string): AppActionType {
  return {
    type: CONFIRM_ACCOUNT_BEGIN,
    payload: code
  };
}
export function confirmAccountSuccess(response: boolean): AppActionType {
  return {
    type: CONFIRM_ACCOUNT_SUCCESS,
    payload: response
  };
}
export function confirmAccountError(error: string): AppActionType {
  return {
    type: CONFIRM_ACCOUNT_ERROR,
    payload: error
  };
}


export function fetchGoalsBegin(): AppActionType {
  return {
    type: FETCH_GOALS_BEGIN,
    payload: undefined
  };
}
export function fetchGoalsSuccess(goals: Goal[]): AppActionType {
  return {
    type: FETCH_GOALS_SUCCESS,
    payload: goals
  }
}
export function fetchGoalsError(error: string): AppActionType {
  return {
    type: FETCH_GOALS_ERROR,
    payload: error
  }
}


export function addGoalBegin(goal: AddGoalRequest): AppActionType {
  return {
    type: ADD_GOAL_BEGIN,
    payload: goal
  };
}
export function addGoalSuccess(goal: Goal): AppActionType {
  return {
    type: ADD_GOAL_SUCCESS,
    payload: goal
  };
}
export function addGoalError(error: string): AppActionType {
  return {
    type: ADD_GOAL_ERROR,
    payload: error
  };
}


export function editGoalBegin(goal: EditGoalRequest): AppActionType {
  return {
    type: EDIT_GOAL_BEGIN,
    payload: goal
  }
}
export function editGoalSuccess(goal: Goal): AppActionType {
  return {
    type: EDIT_GOAL_SUCCESS,
    payload: goal
  }
}
export function editGoalError(error: string): AppActionType {
  return {
    type: EDIT_GOAL_ERROR,
    payload: error
  }
}


export function deleteGoalBegin(id: number): AppActionType {
  return {
    type: DELETE_GOAL_BEGIN,
    payload: id
  }
}
export function deleteGoalSuccess(id: number): AppActionType {
  return {
    type: DELETE_GOAL_SUCCESS,
    payload: id
  }
}
export function deleteGoalError(error: string): AppActionType {
  return {
    type: DELETE_GOAL_ERROR,
    payload: error
  }
}


export function fetchHabitsBegin(): AppActionType {
  return {
    type: FETCH_HABITS_BEGIN,
    payload: undefined
  }
}
export function fetchHabitsSuccess(habits: Habit[]): AppActionType {
  return {
    type: FETCH_HABITS_SUCCESS,
    payload: habits
  }
}
export function fetchHabitsError(error: string): AppActionType {
  return {
    type: FETCH_HABITS_ERROR,
    payload: error
  }
}

export function addHabitBegin(habit: AddHabitRequest): AppActionType {
  return {
    type: ADD_HABIT_BEGIN,
    payload: habit
  }
}
export function addHabitSuccess(habit: Habit): AppActionType {
  return {
    type: ADD_HABIT_SUCCESS,
    payload: habit
  }
}
export function addHabitError(error: string): AppActionType {
  return {
    type: ADD_HABIT_ERROR,
    payload: error
  }
}


export function editHabitBegin(habit: EditHabitRequest): AppActionType {
  return {
    type: EDIT_HABIT_BEGIN,
    payload: habit
  }
}
export function editHabitSuccess(habit: Habit): AppActionType {
  return {
    type: EDIT_HABIT_SUCCESS,
    payload: habit
  }
}
export function editHabitError(error: string): AppActionType {
  return {
    type: EDIT_HABIT_ERROR,
    payload: error
  }
}


export function deleteHabitBegin(id: number): AppActionType {
  return {
    type: DELETE_HABIT_BEGIN,
    payload: id
  }
}
export function deleteHabitSuccess(id: number): AppActionType {
  return {
    type: DELETE_HABIT_SUCCESS,
    payload: id
  }
}
export function deleteHabitError(error: string): AppActionType {
  return {
    type: DELETE_HABIT_ERROR,
    payload: error
  }
}

export function setAppBarSwipeableDrawer(refObj: RefObject<any> | null): AppActionType {
  return {
    type: SET_APPBAR_SWIPEABLEDRAWER,
    payload: refObj
  };
}

export function setAppBarItemsList(list: AppBarItem[]): AppActionType {
  return {
    type: SET_APPBAR_ITEMSLISTS,
    payload: list
  };
}

