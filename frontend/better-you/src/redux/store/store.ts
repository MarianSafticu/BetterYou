import UserDTO from "../../models/UserDTO";
import Goal from "../../models/Goal";
import Friend from "../../models/Friend";
import Habit from "../../models/Habit";
import { RefObject } from "react";
import AppBarItem from "../../models/AppBarItem";

export default interface AppState {
  loading: boolean;
  error: string;
  userInfo: UserDTO | undefined;
  registrationEmailSent: boolean;
  accountConfirmed: boolean;
  goals: Goal[];
  habits: Habit[];
  friends: Friend[];
  appBarSwipeableDrawer: RefObject<any> | null;
  appBarItemsList: AppBarItem[]
}
