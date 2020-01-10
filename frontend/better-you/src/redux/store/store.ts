import UserDTO from "../../models/UserDTO";
import { RefObject } from "react";

export default interface AppState {
  loading: boolean;
  error: string;
  userInfo: UserDTO | undefined;
  registrationEmailSent: boolean;
  appBarSwipeableDrawer: RefObject<any> | null;
}
