export default interface HabitDTO {
    id?: number;
    title: string;
    description: string;
    startDate: string;
    repetitionType: string; // CAPITAL
    category: string; //capital
    bestStreak: number;
    currentStreak: number;
    dates: string[];
}