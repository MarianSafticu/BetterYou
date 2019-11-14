import AppState from "../store/store";
import { AppActionType, SET_CURRENT_USER } from "../actions/types";
import { setCurrentUserHandler } from "./appHandlers";

export const initialState: AppState = {
    currentUser: undefined
}

export const appReducer = (state = initialState, action: AppActionType) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return setCurrentUserHandler(state, action.payload);
        default:
            return state;
    }
}