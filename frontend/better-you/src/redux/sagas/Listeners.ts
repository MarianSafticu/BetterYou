import IHttpService from "../../services/interfaces/IHttpService";
import HttpService from "../../services/HttpService";
import { AppActionType } from "../../redux/actions/types";
import { call, put } from "@redux-saga/core/effects";
import {
  setCurrentUserSuccess,
  setCurrentUserError,
  registerUserSuccess,
  registerUserError,
  confirmAccountSuccess,
  confirmAccountError,
  addGoalSuccess,
  addGoalError
} from "../actions/actions";
import LoginRequest from "../../models/requests/LoginRequest";
import { setCookie } from "../../services/CookieService";
import UserDTO from "../../models/UserDTO";
import RegisterRequest from "../../models/requests/RegisterRequest";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import Goal from "../../models/Goal";
import { goalCategorys } from "../../models/GoalCategorys";

const httpService: IHttpService = HttpService.getInstance();

export function* loginUserHandler(
  action: AppActionType
): IterableIterator<any> {
  let user: LoginRequest = action.payload as LoginRequest;
  const response = yield call(httpService.loginUser, user);
  if (response) {
    const { token, massage } = response;
    if (token) {
      setCookie("token", token);
      let authenticatedUser: UserDTO = {
        username: "",
        profilePicture: "../assets/photos/profile-picture-test.jpg",
        isAuthenticated: true
      };
      yield put(setCurrentUserSuccess(authenticatedUser));
    } else if (massage) {
      yield put(setCurrentUserError(massage));
    }
  }
}

export function* registerUserHandler(
  action: AppActionType
): IterableIterator<any> {
  let user: RegisterRequest = action.payload as RegisterRequest;
  const response = yield call(httpService.registerUser, user);
  if (response) {
    const { token, massage } = response;
    if (token) yield put(registerUserSuccess());
    else if (massage) yield put(registerUserError(massage));
  }
}

export function* confirmAccountHandler(
  action: AppActionType
): IterableIterator<any> {
  let code: string = action.payload as string;
  const response = yield call(httpService.confirmAccount, code);
  if (response) {
    const { aBoolean , massage } = response;
    if (aBoolean) yield put(confirmAccountSuccess(aBoolean));
    else if (massage) yield put(confirmAccountError(massage));
  }
}

export function* addGoalHandler(action: AppActionType): IterableIterator<any> {
  let goal: AddGoalRequest = action.payload as AddGoalRequest;
  const response = yield call(httpService.addGoal, goal);
  if(response) {
    const {id, massage} = response;
    if(id) {
      let goalComplete: Goal = {
        id: id,
        title: goal.goal.title,
        description: goal.goal.description,
        startDate: new Date(),
        endDate: new Date(goal.endDate),
        currentProgress: 0,
        progressToReach: goal.goal.progressToReach,
        isPublic: goal.public,
        category: {category: "none",
        color: "#e9eff2"}
      }
      yield put(addGoalSuccess(goalComplete))
    }
    else if(massage) yield put(addGoalError(massage))
  }
}
