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
  SET_APPBAR_ITEMSLISTS,
  FETCH_FRIENDS_BEGIN,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_ERROR,
  FETCH_FRIEND_REQUESTS_BEGIN,
  FETCH_FRIEND_REQUESTS_SUCCESS,
  FETCH_FRIEND_REQUESTS_ERROR,
  FETCH_DEFAULT_GOALS_BEGIN,
  FETCH_DEFAULT_GOALS_SUCCESS,
  FETCH_DEFAULT_GOALS_ERROR,
  CHALLENGE_FRIEND_BEGIN,
  CHALLENGE_FRIEND_SUCCESS,
  CHALLENGE_FRIEND_ERROR,
  ACCEPT_FRIEND_BEGIN,
  ACCEPT_FRIEND_SUCCESS,
  ACCEPT_FRIEND_ERROR,
  DECLINE_FRIEND_BEGIN,
  DECLINE_FRIEND_SUCCESS,
  DECLINE_FRIEND_ERROR,
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_CHALLENGES_BEGIN,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR,
  ADD_FRIEND_BEGIN,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_ERROR,
  FETCH_FRIEND_GOALS_BEGIN,
  FETCH_FRIEND_GOALS_SUCCESS,
  FETCH_FRIEND_GOALS_ERROR,
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
import Friend from "../../models/Friend";
import ChallengeFriendDTO from "../../models/ChallengeFriendDTO";
import FriendRequest from "../../models/FriendRequest";
import ChallengeDTO from "../../models/ChallengeDTO";

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


export function setCurrentUserInformationBegin(): AppActionType {
  return {
    type: SET_CURRENT_USER_INFORMATION_BEGIN,
    payload: undefined
  };
}
export function setCurrentUserInformationSuccess(userInfo: UserInfoDTO): AppActionType {
  return {
    type: SET_CURRENT_USER_INFORMATION_SUCCES,
    payload: userInfo
  };
}
export function setCurrentUserInformationError(error: string): AppActionType {
  return {
    type: SET_CURRENT_USER_INFORMATION_ERROR,
    payload: error
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

export function fetchFriendsBegin(): AppActionType {
  return {
    type: FETCH_FRIENDS_BEGIN,
    payload: undefined
  };
}
export function fetchFriendsSuccess(friends: Friend[]): AppActionType {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    payload: friends
  }
}
export function fetchFriendsError(error: string): AppActionType {
  return {
    type: FETCH_FRIENDS_ERROR,
    payload: error
  }
}

export function fetchFriendRequestsBegin(): AppActionType {
  return {
    type: FETCH_FRIEND_REQUESTS_BEGIN,
    payload: undefined
  };
}
export function fetchFriendRequestsSuccess(friendRequests: FriendRequest[]): AppActionType {
  return {
    type: FETCH_FRIEND_REQUESTS_SUCCESS,
    payload: friendRequests
  }
}
export function fetchFriendRequestsError(error: string): AppActionType {
  return {
    type: FETCH_FRIEND_REQUESTS_ERROR,
    payload: error
  }
}

export function fetchDefaultGoalsBegin(): AppActionType {
  return {
    type: FETCH_DEFAULT_GOALS_BEGIN,
    payload: undefined
  };
}
export function fetchDefaultGoalsSuccess(goals: Goal[]): AppActionType {
  return {
    type: FETCH_DEFAULT_GOALS_SUCCESS,
    payload: goals
  }
}
export function fetchDefaultGoalsError(error: string): AppActionType {
  return {
    type: FETCH_DEFAULT_GOALS_ERROR,
    payload: error
  }
}

export function challengeFriendBegin(challenge: ChallengeFriendDTO): AppActionType {
  return {
    type: CHALLENGE_FRIEND_BEGIN,
    payload: challenge
  };
}
export function challengeFriendSuccess(): AppActionType {
  return {
    type: CHALLENGE_FRIEND_SUCCESS,
    payload: undefined
  }
}
export function challengeFriendError(error: string): AppActionType {
  return {
    type: CHALLENGE_FRIEND_ERROR,
    payload: error
  }
}

export function acceptFriendBegin(username: string): AppActionType {
  return {
    type: ACCEPT_FRIEND_BEGIN,
    payload: username
  };
}
export function acceptFriendSuccess(username: string): AppActionType {
  return {
    type: ACCEPT_FRIEND_SUCCESS,
    payload: username
  };
}
export function acceptFriendError(error: string): AppActionType {
  return {
    type: ACCEPT_FRIEND_ERROR,
    payload: error
  };
}

export function declineFriendBegin(username: string): AppActionType {
  return {
    type: DECLINE_FRIEND_BEGIN,
    payload: username
  };
}
export function declineFriendSuccess(username: string): AppActionType {
  return {
    type: DECLINE_FRIEND_SUCCESS,
    payload: username
  };
}
export function declineFriendError(error: string): AppActionType {
  return {
    type: DECLINE_FRIEND_ERROR,
    payload: error
  };
}
export function fetchUsersBegin(prefix: string): AppActionType {
  return {
    type: FETCH_USERS_BEGIN,
    payload: prefix
  };
}
export function fetchUsersSuccess(users: UserInfoDTO[]): AppActionType {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
export function fetchUsersError(error: string): AppActionType {
  return {
    type: FETCH_USERS_ERROR,
    payload: error
  }
}


export function fetchChallengesBegin(): AppActionType {
  return {
    type: FETCH_CHALLENGES_BEGIN,
    payload: undefined
  };
}
export function fetchChallengesSuccess(challenges: ChallengeDTO[]): AppActionType {
  return {
    type: FETCH_CHALLENGES_SUCCESS,
    payload: challenges
  }
}
export function fetchChallengesError(error: string): AppActionType {
  return {
    type: FETCH_CHALLENGES_ERROR,
    payload: error
  }
}


export function addFriendBegin(usernameReceiver: string): AppActionType {
  return {
    type: ADD_FRIEND_BEGIN,
    payload: usernameReceiver
  };
}
export function addFriendSuccess(): AppActionType {
  return {
    type:ADD_FRIEND_SUCCESS,
    payload: undefined
  }
}
export function addFriendError(error: string): AppActionType {
  return {
    type: ADD_FRIEND_ERROR,
    payload: error
  }
}

export function fetchFriendGoalsBegin(username: string): AppActionType {
  return {
    type: FETCH_FRIEND_GOALS_BEGIN,
    payload: username
  };
}
export function fetchFriendGoalsSuccess(goals: Goal[]): AppActionType {
  return {
    type: FETCH_FRIEND_GOALS_SUCCESS,
    payload: goals
  }
}
export function fetchFriendGoalsError(error: string): AppActionType {
  return {
    type: FETCH_FRIEND_GOALS_ERROR,
    payload: error
  }
}

