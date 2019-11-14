import { User } from "../../models/User";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export interface SetCurrentUserType {
    type: typeof SET_CURRENT_USER;
    payload: User;
}

export type AppActionType = SetCurrentUserType;