import AppState from "../store/store";
import UserDTO from "../../models/UserDTO";
import { deleteCookie } from "../../services/CookieService";
import Goal from "../../models/Goal";
import Habit from "../../models/Habit";
import { RefObject } from "react";
import AppBarItem from "../../models/AppBarItem";
import UserInfoDTO from "../../models/UserInfoDTO";
import Friend from "../../models/Friend";
import UsernameRequestDTO from "../../models/UsernameRequestDTO";
import ChallengeFriendDTO from "../../models/ChallengeFriendDTO";
import FriendRequest from "../../models/FriendRequest";
import ChallengeDTO from "../../models/ChallengeDTO";


export function setCurrentUserBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.userInfo = undefined;
  return newState;
}
export function setCurrentUserSuccessHandler(oldState: AppState, userInfo: UserDTO): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.userInfo = userInfo;
  return newState;
}
export function setCurrentUserErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.userInfo = undefined;
  return newState;
}


export function unsetCurrentUserHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.userInfo = undefined;
  newState.registrationEmailSent = false;
  newState.userInformation = undefined;
  newState.userInfo = undefined;
  deleteCookie("token");
  return newState;
}


export function setCurrentUserInformationBeginHandler(oldState:AppState):AppState{
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  newState.userInformation = undefined;
  return newState;
}
export function setCurrentUserInformationSuccesHandler(oldState:AppState,userInformation:UserInfoDTO):AppState{
  const newState = { ...oldState};
  newState.loading=false;
  newState.error = "";
  newState.userInformation = userInformation;
  return newState;
}
export function setCurrentUserInformationErrorHandler(oldState:AppState, error:string):AppState{
  const newState = { ...oldState};
  newState.loading=false;
  newState.error = error;
  newState.userInformation = undefined;
  return newState;
}


export function registerUserBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.registrationEmailSent = false;
  return newState;
}
export function registerUserSuccessHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.registrationEmailSent = true;
  return newState;
}
export function registerUserErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.registrationEmailSent = false;
  return newState;
}


export function confirmAccountBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.accountConfirmed = false;
  return newState;
}
export function confirmAccountSuccessHandler(oldState: AppState, response: boolean): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  newState.accountConfirmed = true;
  return newState;
}
export function confirmAccountErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.accountConfirmed = false;
  return newState;
}


export function fetchGoalsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchGoalsSuccessHandler(oldState: AppState, goals: Goal[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.goals = goals;
  return newState;
}
export function fetchGoalsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = [];
  return newState;
}


export function addGoalBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.goals = oldState.goals;
  return newState;
}
export function addGoalSuccessHandler(oldState: AppState, goal: Goal): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  
  let newGoals = newState.goals.slice();
  newGoals.splice(0, 0, goal);
  newState.goals = newGoals;

  return newState;
}
export function addGoalErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.goals = oldState.goals;
  return newState;
}


export function editGoalBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  newState.goals = oldState.goals;
  return newState;
}
export function editGoalSuccessHandler(oldState: AppState, goal: Goal): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";

  console.log(goal);

  let newGoals = newState.goals.map((g: Goal) => {
    if(g.id === goal.id) {
      let updates: Goal = {
        id: g.id,
        groupId: g.groupId,
        title: g.title,
        description: g.description,
        startDate: g.startDate,
        endDate: new Date(goal.endDate),
        currentProgress: goal.currentProgress,
        progressToReach: g.progressToReach,
        isPublic: goal.isPublic,
        category: g.category
      }
      g = {...updates};
    }
    return g;
  });
  newState.goals = newGoals;

  return newState;
}
export function editGoalErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = oldState.goals;
  return newState;
}


export function deleteGoalBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.goals = oldState.goals;
  return newState;
}
export function deleteGoalSuccessHandler(oldState: AppState, id: number): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.goals = oldState.goals.filter(goal => goal.id !== id);
  return newState;
}
export function deleteGoalErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = oldState.goals;
  return newState;
}


export function fetchHabitsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchHabitsSuccessHandler(oldState: AppState, habits: Habit[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.habits = habits;
  return newState;
}
export function fetchHabitsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = [];
  return newState;
}


export function addHabitBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.goals = oldState.goals;
  return newState;
}
export function addHabitSuccessHandler(oldState: AppState, habit: Habit): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  
  let newHabits = newState.habits.slice();
  newHabits.splice(0, 0, habit);
  newState.habits = newHabits;

  return newState;
}
export function addHabitErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = oldState.goals;
  return newState;
}


