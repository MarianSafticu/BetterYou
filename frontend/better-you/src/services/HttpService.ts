import IHttpService from "./interfaces/IHttpService";
import { UserLoginDTO } from "../models/UserLoginDTO";
import { UserRegisterDTO } from "../models/UserRegisterDTO";

const url: string = "http://192.168.0.105:8080/app/better-you";

export default class HttpService implements IHttpService {
  private static instance: HttpService;
  private constructor() {}
  static getInstance() {
    if (!HttpService.instance) HttpService.instance = new HttpService();
    return HttpService.instance;
  }

  async loginUser(user: UserLoginDTO): Promise<string> {
    return await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async registerUser(user: UserRegisterDTO): Promise<string> {
    return await fetch(`${url}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }
}
