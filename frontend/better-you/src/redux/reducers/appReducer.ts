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
  SET_APPBAR_SWIPEABLEDRAWER,
  SET_APPBAR_ITEMSLISTS
} from "../actions/types";
import {
  setCurrentUserBeginHandler,
  setCurrentUserSuccessHandler,
  setCurrentUserErrorHandler,
  unsetCurrentUserHandler,
  registerUserBeginHandler,
  registerUserSuccessHandler,
  registerUserErrorHandler,
  setAppBarSwipeableDrawerHandler,
  setAppBarItemsListHandler
} from "./appHandlers";

export const initialState: AppState = {
  loading: false,
  error: "",
  userInfo: undefined,
  registrationEmailSent: false,
  appBarSwipeableDrawer: null,
  appBarItemsList: []
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
    case SET_APPBAR_SWIPEABLEDRAWER:
      return setAppBarSwipeableDrawerHandler(state, action.payload);
    case SET_APPBAR_ITEMSLISTS:
      return setAppBarItemsListHandler(state, action.payload);
    default:
      return state;
  }
};

export default appReducer;
