import IHttpService from "./interfaces/IHttpService";
import LoginRequest from "../models/requests/LoginRequest";
import RegisterRequest from "../models/requests/RegisterRequest";
import LoginResponse from "../models/responses/LoginResponse";
import RegisterResponse from "../models/responses/RegisterResponse";

const url: string = "http://ec2-3-83-10-197.compute-1.amazonaws.com:12404/app/better-you";

export default class HttpService implements IHttpService {
  private static instance: HttpService;
  private constructor() {}
  static getInstance() {
    if (!HttpService.instance) HttpService.instance = new HttpService();
    return HttpService.instance;
  }

  async loginUser(requestData: LoginRequest): Promise<LoginResponse> {
    return await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async registerUser(requestData: RegisterRequest): Promise<RegisterResponse> {
    return await fetch(`${url}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
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
