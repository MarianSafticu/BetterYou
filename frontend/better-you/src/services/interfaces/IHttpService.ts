import LoginRequest from "../../models/requests/LoginRequest";
import LoginResponse from "../../models/responses/LoginResponse";
import RegisterRequest from "../../models/requests/RegisterRequest";
import RegisterResponse from "../../models/responses/RegisterResponse";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import { getCookie } from "../CookieService";
import FetchGoalResponse from "../../models/responses/FetchGoalResponse";
import FetchHabitResponse from "../../models/responses/FetchHabitResponse";
import AddHabitRequest from "../../models/requests/AddHabitRequest";
import UserInfoDTO from "../../models/UserInfoDTO";
import FetchFriendsResponse from "../../models/responses/FetchFriendsResponse";
import FetchFriendRequestsResponse from "../../models/responses/FetchFriendsResponse";
import GoalDTO from "../../models/GoalDTO";
import ChallengeFriendDTO from "../../models/ChallengeFriendDTO";

export default interface IHttpService {
  loginUser(requestData: LoginRequest): Promise<LoginResponse>;
  registerUser(requestData: RegisterRequest): Promise<RegisterResponse>;
  confirmAccount(confirmationCode: string): Promise<boolean>;
  getUserInformation():Promise<UserInfoDTO>;
  fetchGoals(): Promise<FetchGoalResponse[]>;
  addGoal(goal: AddGoalRequest): Promise<number>;
  fetchHabits(): Promise<FetchHabitResponse[]>;
  addHabit(habit: AddHabitRequest): Promise<number>;
  fetchFriends(): Promise<FetchFriendsResponse[]>;
  fetchFriendRequests(): Promise<FetchFriendRequestsResponse[]>;
  fetchDefaultGoals(): Promise<GoalDTO[]>;
  challengeFriend(challenge: ChallengeFriendDTO): Promise<boolean>;
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
