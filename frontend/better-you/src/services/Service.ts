import HttpService from "./HttpService";
import { LoginException } from "../exceptions/LoginException";
import { UserLoginDTO } from "../models/UserLoginDTO";
import { Goal } from "../models/Goal";
import { GoalException } from "../exceptions/GoalException";

export default class Service {
  private static instance: Service;
  httpService: HttpService;

  emailRegex: string = "^[\\w-_.+]*[\\w-_.]@([\\w]+\\.)+[\\w]+[\\w]$";
  passwordRegex: string =
    "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";

  private constructor() {
    this.httpService = HttpService.getInstance();
  }

  static getInstance() {
    if (!Service.instance) Service.instance = new Service();
    return Service.instance;
  }

  validateGoal(goal: Goal): GoalException{
    let err: GoalException = {
      titleError: "",
      descriptionError: "",
      startDateError: "",
      endDateError: "",
      currentProgressError: "",
      progressToReachError: "",
      categoryError: ""
    }

    if(goal.title.length < 3)
      err.titleError += "Title must have at least 3 characters.";
      if(goal.description.length < 3)
        err.descriptionError += "Description must have at least 3 characters.";

    if(goal.currentProgress < 0)
      err.currentProgressError += "Current progress can not be negative. ";
    if(goal.currentProgress > goal.progressToReach)
      err.currentProgressError += "Current progress can not be bigger then the progress to reach. ";
    if(goal.progressToReach <= 0)
      err.progressToReachError += "Progress to reach can not be zero or negative. ";

    if(goal.endDate < goal.startDate){
      err.endDateError += "Ending date must be after the starting date."
      err.startDateError += "Ending date must be after the starting date."
    }

    return err;
  }

  validateLoginUser(user: UserLoginDTO): LoginException {
    let error: LoginException = {
      emailError: "",
      passwordError: ""
    };
    if (user.email.length === 0)
      error.emailError = "Email field cannot be empty!";

    if (!user.email.match(this.emailRegex))
      error.emailError = "Email is invalid!";

    if (user.password.length === 0)
      error.passwordError = "Password field cannot be empty!";

    return error;
  }

  validateValidationResult(result: LoginException): boolean {
    if (result.emailError.length > 0 || result.passwordError.length > 0)
      return true;
    return false;
  }

  validateLoggedUser(user: UserLoginDTO | undefined): boolean {
    if (user) {
      if (
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.token.length > 0
      ) {
        return true;
      }
    }
    return false;
  }
}
