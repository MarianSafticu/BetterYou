import { takeEvery } from "@redux-saga/core/effects";
import {
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_INFORMATION_BEGIN,
  REGISTER_USER_BEGIN,
  CONFIRM_ACCOUNT_BEGIN,
  FETCH_GOALS_BEGIN,
  ADD_GOAL_BEGIN,
  EDIT_GOAL_BEGIN,
  DELETE_GOAL_BEGIN,
  FETCH_HABITS_BEGIN,
  ADD_HABIT_BEGIN,
  EDIT_HABIT_BEGIN,
  DELETE_HABIT_BEGIN,
  FETCH_FRIENDS_BEGIN,
  FETCH_DEFAULT_GOALS_BEGIN,
  CHALLENGE_FRIEND_BEGIN,
  FETCH_FRIEND_REQUESTS_BEGIN,
} from "../actions/types";
import {
  loginUserHandler,
  registerUserHandler,
  confirmAccountHandler,
  getUserInformationHandler,
  fetchGoalsHandler,
  addGoalHandler,
  editGoalHandler,
  deleteGoalHandler,
  fetchHabitsHandler,
  addHabitHandler,
  editHabitHandler,
  deleteHabitHandler,
  fetchFriendsHandler,
  fetchDefaultGoalsHandler,
  challengeFriendHandler,
  fetchFriendRequestsHandler,
} from "./Listeners";

export function* generalSaga(): IterableIterator<any> {
  yield takeEvery(SET_CURRENT_USER_BEGIN, loginUserHandler);
  yield takeEvery(REGISTER_USER_BEGIN, registerUserHandler);
  yield takeEvery(CONFIRM_ACCOUNT_BEGIN, confirmAccountHandler);
  yield takeEvery(SET_CURRENT_USER_INFORMATION_BEGIN,getUserInformationHandler);
  yield takeEvery(FETCH_GOALS_BEGIN, fetchGoalsHandler);
  yield takeEvery(ADD_GOAL_BEGIN, addGoalHandler);
  yield takeEvery(EDIT_GOAL_BEGIN, editGoalHandler);
  yield takeEvery(DELETE_GOAL_BEGIN, deleteGoalHandler);
  yield takeEvery(FETCH_HABITS_BEGIN, fetchHabitsHandler);
  yield takeEvery(ADD_HABIT_BEGIN, addHabitHandler);
  yield takeEvery(EDIT_HABIT_BEGIN, editHabitHandler);
  yield takeEvery(DELETE_HABIT_BEGIN, deleteHabitHandler);
  yield takeEvery(FETCH_FRIENDS_BEGIN, fetchFriendsHandler);
  yield takeEvery(FETCH_FRIEND_REQUESTS_BEGIN, fetchFriendRequestsHandler);
  yield takeEvery(FETCH_DEFAULT_GOALS_BEGIN, fetchDefaultGoalsHandler);
  yield takeEvery(CHALLENGE_FRIEND_BEGIN, challengeFriendHandler);
}
