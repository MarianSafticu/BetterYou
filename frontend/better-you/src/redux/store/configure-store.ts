import AppState from "./store";
import { Store, createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import appReducer from "../reducers/appReducer";

const rootReducer = combineReducers(appReducer);

export default function configureStore() {
    const store = createStore(
        rootReducer,
        applyMiddleware(logger)
    );
    return store;
}