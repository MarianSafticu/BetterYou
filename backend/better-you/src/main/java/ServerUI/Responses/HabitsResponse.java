package ServerUI.Responses;

import Model.Habit;

import java.util.List;

public class HabitsResponse {
    List<Habit> habits;

    public HabitsResponse(List<Habit> habits) {
        this.habits = habits;
    }

    public List<Habit> getHabits() {
        return habits;
    }

    public void setHabits(List<Habit> habits) {
        this.habits = habits;
    }
}
