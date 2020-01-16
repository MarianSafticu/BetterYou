import LoginRequest from "../../models/requests/LoginRequest";
import LoginResponse from "../../models/responses/LoginResponse";
import RegisterRequest from "../../models/requests/RegisterRequest";
import RegisterResponse from "../../models/responses/RegisterResponse";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import { getCookie } from "../CookieService";

export default interface IHttpService {
  loginUser(requestData: LoginRequest): Promise<LoginResponse>;
  registerUser(requestData: RegisterRequest): Promise<RegisterResponse>;
  confirmAccount(confirmationCode: string): Promise<boolean>;
  addGoal(goal: AddGoalRequest): Promise<number>;
}

export function getHeaders() {
  const safeHeaders = new Headers();
  safeHeaders.append('Content-Type', 'application/json');
  return safeHeaders;
}

export function getSafeHeaders(): Headers {
  const safeHeaders = new Headers();
  safeHeaders.append('Content-Type', 'application/json');
  const token: string | undefined = getCookie('token');
  if (token)
    safeHeaders.append('Authorization', token);
  return safeHeaders;
}
