import HttpService from "./HttpService";
import { LoginException } from "../exceptions/LoginException";
import { UserLoginDTO } from "../models/UserLoginDTO";

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

  async loginUser(user: UserLoginDTO) {
    return await this.httpService.loginUser(user);
  }
}
