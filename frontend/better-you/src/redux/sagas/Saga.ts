import { SET_CURRENT_USER_BEGIN, REGISTER_USER_BEGIN, CONFIRM_ACCOUNT_BEGIN, ADD_GOAL_BEGIN } from "../actions/types";
import { takeEvery } from "@redux-saga/core/effects";
import { loginUserHandler, registerUserHandler, confirmAccountHandler, addGoalHandler } from "./Listeners";

export function* generalSaga(): IterableIterator<any> {
  yield takeEvery(SET_CURRENT_USER_BEGIN, loginUserHandler);
  yield takeEvery(REGISTER_USER_BEGIN, registerUserHandler);
  yield takeEvery(CONFIRM_ACCOUNT_BEGIN, confirmAccountHandler);
  yield takeEvery(ADD_GOAL_BEGIN, addGoalHandler);
}
