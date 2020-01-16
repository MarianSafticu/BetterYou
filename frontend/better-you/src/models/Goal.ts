import { GoalCategory } from "./GoalCategorys";

export default interface Goal{
    id?: number | null;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    currentProgress: number;
    progressToReach: number;
    isPublic: boolean;
    category: GoalCategory;
}