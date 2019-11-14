import AppState from "../store/store";
import { User } from "../../models/User";

export function setCurrentUserHandler(oldState: AppState, user: User): AppState {
    const newState = {...oldState};
    newState.currentUser = user;
    return newState;
}