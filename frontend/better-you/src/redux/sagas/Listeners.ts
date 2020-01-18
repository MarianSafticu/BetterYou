import IHttpService from "../../services/interfaces/IHttpService";
import HttpService from "../../services/HttpService";
import { AppActionType } from "../../redux/actions/types";
import { call, put } from "@redux-saga/core/effects";
import {
  setCurrentUserSuccess,
  setCurrentUserError,
  setCurrentUserInformationSuccess,
  setCurrentUserInformationError,
  registerUserSuccess,
  registerUserError,
  confirmAccountSuccess,
  confirmAccountError,
  addGoalSuccess,
  addGoalError,
  fetchGoalsError,
  fetchGoalsSuccess,
  fetchHabitsSuccess,
  addHabitSuccess,
  addHabitError,
  fetchHabitsError,
  setCurrentUserInformationBegin,
  fetchFriendsError,
  fetchFriendsSuccess,
  fetchFriendRequestsError,
  fetchFriendRequestsSuccess,
  fetchDefaultGoalsError,
  fetchDefaultGoalsSuccess,
  challengeFriendSuccess,
  challengeFriendError,
  acceptFriendError,
  acceptFriendSuccess,
  declineFriendError,
  declineFriendSuccess,
  fetchUsersError,
  fetchUsersSuccess,
  fetchChallengesSuccess,
  addFriendSuccess
} from "../actions/actions";
import { setCookie } from "../../services/CookieService";
import UserDTO from "../../models/UserDTO";
import Goal from "../../models/Goal";
import LoginRequest from "../../models/requests/LoginRequest";
import RegisterRequest from "../../models/requests/RegisterRequest";
import AddGoalRequest from "../../models/requests/AddGoalRequest";
import FetchGoalResponse from "../../models/responses/FetchGoalResponse";
import FetchHabitResponse from "../../models/responses/FetchHabitResponse";
import FetchFriendsResponse from "../../models/responses/FetchFriendsResponse";
import FetchFriendRequestsResponse from "../../models/responses/FetchFriendRequestsResponse";
import Habit from "../../models/Habit";
import { Repetition } from "../../models/Repetition";
import AddHabitRequest from "../../models/requests/AddHabitRequest";
import { goalCategorys } from "../../models/GoalCategorys";
import UserInfoDTO from "../../models/UserInfoDTO";

import Friend from "../../models/Friend";
import GoalDTO from "../../models/GoalDTO";
import ChallengeFriendDTO from "../../models/ChallengeFriendDTO";
import FriendRequest from "../../models/FriendRequest";
import UsernameRequestDTO from "../../models/UsernameRequestDTO";

const httpService: IHttpService = HttpService.getInstance();


export function* loginUserHandler(action: AppActionType): IterableIterator<any> {
  let user: LoginRequest = action.payload as LoginRequest;
  const response = yield call(httpService.loginUser, user);
  if (response) {
    const { token, massage } = response;
    if (token) {
      setCookie("token", token);
      let authenticatedUser: UserDTO = {
        username: "",
        profilePicture: "../assets/photos/profile-picture-test.jpg",
        isAuthenticated: true
      };
      const response = yield call(httpService.getUserInformation);
      if (response) {
        const { userInfo, massage } = response;
        const userInfoCookie: UserInfoDTO = userInfo;
        if (userInfo && userInfoCookie.profile_name !== undefined) {
          setCookie("userInfo", userInfoCookie.profile_name);
          yield put(setCurrentUserInformationSuccess(userInfo));
        }
        if (massage)
          yield put(setCurrentUserInformationError(massage))
      }
      yield put(setCurrentUserSuccess(authenticatedUser));
    } else if (massage) {
      yield put(setCurrentUserError(massage));
    }
  }
}


export function* registerUserHandler(action: AppActionType): IterableIterator<any> {
  let user: RegisterRequest = action.payload as RegisterRequest;
  const response = yield call(httpService.registerUser, user);
  if (response) {
    const { token, massage } = response;
    if (token) yield put(registerUserSuccess());
    else if (massage) yield put(registerUserError(massage));
  }
}


export function* confirmAccountHandler(action: AppActionType): IterableIterator<any> {
  let code: string = action.payload as string;
  const response = yield call(httpService.confirmAccount, code);
  if (response) {
    const { aBoolean, massage } = response;
    if (aBoolean) yield put(confirmAccountSuccess(aBoolean));
    else if (massage) yield put(confirmAccountError(massage));
  }
}

export function* getUserInformationHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.getUserInformation);
  if (response) {
    const { userInfo, massage } = response;
    if (userInfo) {
      yield put(setCurrentUserInformationSuccess(userInfo));
    }
    if (massage)
      yield put(setCurrentUserInformationError(massage))
  }
}

