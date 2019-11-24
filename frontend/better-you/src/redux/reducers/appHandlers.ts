import AppState from "../store/store";
import { UserLoginDTO } from "../../models/UserLoginDTO";

export function setCurrentUserBeginHandler(oldState: AppState, user: UserLoginDTO): AppState {
    const newState = {...oldState};
    newState.loading = true;
    return newState;
}

export function setCurrentUserSuccessHandler(oldState: AppState, user: UserLoginDTO): AppState {
    const newState = {...oldState};
    newState.currentUser = user;
    return newState;
}

export function setCurrentUserErrorHandler(oldState: AppState, error: string): AppState {
    const newState = {...oldState};
    newState.error = error;
    return newState;
}