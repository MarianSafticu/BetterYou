import IHttpService from "../../services/interfaces/IHttpService";
import HttpService from "../../services/HttpService";
import { AppActionType } from "../../redux/actions/types";
import { UserLoginDTO } from "../../models/UserLoginDTO";
import { call, put } from "@redux-saga/core/effects";
import { setCurrentUserSuccess, setCurrentUserError } from "../actions/actions";

const httpService: IHttpService = HttpService.getInstance();

export function* loginUserHandler(action: AppActionType): IterableIterator<any> {
  let user: UserLoginDTO = action.payload as UserLoginDTO;
  const response = yield call(httpService.loginUser, user);
  if (response) {
    const { token, massage } = response;
    if (token) {
      user.token = token;
      yield put(setCurrentUserSuccess(user));
    } 
    else if (massage) {
      yield put(setCurrentUserError(massage));
    }
  }
}
