import { GoalCategory } from "./GoalCategorys";
import GoalDTO from "./GoalDTO";

export default interface Goal{
    id?: number | null;
    groupId?: number | null;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    currentProgress: number;
    progressToReach: number;
    isPublic: boolean;
    category: GoalCategory;
}