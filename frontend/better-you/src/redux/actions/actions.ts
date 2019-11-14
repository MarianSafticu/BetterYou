import {  AppActionType, SET_CURRENT_USER } from "./types";
import { User } from "../../models/User";

export function setCurrentUser(user: User): AppActionType {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}