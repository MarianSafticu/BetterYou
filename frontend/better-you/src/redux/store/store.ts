import UserDTO from "../../models/UserDTO";
import Goal from "../../models/Goal";
import Friend from "../../models/Friend";
import FriendRequest from "../../models/FriendRequest";
import Habit from "../../models/Habit";
import { RefObject } from "react";
import AppBarItem from "../../models/AppBarItem";
import UserInfoDTO from "../../models/UserInfoDTO";

export default interface AppState {
  loading: boolean;
  error: string;
  userInfo: UserDTO | undefined;
  userInformation: UserInfoDTO | undefined;
  registrationEmailSent: boolean;
  accountConfirmed: boolean;
  goals: Goal[];
  habits: Habit[];
  friends: Friend[];
  friendRequests: FriendRequest[];
  appBarSwipeableDrawer: RefObject<any> | null;
  appBarItemsList: AppBarItem[];
  defaultGoals: Goal[];
  users: UserInfoDTO[];
}
