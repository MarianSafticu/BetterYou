import AppState from "../store/store";
import {
  AppActionType,
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
  UNSET_CURRENT_USER
} from "../actions/types";
import {
  setCurrentUserBeginHandler,
  setCurrentUserSuccessHandler,
  setCurrentUserErrorHandler,
  unsetCurrentUserHandler
} from "./appHandlers";

export const initialState: AppState = {
  loading: false,
  error: "",
  currentUser: undefined
};

const appReducer = (state = initialState, action: AppActionType): AppState => {
  switch (action.type) {
    case SET_CURRENT_USER_BEGIN:
      return setCurrentUserBeginHandler(state, action.payload);
    case SET_CURRENT_USER_SUCCESS:
      return setCurrentUserSuccessHandler(state, action.payload);
    case SET_CURRENT_USER_ERROR:
      return setCurrentUserErrorHandler(state, action.payload);
    case UNSET_CURRENT_USER:
      return unsetCurrentUserHandler(state, action.payload);
    default:
      return state;
  }
};

export default appReducer;
