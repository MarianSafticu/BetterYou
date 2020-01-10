package ServerUI.Requests;

import Model.Goal;

public class GoalRequest {
    private Goal goal;
    private String token;

    public GoalRequest() {
    }

    public GoalRequest(Goal goal, String token) {
        this.goal = goal;
        this.token = token;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
