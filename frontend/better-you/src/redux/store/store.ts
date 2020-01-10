import UserDTO from "../../models/UserDTO";
import { RefObject } from "react";
import AppBarItem from "../../models/AppBarItem";

export default interface AppState {
  loading: boolean;
  error: string;
  userInfo: UserDTO | undefined;
  registrationEmailSent: boolean;
  appBarSwipeableDrawer: RefObject<any> | null;
  appBarItemsList: AppBarItem[]
}
