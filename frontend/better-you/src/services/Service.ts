import HttpService from "./HttpService";
import { LoginException } from "../exceptions/LoginException";
import { RegisterException } from "../exceptions/RegisterException";
import { RegisterErrorMessages } from "../messages/RegisterMessages";
import { LoginErrorMessages } from "../messages/LoginMessages";
import aesjs from "aes-js";
import LoginRequest from "../models/requests/LoginRequest";
import RegisterRequest from "../models/requests/RegisterRequest";
import Goal from "../models/Goal";
import { GoalException } from "../exceptions/GoalException";
import { GoalErrorMessages } from "../messages/GoalMessages";

export default class Service {
  private static instance: Service;
  httpService: HttpService;

  usernameRegex: string = "(^[a-zA-Z]+$)|(^[a-zA-Z]+[0-9]+$)";
  profileNameRegex: string = "(^[a-zA-Z ]+$)|(^[a-zA-Z ]+[0-9 ]+$)";
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

  encryptPassword(plainPassword: string): string {
    let key: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let plainPasswordBytes: Uint8Array = aesjs.utils.utf8.toBytes(
      plainPassword
    );
    let algorithm = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    let encryptPasswordBytes: Uint8Array = algorithm.encrypt(
      plainPasswordBytes
    );
    let encryptPassword: string = aesjs.utils.hex.fromBytes(
      encryptPasswordBytes
    );
    return encryptPassword;
  }

  validateLoginUser(user: LoginRequest): LoginException {
    let error: LoginException = {
      emailError: "",
      passwordError: ""
    };
    let messages = LoginErrorMessages;
    if (user.email.length === 0) error.emailError = messages.EMAIL_ERROR;

    if (!user.email.match(this.emailRegex))
      error.emailError = messages.INVALID_ERROR;

    if (user.password.length === 0)
      error.passwordError = messages.PASSWORD_ERROR;

    return error;
  }

  validateValidationResult(result: LoginException): boolean {
    if (result.emailError.length > 0 || result.passwordError.length > 0)
      return true;
    return false;
  }

  validateRegisterUser(user: RegisterRequest): RegisterException {
    let error: RegisterException = {
      usernameError: "",
      profileNameError: "",
      emailError: "",
      passwordError: "",
      birthDateError: ""
    };
    let messages = RegisterErrorMessages;
    if (user.username.length === 0) {
      error.usernameError = messages.USERNAME_ERROR;
    }
    if (user.profile_name.length === 0) {
      error.profileNameError = messages.PROFILE_NAME_ERROR;
    }
    if (user.email.length === 0) {
      error.emailError = messages.EMAIL_ERROR;
    }
    if (user.password.length === 0) {
      error.passwordError = messages.PASSWORD_ERROR;
    }
    if (user.birthDate.toString().length === 0) {
      error.birthDateError = messages.BIRTH_DATE_ERROR;
    }
    if (!user.username.match(this.usernameRegex)) {
      error.usernameError = messages.INVALID_USERNAME;
    }
    if (!user.profile_name.match(this.profileNameRegex)) {
      error.profileNameError = messages.INVALID_PROFILE_NAME;
    }
    if (!user.email.match(this.emailRegex)) {
      error.emailError = messages.INVALID_EMAIL;
    }
    if (!this.validateBirthdate(user)) {
      error.birthDateError = messages.INVALID_BIRTH_DATE;
    }
    return error;
  }

  validateBirthdate(user: RegisterRequest): boolean {
    let now = new Date();
    now.setDate(now.getDate() - 1);
    let yesterday = now.getDate();

    if (user.birthDate.getDate() > yesterday) return false;
    return true;
  }

  validateValidationResultRegister(result: RegisterException): boolean {
    if (
      result.usernameError.length > 0 ||
      result.profileNameError.length > 0 ||
      result.emailError.length > 0 ||
      result.passwordError.length > 0 ||
      result.birthDateError.length > 0
    )
      return true;
    return false;
  }

  validateRegisteredUser(user: RegisterRequest | undefined): boolean {
    if (user) {
      if (
        user.username.length > 0 &&
        user.profile_name.length > 0 &&
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.birthDate.toString().length
      ) {
        return true;
      }
    }
    return false;
  }

  validateGoal(goal: Goal): GoalException {
    let err: GoalException = {
      titleError: "",
      descriptionError: "",
      startDateError: "",
      endDateError: "",
      currentProgressError: "",
      progressToReachError: "",
      categoryError: ""
    };

    let messages = GoalErrorMessages;
    if (goal.title.length < 3) err.titleError += messages.TITLE_TOO_SHORT;
    if (goal.description.length < 3)
      err.descriptionError += messages.DESCRIPTION_TOO_SHORT;

    if (goal.currentProgress < 0)
      err.currentProgressError += messages.NEGATIVE_CURRENT_PROGRESS;
    if (goal.currentProgress > goal.progressToReach)
      err.currentProgressError += messages.BIGGER_CURRENT_PROGRESS;
    if (goal.progressToReach <= 0)
      err.progressToReachError += messages.NEGATIVE_PROGRESS_TO_REACH;

    goal.endDate.setHours(0, 0, 0, 0);
    goal.startDate.setHours(0, 0, 0, 0);
    if (goal.endDate < goal.startDate) {
      err.endDateError += messages.STARTING_DATE_AFTER_ENDING;
      err.startDateError += messages.STARTING_DATE_AFTER_ENDING;
    }

    return err;
  }
}
