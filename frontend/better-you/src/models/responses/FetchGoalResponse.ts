import GoalDTO from "../GoalDTO";

export default interface FetchGoalResponse {
    id: number;
    goal: GoalDTO;
    currentProgress: number;
    startDate: string;
    endDate: string;
    upvotes: number;
    downvotes: number;
    public: boolean;
}