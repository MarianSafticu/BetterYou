import AppState from "../store/store";
import {
  AppActionType,
  SET_CURRENT_USER_BEGIN,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
  UNSET_CURRENT_USER,
  SET_CURRENT_USER_INFORMATION_BEGIN,
  SET_CURRENT_USER_INFORMATION_SUCCES,
  SET_CURRENT_USER_INFORMATION_ERROR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CONFIRM_ACCOUNT_BEGIN,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
  FETCH_GOALS_BEGIN,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_ERROR,
  ADD_GOAL_BEGIN,
  ADD_GOAL_SUCCESS,
  ADD_GOAL_ERROR,
  EDIT_GOAL_BEGIN,
  EDIT_GOAL_SUCCESS,
  EDIT_GOAL_ERROR,
  DELETE_GOAL_BEGIN,
  DELETE_GOAL_SUCCESS,
  DELETE_GOAL_ERROR,
  FETCH_HABITS_BEGIN,
  FETCH_HABITS_SUCCESS,
  FETCH_HABITS_ERROR,
  ADD_HABIT_BEGIN,
  ADD_HABIT_SUCCESS,
  ADD_HABIT_ERROR,
  EDIT_HABIT_BEGIN,
  EDIT_HABIT_SUCCESS,
  EDIT_HABIT_ERROR,
  DELETE_HABIT_BEGIN,
  DELETE_HABIT_SUCCESS,
  DELETE_HABIT_ERROR,
  SET_APPBAR_SWIPEABLEDRAWER,
  SET_APPBAR_ITEMSLISTS,
  FETCH_FRIENDS_BEGIN,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_ERROR,
  FETCH_DEFAULT_GOALS_BEGIN,
  FETCH_DEFAULT_GOALS_SUCCESS,
  FETCH_DEFAULT_GOALS_ERROR,
  CHALLENGE_FRIEND_BEGIN,
  CHALLENGE_FRIEND_SUCCESS,
  CHALLENGE_FRIEND_ERROR,
} from "../actions/types";
import {
  setCurrentUserBeginHandler,
  setCurrentUserSuccessHandler,
  setCurrentUserErrorHandler,
  unsetCurrentUserHandler,
  setCurrentUserInformationBeginHandler,
  setCurrentUserInformationSuccesHandler,
  setCurrentUserInformationErrorHandler,
  registerUserBeginHandler,
  registerUserSuccessHandler,
  registerUserErrorHandler,
  confirmAccountBeginHandler,
  confirmAccountSuccessHandler,
  confirmAccountErrorHandler,
  fetchGoalsBeginHandler,
  fetchGoalsSuccessHandler,
  fetchGoalsErrorHandler,
  addGoalBeginHandler,
  addGoalSuccessHandler,
  addGoalErrorHandler,
  editGoalBeginHandler,
  editGoalSuccessHandler,
  editGoalErrorHandler,
  deleteGoalBeginHandler,
  deleteGoalSuccessHandler,
  deleteGoalErrorHandler,
  fetchHabitsBeginHandler,
  fetchHabitsSuccessHandler,
  fetchHabitsErrorHandler,
  addHabitBeginHandler,
  addHabitSuccessHandler,
  addHabitErrorHandler,
  editHabitBeginHandler,
  editHabitSuccessHandler,
  editHabitErrorHandler,
  deleteHabitBeginHandler,
  deleteHabitSuccessHandler,
  deleteHabitErrorHandler,
  setAppBarSwipeableDrawerHandler,
  setAppBarItemsListHandler,
  fetchFriendsBeginHandler,
  fetchFriendsSuccessHandler,
  fetchFriendsErrorHandler,
  fetchDefaultGoalsBeginHandler,
  fetchDefaultGoalsSuccessHandler,
  fetchDefaultGoalsErrorHandler,
  challengeFriendBeginHandler,
  challengeFriendSuccessHandler,
  challengeFriendErrorHandler
} from "./appHandlers";
import { setCurrentUserInformationError } from "../actions/actions";


export const initialState: AppState = {
  loading: false,
  error: "",
  userInfo: undefined,
  userInformation:undefined,
  registrationEmailSent: false,
  accountConfirmed: false,
  goals: [],
  habits: [],
  friends: [],
  appBarSwipeableDrawer: null,
  appBarItemsList: [],
  defaultGoals: [],
};


