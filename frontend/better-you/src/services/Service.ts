import HttpService from "./HttpService";
import { LoginException } from "../exceptions/LoginException";
import { UserLoginDTO } from "../models/UserLoginDTO";
import { UserRegisterDTO } from "../models/UserRegisterDTO";
import { RegisterException } from "../exceptions/RegisterException";

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

  validateRegisterUser(user: UserRegisterDTO): RegisterException {
    let error: RegisterException = {
      usernameError: "",
      profileNameError: "",
      emailError: "",
      passwordError: "",
      birthDateError: ""
    };
    if (user.username.length === 0){
      error.usernameError = "Username field cannot be empty!";
    }
    if (user.profileName.length === 0){
      error.profileNameError = "Profile name field cannot be empty!";
    }
    if (user.email.length === 0){
      error.emailError = "Email field cannot be empty!";
    }
    if (user.password.length === 0){
      error.passwordError = "Password field cannot be empty!";
    }
    if (user.birthDate.toString().length === 0){
      error.birthDateError = "Birth date field cannot be empty!";
    }
    if (!user.username.match(this.usernameRegex)) {
      error.usernameError = "Username is invalid!";
    }
    if (!user.profileName.match(this.profileNameRegex)) {
      error.profileNameError = "Username is invalid!";
    }
    if (!user.email.match(this.emailRegex)) {
      error.emailError = "Username is invalid!";
    }
    if (!this.validateBirthdate(user)) {
      error.birthDateError = "Birth date is invalid!";
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

