import HttpService from "./HttpService";
import { LoginException } from "../exceptions/LoginException";
import { UserLoginDTO } from "../models/UserLoginDTO";
import { UserRegisterDTO } from "../models/UserRegisterDTO";
import { RegisterException } from "../exceptions/RegisterException";
import { RegisterErrorMessages } from "../messages/RegisterMessages";
import { LoginErrorMessages } from "../messages/LoginMessages";

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

  validateLoginUser(user: UserLoginDTO): LoginException {
    let error: LoginException = {
      emailError: "",
      passwordError: ""
    };
    let messages = LoginErrorMessages;
    if (user.email.length === 0)
      error.emailError = messages.EMAIL_ERROR;

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

  validateRegisterUser(user: UserRegisterDTO): RegisterException {
    let error: RegisterException = {
      usernameError: "",
      profileNameError: "",
      emailError: "",
      passwordError: "",
      birthDateError: ""
    };
    let messages = RegisterErrorMessages;
    if (user.username.length === 0){
      error.usernameError = messages.USERNAME_ERROR;
    }
    if (user.profileName.length === 0){
      error.profileNameError = messages.PROFILE_NAME_ERROR;
    }
    if (user.email.length === 0){
      error.emailError = messages.EMAIL_ERROR;
    }
    if (user.password.length === 0){
      error.passwordError = messages.PASSWORD_ERROR;
    }
    if (user.birthDate.toString().length === 0){
      error.birthDateError = messages.BIRTH_DATE_ERROR;
    }
    if (!user.username.match(this.usernameRegex)) {
      error.usernameError = messages.INVALID_USERNAME;
    }
    if (!user.profileName.match(this.profileNameRegex)) {
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

  validateBirthdate(user: UserRegisterDTO): boolean {
    let now = new Date();
    now.setDate(now.getDate() - 1);
    let yesterday = now.getDate();

    if (user.birthDate.getDate() > yesterday)
      return false
    return true
  }

  validateValidationResultRegister(result: RegisterException): boolean {
    if (result.usernameError.length > 0 || result.profileNameError.length > 0 ||
        result.emailError.length > 0 || result.passwordError.length > 0 || result.birthDateError.length > 0)
      return true;
    return false;
  }

  validateRegisteredUser(user: UserRegisterDTO | undefined): boolean {
    if (user) {
      if (
        user.username.length > 0 &&
        user.profileName.length > 0 &&
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.birthDate.toString().length
      ) {
        return true;
      }
    }
    return false;
  }

}

