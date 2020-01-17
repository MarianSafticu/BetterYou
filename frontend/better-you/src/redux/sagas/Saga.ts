import { takeEvery } from "@redux-saga/core/effects";
import {
  SET_CURRENT_USER_BEGIN,
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
  FETCH_DEFAULT_GOALS_BEGIN
} from "../actions/types";
import {
  loginUserHandler,
  registerUserHandler,
  confirmAccountHandler,
  fetchGoalsHandler,
  addGoalHandler,
  editGoalHandler,
  deleteGoalHandler,
  fetchHabitsHandler,
  addHabitHandler,
  editHabitHandler,
  deleteHabitHandler,
  fetchDefaultGoalsHandler
} from "./Listeners";

export function* generalSaga(): IterableIterator<any> {
  yield takeEvery(SET_CURRENT_USER_BEGIN, loginUserHandler);
  yield takeEvery(REGISTER_USER_BEGIN, registerUserHandler);
  yield takeEvery(CONFIRM_ACCOUNT_BEGIN, confirmAccountHandler);
  yield takeEvery(FETCH_GOALS_BEGIN, fetchGoalsHandler);
  yield takeEvery(ADD_GOAL_BEGIN, addGoalHandler);
  yield takeEvery(EDIT_GOAL_BEGIN, editGoalHandler);
  yield takeEvery(DELETE_GOAL_BEGIN, deleteGoalHandler);
  yield takeEvery(FETCH_HABITS_BEGIN, fetchHabitsHandler);
  yield takeEvery(ADD_HABIT_BEGIN, addHabitHandler);
  yield takeEvery(EDIT_HABIT_BEGIN, editHabitHandler);
  yield takeEvery(DELETE_HABIT_BEGIN, deleteHabitHandler);
  yield takeEvery(FETCH_DEFAULT_GOALS_BEGIN, fetchDefaultGoalsHandler);
}