const appReducer = (state = initialState, action: AppActionType): AppState => {
  switch (action.type) {
    case SET_CURRENT_USER_BEGIN:
      return setCurrentUserBeginHandler(state);
    case SET_CURRENT_USER_SUCCESS:
      return setCurrentUserSuccessHandler(state, action.payload);
    case SET_CURRENT_USER_ERROR:
      return setCurrentUserErrorHandler(state, action.payload);

    case UNSET_CURRENT_USER:
      return unsetCurrentUserHandler(state);

    case SET_CURRENT_USER_INFORMATION_BEGIN:
      return setCurrentUserInformationBeginHandler(state);
    case SET_CURRENT_USER_INFORMATION_SUCCES:
      return setCurrentUserInformationSuccesHandler(state,action.payload);
    case SET_CURRENT_USER_INFORMATION_ERROR:
      return setCurrentUserInformationErrorHandler(state,action.payload);
    
    case REGISTER_USER_BEGIN:
      return registerUserBeginHandler(state);
    case REGISTER_USER_SUCCESS:
      return registerUserSuccessHandler(state);
    case REGISTER_USER_ERROR:
      return registerUserErrorHandler(state, action.payload);

    case CONFIRM_ACCOUNT_BEGIN:
      return confirmAccountBeginHandler(state);
    case CONFIRM_ACCOUNT_SUCCESS:
      return confirmAccountSuccessHandler(state, action.payload);
    case CONFIRM_ACCOUNT_ERROR:
      return confirmAccountErrorHandler(state, action.payload);

    case FETCH_GOALS_BEGIN:
      return fetchGoalsBeginHandler(state);
    case FETCH_GOALS_SUCCESS:
      return fetchGoalsSuccessHandler(state, action.payload);
    case FETCH_GOALS_ERROR:
      return fetchGoalsErrorHandler(state, action.payload);

    case ADD_GOAL_BEGIN:
      return addGoalBeginHandler(state);
    case ADD_GOAL_SUCCESS:
      return addGoalSuccessHandler(state, action.payload);
    case ADD_GOAL_ERROR:
      return addGoalErrorHandler(state, action.payload);

    case EDIT_GOAL_BEGIN:
      return editGoalBeginHandler(state);
    case EDIT_GOAL_SUCCESS:
      return editGoalSuccessHandler(state, action.payload);
    case EDIT_GOAL_ERROR:
      return editGoalErrorHandler(state, action.payload);

    case DELETE_GOAL_BEGIN:
      return deleteGoalBeginHandler(state);
    case DELETE_GOAL_SUCCESS:
      return deleteGoalSuccessHandler(state, action.payload);
    case DELETE_GOAL_ERROR:
      return deleteGoalErrorHandler(state, action.payload);

    case FETCH_HABITS_BEGIN:
      return fetchHabitsBeginHandler(state);
    case FETCH_HABITS_SUCCESS:
      return fetchHabitsSuccessHandler(state, action.payload);
    case FETCH_HABITS_ERROR:
      return fetchHabitsErrorHandler(state, action.payload);

    case ADD_HABIT_BEGIN:
      return addHabitBeginHandler(state);
    case ADD_HABIT_SUCCESS:
      return addHabitSuccessHandler(state, action.payload);
    case ADD_HABIT_ERROR:
      return addHabitErrorHandler(state, action.payload);

    case EDIT_HABIT_BEGIN:
      return editHabitBeginHandler(state);
    case EDIT_HABIT_SUCCESS:
      return editHabitSuccessHandler(state, action.payload);
    case EDIT_HABIT_ERROR:
      return editHabitErrorHandler(state, action.payload);

    case DELETE_HABIT_BEGIN:
      return deleteHabitBeginHandler(state);
    case DELETE_HABIT_SUCCESS:
      return deleteHabitSuccessHandler(state, action.payload);
    case DELETE_HABIT_ERROR:
      return deleteHabitErrorHandler(state, action.payload);

    case SET_APPBAR_SWIPEABLEDRAWER:
      return setAppBarSwipeableDrawerHandler(state, action.payload);
    case SET_APPBAR_ITEMSLISTS:
      return setAppBarItemsListHandler(state, action.payload);

    case FETCH_FRIENDS_BEGIN:
      return fetchFriendsBeginHandler(state);
    case FETCH_FRIENDS_SUCCESS:
      return fetchFriendsSuccessHandler(state, action.payload);
    case FETCH_FRIENDS_ERROR:
      return fetchFriendsErrorHandler(state, action.payload);

    case FETCH_DEFAULT_GOALS_BEGIN:
      return fetchDefaultGoalsBeginHandler(state);
    case FETCH_DEFAULT_GOALS_SUCCESS:
      return fetchDefaultGoalsSuccessHandler(state, action.payload);
    case FETCH_DEFAULT_GOALS_ERROR:
      return fetchDefaultGoalsErrorHandler(state, action.payload);
      
    case CHALLENGE_FRIEND_BEGIN:
      return challengeFriendBeginHandler(state);
    case CHALLENGE_FRIEND_SUCCESS:
      return challengeFriendSuccessHandler(state);
    case CHALLENGE_FRIEND_ERROR:
      return challengeFriendErrorHandler(state, action.payload);
      
    default:
      return state;
  }
};

export default appReducer;
