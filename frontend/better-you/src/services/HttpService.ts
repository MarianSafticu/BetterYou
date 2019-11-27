import IHttpService from "./interfaces/IHttpService";
import { UserLoginDTO } from "../models/UserLoginDTO";

const url: string = "http://localhost:8080/app/better-you";

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
      .then(response => {
        console.log(response);
        console.log(typeof response.body);
        if(typeof response === 'string' || response instanceof String) {
          console.log("hello with a error from server");
          return response;
        }
        return JSON.stringify(response.body);
        // else {
        //   return response.json();
        // }
      })
      // .then(body => {
      //   return body;
      // })
      .catch(error => {
        return error;
      });
  }
}
