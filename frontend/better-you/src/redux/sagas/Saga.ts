import { SET_CURRENT_USER_BEGIN, REGISTER_USER_BEGIN } from "../actions/types";
import { takeEvery } from "@redux-saga/core/effects";
import { loginUserHandler, registerUserHandler } from "./Listeners";

export function* generalSaga(): IterableIterator<any> {
  yield takeEvery(SET_CURRENT_USER_BEGIN, loginUserHandler);
  yield takeEvery(REGISTER_USER_BEGIN, registerUserHandler);
}
