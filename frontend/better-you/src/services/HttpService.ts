// import IHttpService from "./interfaces/IHttpService";
import { User } from "../models/User";

const url: string = "http://localhost:3000/app/better-you";

export default class HttpService  {
  private static instance: HttpService;
  private constructor() {}
  static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  async loginUser(user: User): Promise<string> {
    return await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }
}