export function* fetchGoalsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchGoals);
  if (response) {
    const { userGoals, massage } = response;
    if (userGoals) {
      let goals: FetchGoalResponse[] = userGoals
      let goalsDTO: Goal[] = []
      goals.map((goal: FetchGoalResponse) => {
        let category = goalCategorys.filter(x => x.category.toLocaleUpperCase() === goal.goal.category)[0];
        if (category === undefined)
          category = category[0]

        let goalDTO: Goal = {
          id: goal.id,
          groupId: goal.goal.id,
          title: goal.goal.title,
          description: goal.goal.description,
          startDate: new Date(goal.startDate),
          endDate: new Date(goal.endDate),
          currentProgress: goal.currentProgress,
          progressToReach: goal.goal.progressToReach,
          isPublic: goal.public,
          category: category
        }
        goalsDTO.push(goalDTO);
      });
      yield put(fetchGoalsSuccess(goalsDTO));
    }
    if (massage) yield put(fetchGoalsError(massage))
  }
}


export function* addGoalHandler(action: AppActionType): IterableIterator<any> {
  let goal: AddGoalRequest = action.payload as AddGoalRequest;
  const response = yield call(httpService.addGoal, goal);
  if (response) {
    const { id, massage } = response;
    if (id) {
      let category = goalCategorys.filter(x => x.category.toLocaleUpperCase() === goal.goal.category)[0];
      if (category === undefined)
        category = category[0]

      let goalComplete: Goal = {
        id: id,
        groupId: goal.goal.id,
        title: goal.goal.title,
        description: goal.goal.description,
        startDate: new Date(),
        endDate: new Date(goal.endDate),
        currentProgress: 0,
        progressToReach: goal.goal.progressToReach,
        isPublic: goal.public,
        category: category
      }
      yield put(addGoalSuccess(goalComplete))
    }
    else if (massage) yield put(addGoalError(massage))
  }
}


export function* editGoalHandler(action: AppActionType): IterableIterator<any> {

}


export function* deleteGoalHandler(action: AppActionType): IterableIterator<any> {

}


export function* fetchHabitsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchHabits);
  if (response) {
    const { habits, massage } = response;
    if (habits) {
      let respHabits: FetchHabitResponse[] = habits
      let habitsDTO: Habit[] = []
      respHabits.map((habit: FetchHabitResponse) => {
        let category = goalCategorys.filter(x => x.category.toLocaleUpperCase() === habit.category)[0];
        if (category === undefined)
          category = category[0]
        let repetitionType = Repetition.Daily;
        if (habit.repetitionType === Repetition.Weekly.toLocaleUpperCase())
          repetitionType = Repetition.Weekly;

        let habitDTO: Habit = {
          id: habit.id,
          title: habit.title,
          description: habit.description,
          startDate: new Date(habit.startDate),
          repetitionType: repetitionType,
          category: category,
          dates: habit.dates.map(date => new Date(date))
        }
        habitsDTO.push(habitDTO);
      });
      yield put(fetchHabitsSuccess(habitsDTO));
    }
    if (massage) yield put(fetchHabitsError(massage))
  }
}


export function* addHabitHandler(action: AppActionType): IterableIterator<any> {
  let habit: AddHabitRequest = action.payload as AddHabitRequest;
  const response = yield call(httpService.addHabit, habit);
  if (response) {
    const { id, massage } = response;
    if (id) {
      let category = goalCategorys.filter(x => x.category.toLocaleUpperCase() === habit.habit.category)[0];
      if (category === undefined)
        category = category[0]
      let repetitionType = Repetition.Daily;
      if (habit.habit.repetitionType === Repetition.Weekly.toLocaleUpperCase())
        repetitionType = Repetition.Weekly;

      let habitComplete: Habit = {
        id: id,
        title: habit.habit.title,
        description: habit.habit.description,
        startDate: new Date(),
        repetitionType: repetitionType,
        category: category,
        dates: habit.habit.dates.map(date => new Date(date))
      }
      yield put(addHabitSuccess(habitComplete))
    }
    else if (massage) yield put(addHabitError(massage))
  }
}


export function* editHabitHandler(action: AppActionType): IterableIterator<any> {

}


export function* deleteHabitHandler(action: AppActionType): IterableIterator<any> {

}

export function* fetchFriendsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchFriends);
  if (response) {
    const { friends, massage } = response;
    if (friends) {
      let respFriends: FetchFriendsResponse[] = friends
      let friendsDTO: Friend[] = []
      respFriends.map((friend: FetchFriendsResponse) => {
        let friendDTO: Friend = {
          id: friend.id,
          username: friend.username,
          profile_name: friend.profile_name,
          email: friend.email,
          birthDate: new Date(friend.birthDate),
          points: friend.points,
          verified: friend.verified
        }
        friendsDTO.push(friendDTO);
      });
      yield put(fetchFriendsSuccess(friendsDTO));
    }
    if (massage) yield put(fetchFriendsError(massage))
  }
}

