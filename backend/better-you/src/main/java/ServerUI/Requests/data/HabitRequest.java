package ServerUI.Requests.data;

import Model.Habit;


public class HabitRequest {
    private Habit habit;

    public HabitRequest() {
    }

    public HabitRequest(Habit habit) {
        this.habit = habit;
    }

    public Habit getHabit() {
        return habit;
    }

    public void setHabit(Habit habit) {
        this.habit = habit;
    }

}
