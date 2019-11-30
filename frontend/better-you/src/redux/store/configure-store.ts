import { createStore, applyMiddleware, Store } from "redux";
import appReducer from "../reducers/appReducer";
import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import AppState from "./store";
import { generalSaga } from "../sagas/Saga";
import { createLogger } from "redux-logger";

// const rootReducer = combineReducers(appReducer);
const sagaMiddleware: SagaMiddleware<AppState> = createSagaMiddleware();
const loggerMiddleware = createLogger();

export default function configureStore() {
  const store: Store<AppState, any> = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
  );
  sagaMiddleware.run(generalSaga);
  return store;
}
