export default interface FetchHabitResponse {
    id: number;
    title: string;
    description: string;
    startDate: string;
    repetitionType: string; // CAPITAL
    category: string;
    bestStreak: number;
    currentStreak: number;
    dates: string[];
}