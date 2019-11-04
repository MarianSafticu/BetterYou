import AppState from "../store/store";

export function doReduxTestHandler(oldState: AppState, test: String): AppState {
    const newState = {...oldState};
    console.log(test);
    return newState;
}