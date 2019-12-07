import UserDTO from "../../models/UserDTO";

export default interface AppState {
  loading: boolean;
  error: string;
  userInfo: UserDTO | undefined;
}
