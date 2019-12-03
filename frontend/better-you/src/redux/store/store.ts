import { UserLoginDTO } from "../../models/UserLoginDTO";

export default interface AppState {
    loading: boolean;
    error: string;
    currentUser: UserLoginDTO | undefined;
}