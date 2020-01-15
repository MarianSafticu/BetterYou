import LoginRequest from "../../models/requests/LoginRequest";
import LoginResponse from "../../models/responses/LoginResponse";
import RegisterRequest from "../../models/requests/RegisterRequest";
import RegisterResponse from "../../models/responses/RegisterResponse";
import AddGoalRequest from "../../models/requests/AddGoalRequest";

export default interface IHttpService {
  loginUser(requestData: LoginRequest): Promise<LoginResponse>;
  registerUser(requestData: RegisterRequest): Promise<RegisterResponse>;
  confirmAccount(confirmationCode: string): Promise<boolean>;
  addGoal(goal: AddGoalRequest): Promise<number>;
}
