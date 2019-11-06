import AppState from "../store/store";
import { AppActionType, TEST_TYPE } from "../actions/types";
import { doReduxTestHandler } from "./appHandlers";

export const initialState: AppState = {
}

const appReducer = (state = initialState, action: AppActionType) => {
    switch(action.type) {
        case TEST_TYPE:
            return doReduxTestHandler(state, action.payload);
        default:
            return state;
    }
}

export default appReducer;