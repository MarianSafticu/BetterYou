import GoalDTO from "./GoalDTO";
import UserInfoDTO from "./UserInfoDTO"

export default interface ChallengeDTO{
    form: UserInfoDTO
    goal: GoalDTO
}