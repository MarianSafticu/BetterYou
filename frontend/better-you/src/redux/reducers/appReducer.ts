import AppState from "../store/store";
import {
  AppActionType,
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
  UNSET_CURRENT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CONFIRM_ACCOUNT_BEGIN,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
  ADD_GOAL_BEGIN,
  ADD_GOAL_SUCCESS,
  ADD_GOAL_ERROR
} from "../actions/types";
import {
  setCurrentUserBeginHandler,
  setCurrentUserSuccessHandler,
  setCurrentUserErrorHandler,
  unsetCurrentUserHandler,
  registerUserBeginHandler,
  registerUserSuccessHandler,
  registerUserErrorHandler,
  confirmAccountBeginHandler,
  confirmAccountSuccessHandler,
  confirmAccountErrorHandler,
  addGoalBeginHandler,
  addGoalSuccessHandler,
  addGoalErrorHandler
} from "./appHandlers";

export const initialState: AppState = {
  loading: false,
  error: "",
  userInfo: undefined,
  registrationEmailSent: false,
  accountConfirmed: false,
  goals: [],
  habits: [],
  friends: []
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
      return unsetCurrentUserHandler(state);
    case REGISTER_USER_BEGIN:
      return registerUserBeginHandler(state);
    case REGISTER_USER_SUCCESS:
      return registerUserSuccessHandler(state);
    case REGISTER_USER_ERROR:
      return registerUserErrorHandler(state, action.payload);
    case CONFIRM_ACCOUNT_BEGIN:
      return confirmAccountBeginHandler(state, action.payload);
    case CONFIRM_ACCOUNT_SUCCESS:
      return confirmAccountSuccessHandler(state, action.payload);
    case CONFIRM_ACCOUNT_ERROR:
      return confirmAccountErrorHandler(state, action.payload);
    case ADD_GOAL_BEGIN:
      return addGoalBeginHandler(state, action.payload);
    case ADD_GOAL_SUCCESS:
      return addGoalSuccessHandler(state, action.payload);
    case ADD_GOAL_ERROR:
      return addGoalErrorHandler(state, action.payload);
    default:
      return state;
  }
};

export default appReducer;
