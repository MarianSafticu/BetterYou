import { User } from "../../models/User";

export default interface AppState {
    currentUser: User | undefined
}