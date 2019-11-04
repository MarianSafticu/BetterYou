import AppState from "./store";
import { Store, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import appReducer from "../reducers/appReducer";

export default function configureStore() {
    const store: Store<AppState> = createStore(
        appReducer,
        applyMiddleware(logger)
    );
    return store;
}