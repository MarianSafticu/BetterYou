import { Repetition } from "./Repetition";
import { GoalCategory } from "./GoalCategorys";

export default interface Habit{
    title: string,
    description: string,
    startDate: Date,
    repetitionType: Repetition,
    category: GoalCategory,
    dates: Date[]
}
