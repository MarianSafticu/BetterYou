package ServerUI.Requests;

import Model.UserGoal;


public class UserGoalRequest {
    private UserGoal userGoal;
    private String token;

    public UserGoalRequest(UserGoal userGoal, String token) {
        this.userGoal = userGoal;
        this.token = token;
    }

    public UserGoal getUserGoal() {
        return userGoal;
    }

    public void setUserGoal(UserGoal userGoal) {
        this.userGoal = userGoal;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