export function editHabitBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  newState.habits = oldState.habits;
  return newState;
}
export function editHabitSuccessHandler(oldState: AppState, habit: Habit): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";

  let newHabits = newState.habits.map((h: Habit) => {
    if(h.id === habit.id) {
      h = {...habit}
    }
    return h;
  });
  newState.habits = newHabits;

  return newState;
}
export function editHabitErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.habits = oldState.habits;
  return newState;
}


export function deleteHabitBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.goals = oldState.goals;
  return newState;
}
export function deleteHabitSuccessHandler(oldState: AppState, id: number): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.habits = oldState.habits.filter(habit => habit.id !== id);
  return newState;
}
export function deleteHabitErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = oldState.goals;
  return newState;
}


export function setAppBarSwipeableDrawerHandler(oldState: AppState, refObj: RefObject<unknown> | null):AppState {
  const newState = { ...oldState };
  newState.appBarSwipeableDrawer = refObj;
  return newState;
}

export function setAppBarItemsListHandler(oldState: AppState, list: AppBarItem[]):AppState {
  const newState = { ...oldState };
  newState.appBarItemsList = list;
  return newState;
}


export function fetchFriendsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchFriendsSuccessHandler(oldState: AppState, friends: Friend[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.friends = friends;
  return newState;
}
export function fetchFriendsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.friends = [];
  return newState;
} 


export function fetchFriendRequestsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchFriendRequestsSuccessHandler(oldState: AppState, friendRequests: FriendRequest[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.friendRequests = friendRequests;
  return newState;
}
export function fetchFriendRequestsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.friendRequests = [];
  return newState;
} 
  

export function fetchDefaultGoalsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchDefaultGoalsSuccessHandler(oldState: AppState, goals: Goal[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.defaultGoals = goals;
  return newState;
}
export function fetchDefaultGoalsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.defaultGoals = [];
  return newState;
} 
  

export function challengeFriendBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function challengeFriendSuccessHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  return newState;
}
export function challengeFriendErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  return newState;
} 

export function acceptFriendBeginHandler(oldState: AppState): AppState {
  const newState = { ...oldState };
  newState.loading = true;
  newState.error = "";
  newState.friends = oldState.friends;
  return newState;
}
export function acceptFriendSuccessHandler(oldState: AppState, username: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = "";
  
  let friend: Friend = {
    id: 0,
    username: username,
    profile_name: username,
    email: "",
    birthDate: new Date("2000-01-01"),
    points: 0,
    verified: true
}

  let newFriends = newState.friends.slice();
  newFriends.splice(0, 0, friend);
  newState.friends = newFriends;

  newState.friendRequests = newState.friendRequests.filter(req => req.sender.username !== username)

  newState.loading = false;
  newState.error = "";

  return newState;
}
export function acceptFriendErrorHandler(oldState: AppState, error: string): AppState {
  const newState = { ...oldState };
  newState.loading = false;
  newState.error = error;
  newState.friends = oldState.friends;
  return newState;
}


export function declineFriendBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function declineFriendSuccessHandler(oldState: AppState, username: string): AppState {
  const newState = {...oldState};
  newState.friendRequests = newState.friendRequests.filter(req => req.sender.username !== username)
  newState.error = "";
  newState.loading = false;
  return newState;
}
export function declineFriendErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  return newState;
}

export function fetchUsersBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchUsersSuccessHandler(oldState: AppState, users: UserInfoDTO[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.users = users;
  return newState;
}
export function fetchUsersErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.users = [];
  return newState;
} 

export function fetchChallengesBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchChallengesSuccessHandler(oldState: AppState, challenges: ChallengeDTO[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.challenges = challenges;
  return newState;
}
export function fetchChallengesErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.challenges = [];
  return newState;
} 

export function addFriendBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function addFriendSuccessHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  return newState;
}
export function addFriendErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.challenges = [];
  return newState;
} 

export function fetchFriendGoalsBeginHandler(oldState: AppState): AppState {
  const newState = {...oldState};
  newState.loading = true;
  newState.error = "";
  return newState;
}
export function fetchFriendGoalsSuccessHandler(oldState: AppState, goals: Goal[]): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = "";
  newState.goals = goals;
  return newState;
}
export function fetchFriendGoalsErrorHandler(oldState: AppState, error: string): AppState {
  const newState = {...oldState};
  newState.loading = false;
  newState.error = error;
  newState.goals = [];
  return newState;
} 