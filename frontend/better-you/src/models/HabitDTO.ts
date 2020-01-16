export default interface HabitDTO {
    title: string;
    description: string;
    startDate: string;
    repetitionType: string; // CAPITAL
    category: string; //capital
    bestStreak: number;
    currentStreak: number;
    dates: string[];
}