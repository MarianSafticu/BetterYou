import {  AppActionType, SET_CURRENT_USER_BEGIN, SET_CURRENT_USER_SUCCESS, SET_CURRENT_USER_ERROR } from "./types";
import { UserLoginDTO } from "../../models/UserLoginDTO";

export function setCurrentUserBegin(user: UserLoginDTO): AppActionType {
    return {
        type: SET_CURRENT_USER_BEGIN,
        payload: user
    }
}
export function setCurrentUserSuccess(user: UserLoginDTO): AppActionType {
    return {
        type: SET_CURRENT_USER_SUCCESS,
        payload: user
    }
}
export function setCurrentUserError(error: string): AppActionType {
    return {
        type: SET_CURRENT_USER_ERROR,
        payload: error
    }
}