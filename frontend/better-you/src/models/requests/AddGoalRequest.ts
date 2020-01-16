import GoalDTO from "../GoalDTO";

export default interface AddGoalRequest {
    public: boolean;
    endDate: string; // AAAA-LL-ZZ
    goal: GoalDTO;
}