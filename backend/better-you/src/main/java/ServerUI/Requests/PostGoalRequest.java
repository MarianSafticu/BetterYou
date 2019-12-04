package ServerUI.Requests;

import Model.Goal;

public class PostGoalRequest {
    private String token;
    private Goal goal;

    public PostGoalRequest() {
    }

    public PostGoalRequest(String token, Goal goal) {
        this.token = token;
        this.goal = goal;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }
}
