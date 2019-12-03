import { UserLoginDTO } from "../../models/UserLoginDTO";

export default interface IHttpService {
    loginUser(user: UserLoginDTO): Promise<string>;
}