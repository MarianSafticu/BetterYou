package ServerUI.Requests;

import Model.Habit;

public class HabitRequest {
    private Habit habit;
    private String token;

    public HabitRequest() {
    }

    public HabitRequest(Habit habit, String token) {
        this.habit = habit;
        this.token = token;
    }

    public Habit getHabit() {
        return habit;
    }

    public void setHabit(Habit habit) {
        this.habit = habit;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
