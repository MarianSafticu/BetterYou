import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import appReducer from "../reducers/appReducer";
import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core";
import AppState from "./store";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, Store, Middleware, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { generalSaga } from "../sagas/Saga";
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { AppActionType } from '../actions/types';

const persistConfiguration: PersistConfig<any, any, any, any> = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};
const rootReducer: Reducer<AppState & PersistPartial, AppActionType> = persistReducer(persistConfiguration, appReducer);
const sagaMiddleware: SagaMiddleware<AppState> = createSagaMiddleware();
const loggerMiddleware: Middleware = createLogger();

export default function configureStore() {
  const store: Store<AppState & PersistPartial, any> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(generalSaga);
  return { store, persistor };
}
