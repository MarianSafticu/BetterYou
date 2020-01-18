import IHttpService, {
  getSafeHeaders,
  getHeaders
} from "./interfaces/IHttpService";
import LoginRequest from "../models/requests/LoginRequest";
import RegisterRequest from "../models/requests/RegisterRequest";
import LoginResponse from "../models/responses/LoginResponse";
import RegisterResponse from "../models/responses/RegisterResponse";
import AddGoalRequest from "../models/requests/AddGoalRequest";
import { getCookie } from "./CookieService";
import FetchGoalResponse from "../models/responses/FetchGoalResponse";
import FetchHabitResponse from "../models/responses/FetchHabitResponse";
import AddHabitRequest from "../models/requests/AddHabitRequest";
import UserInfoDTO from "../models/UserInfoDTO";
import FetchFriendsResponse from "../models/responses/FetchFriendsResponse";
import FetchFriendRequestsResponse from "../models/responses/FetchFriendRequestsResponse";
import GoalDTO from "../models/GoalDTO";
import ChallengeFriendDTO from "../models/ChallengeFriendDTO";
import UsernameRequestDTO from "../models/UsernameRequestDTO";

export const url: string = "http://ec2-3-83-10-197.compute-1.amazonaws.com:12404/app/better-you";
// const url: string = "http://192.168.43.105:12404/app/better-you";
// const url: string = "http://localhost:12404/app/better-you";

export default class HttpService implements IHttpService {
  private static instance: HttpService;
  private constructor() { }
  static getInstance() {
    if (!HttpService.instance) HttpService.instance = new HttpService();
    return HttpService.instance;
  }

  async loginUser(requestData: LoginRequest): Promise<LoginResponse> {
    return await fetch(`${url}/login`, {
      method: "post",
      headers: getHeaders(),
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
      headers: getHeaders(),
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

  async confirmAccount(confirmationCode: string): Promise<boolean> {
    return await fetch(`${url}/confirm_register`, {
      method: "post",
      headers: getHeaders(),
      body: JSON.stringify(confirmationCode)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async getUserInformation(): Promise<UserInfoDTO> {
    return await fetch(`${url}/user/info`, {
      method: "get",
      headers: getSafeHeaders()
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      })
  }

  async fetchGoals(): Promise<FetchGoalResponse[]> {
    return await fetch(`${url}/goals`, {
      method: "post",
      headers: getSafeHeaders()
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async addGoal(goal: AddGoalRequest): Promise<number> {
    console.log(JSON.stringify(goal))
    return await fetch(`${url}/goal`, {
      method: "post",
      headers: getSafeHeaders(),
      body: JSON.stringify(goal)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async fetchHabits(): Promise<FetchHabitResponse[]> {
    return await fetch(`${url}/habits`, {
      method: "post",
      headers: getSafeHeaders()
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async addHabit(habit: AddHabitRequest): Promise<number> {
    console.log(JSON.stringify(habit))
    return await fetch(`${url}/habit`, {
      method: "post",
      headers: getSafeHeaders(),
      body: JSON.stringify(habit)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async fetchFriends(): Promise<FetchFriendsResponse[]> {
    return await fetch(`${url}/friends`, {
      method: "get",
      headers: getSafeHeaders()
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async fetchFriendRequests(): Promise<FetchFriendRequestsResponse[]> {
    return await fetch(`${url}/friend/request/list`, {
      method: "post",
      headers: getSafeHeaders()
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async fetchDefaultGoals(): Promise<GoalDTO[]> {
    return await fetch(`${url}/goals/random?amount=5`, {
      method: "get",
      headers: getSafeHeaders()
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async challengeFriend(challenge: ChallengeFriendDTO): Promise<boolean> {
    console.log(challenge);
    return await fetch(`${url}/challenge`, {
      method: "post",
      headers: getSafeHeaders(),
      body: JSON.stringify(challenge)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async acceptFriendRequest(usernameReceiver: string): Promise<boolean> {
    console.log(usernameReceiver)
    return await fetch(`${url}/friend/request/accept`, {
      method: "post",
      headers: getSafeHeaders(),
      body: JSON.stringify(usernameReceiver)
    })
      .then(response => response.json())
      .then(body => {
        return body;
      })
      .catch(error => {
        return error;
      });
  }

  async declineFriendRequest(usernameReceiver: UsernameRequestDTO): Promise<boolean> {
    console.log(JSON.stringify(usernameReceiver))
    return await fetch(`${url}/friend/request/reject`, {
      method: "post",
      headers: getSafeHeaders(),
      body: JSON.stringify(usernameReceiver)
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

