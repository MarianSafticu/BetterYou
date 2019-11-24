import { SET_CURRENT_USER_BEGIN } from "../actions/types";
import { takeLeading } from "@redux-saga/core/effects";
import { loginUserHandler } from "./Listeners";

export function* generalSaga(): IterableIterator<any> {
    yield takeLeading(SET_CURRENT_USER_BEGIN, loginUserHandler);
}