export function* fetchFriendRequestsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchFriendRequests);
  if (response) {
    const { friendRequests, massage } = response;
    if (friendRequests) {
      let respFriends: FetchFriendRequestsResponse[] = friendRequests
      let requestsDTO: FriendRequest[] = []
      respFriends.map((request: FetchFriendRequestsResponse) => {
        let friendRequestDTO: FriendRequest = {
          id: request.id,
          sender: request.sender,
          receiver: request.receiver,
        }
        requestsDTO.push(friendRequestDTO);
        return friendRequestDTO;
      });
      yield put(fetchFriendRequestsSuccess(requestsDTO));
    }
    if (massage) yield put(fetchFriendRequestsError(massage))
  }
}

export function* fetchDefaultGoalsHandler(action: AppActionType): IterableIterator<any> {
  const response = yield call(httpService.fetchDefaultGoals);
  if (response) {
    const { goals, massage } = response;
    if (goals) {
      let defaultGoals: GoalDTO[] = goals
      let goalsDTO: Goal[] = []
      defaultGoals.map((goal: GoalDTO) => {
        let goalDTO: Goal = {
          id: null,
          groupId: goal.id,
          title: goal.title,
          description: goal.description,
          startDate: new Date(),
          endDate: new Date(),
          currentProgress: 0,
          progressToReach: goal.progressToReach,
          isPublic: true,
          category: { category: goal.category, color: "#e9eff2" }
        }
        goalsDTO.push(goalDTO);
      });
      yield put(fetchDefaultGoalsSuccess(goalsDTO));
    }
    if (massage) yield put(fetchDefaultGoalsError(massage))
  }
}

export function* challengeFriendHandler(action: AppActionType): IterableIterator<any> {
  let challenge: ChallengeFriendDTO = action.payload as ChallengeFriendDTO;
  const response = yield call(httpService.challengeFriend, challenge);
  if (response) {
    const { token, massage } = response;
    if (token) yield put(challengeFriendSuccess());
    else if (massage) yield put(challengeFriendError(massage));
  }

}

export function* acceptFriendHandler(action: AppActionType): IterableIterator<any> {
  let username: UsernameRequestDTO = action.payload as UsernameRequestDTO;
  const response = yield call(httpService.acceptFriendRequest, username);

  if (response) {
    const { aBoolean, massage } = response;
    if (aBoolean) {
      yield put(acceptFriendSuccess(username.usernameSender));
    }
    else if (massage) {
      yield put(acceptFriendError(massage));
    }
  }
}

export function* declineFriendHandler(action: AppActionType): IterableIterator<any> {
  let username: UsernameRequestDTO = action.payload as UsernameRequestDTO;
  const response = yield call(httpService.declineFriendRequest, username);

  if (response) {
    const { aBoolean, massage } = response;
    if (aBoolean) {
      yield put(declineFriendSuccess(username.usernameSender));
    }
    else if (massage) {
      yield put(declineFriendError(massage));
    }
  }
}

export function* fetchUsersHandler(action: AppActionType): IterableIterator<any> {
  let prefix: string = action.payload as string;
  const response = yield call(httpService.fetchUsers, prefix);
  if (response) {
    const { users, massage } = response;
    if (users) {
      yield put(fetchUsersSuccess(users));
    }
    if (massage) yield put(fetchUsersError(massage))
  }
}

export function* checkFriendHandler(action: AppActionType): IterableIterator<any> {
  let prefix: string = action.payload as string;
  const response = yield call(httpService.fetchUsers, prefix);
  if (response) {
    const { aBoolean, massage } = response;
    if (aBoolean) {
      yield put(fetchUsersSuccess(aBoolean));
    }
    if (massage) yield put(fetchUsersError(massage))
  }
}

export function* fetchChallengesHandler(action: AppActionType): IterableIterator<any> {
  let prefix: string = action.payload as string;
  const response = yield call(httpService.fetchChallenges);
  if (response) {
    console.log(response);
    const { challenges, massage } = response;
    if (challenges) {
      yield put(fetchChallengesSuccess(challenges));
    }
    if (massage) yield put(fetchUsersError(massage))
  }
}

export function* addFriendHandler(action: AppActionType): IterableIterator<any> {
  let usernameReceiver: string = action.payload as string;

  const response = yield call(httpService.addFriend, usernameReceiver);
  if (response) {
    console.log(response);
    const { aBoolean, massage } = response;
    if (aBoolean) {
      yield put(addFriendSuccess());
    }
    if (massage) yield put(fetchUsersError(massage))
  }
}