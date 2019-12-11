import IHttpService from "../../services/interfaces/IHttpService";
import HttpService from "../../services/HttpService";
import { AppActionType } from "../../redux/actions/types";
import { call, put } from "@redux-saga/core/effects";
import {
  setCurrentUserSuccess,
  setCurrentUserError,
  registerUserBegin,
  registerUserSuccess,
  registerUserError
} from "../actions/actions";
import LoginRequest from "../../models/requests/LoginRequest";
import { setCookie } from "../../services/CookieService";
import UserDTO from "../../models/UserDTO";
import RegisterRequest from "../../models/requests/RegisterRequest";

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
