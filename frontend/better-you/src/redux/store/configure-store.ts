import { createStore, applyMiddleware, Store } from "redux";
import appReducer from "../reducers/appReducer";
import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import AppState from "./store";
import { generalSaga } from "../sagas/Saga";

// const rootReducer = combineReducers(appReducer);
const sagaMiddleware: SagaMiddleware<AppState> = createSagaMiddleware();

export default function configureStore() {
    const store: Store<AppState> = createStore(
        appReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(generalSaga);
    return store;
}